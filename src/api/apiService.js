// Real API integration with simulated streaming for UI effect
import { systemPrompt } from './systemprompt';
export async function* optimizeContentStream(text, customConfig = null) {
    // If custom config exists (Dark Mode), use it directly
    if (customConfig && customConfig.apiUrl && customConfig.apiKey) {
        try {
            const response = await fetch(customConfig.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${customConfig.apiKey}`
                },
                body: JSON.stringify({
                    model: customConfig.model,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: `文章内容: ${text}` }
                    ],
                    stream: true
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Custom API Error: ${response.status} - ${errorText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.slice(6);
                        if (dataStr === '[DONE]') continue;

                        try {
                            const data = JSON.parse(dataStr);
                            const content = data.choices[0]?.delta?.content || '';
                            if (content) yield content;
                        } catch (e) {
                            console.error('Error parsing SSE line', e);
                        }
                    }
                }
            }

        } catch (error) {
            console.error("Custom API Request Failed:", error);
            yield `<div style="color: red; padding: 20px;"><strong>Error:</strong> Failed to connect to Custom LLM.<br><small>${error.message}</small></div>`;
        }
        return; // End of custom stream
    }

    // Default Backend Logic
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sse/snapwrite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: text })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process buffer for complete JSON objects
            let index = 0;
            while (index < buffer.length) {
                // Skip whitespace
                while (index < buffer.length && /\s/.test(buffer[index])) {
                    index++;
                }

                if (index >= buffer.length) break;

                if (buffer[index] !== '{') {
                    // Unexpected char, skip
                    index++;
                    continue;
                }

                const startPos = index;
                let braceCount = 1;
                let currentPos = startPos + 1;
                let inString = false;
                let stringChar = null;

                while (braceCount > 0 && currentPos < buffer.length) {
                    const char = buffer[currentPos];

                    if (inString) {
                        if (char === stringChar && buffer[currentPos - 1] !== '\\') {
                            inString = false;
                        }
                    } else {
                        if (char === '"') {
                            inString = true;
                            stringChar = char;
                        } else if (char === '{') {
                            braceCount++;
                        } else if (char === '}') {
                            braceCount--;
                        }
                    }
                    currentPos++;
                }

                if (braceCount === 0) {
                    const objectStr = buffer.slice(startPos, currentPos);
                    try {
                        const data = JSON.parse(objectStr);

                        if (data.type === 'start') {
                            console.log('Stream started:', data.data?.message);
                        } else if (data.type === 'error') {
                            console.error('Stream error:', data.data?.message);
                            yield `<span style="color: red;">Error: ${data.data?.message}</span>`;
                        } else if (data.type === 'chunk') {
                            if (data.data?.content) {
                                yield data.data.content;
                            }
                        }

                        index = currentPos;
                    } catch (e) {
                        console.error("JSON parse error:", e);
                        // Move past this {
                        index = startPos + 1;
                    }
                } else {
                    // Incomplete object, wait for more data
                    break;
                }
            }

            // Keep the remaining buffer
            if (index > 0) {
                buffer = buffer.slice(index);
            }
        }

    } catch (error) {
        console.error("API Request Failed:", error);
        yield `<div style="color: red; padding: 20px;"><strong>Error:</strong> Failed to connect to optimization service.<br><small>${error.message}</small></div>`;
    }
}
