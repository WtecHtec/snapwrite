// Real API integration with simulated streaming for UI effect

export async function* optimizeContentStream(text) {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: text })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Extract content based on user provided structure
        // structure: data.choices[0].message.content
        const fullContent = data?.data?.choices?.[0]?.message?.content || "";

        // Simulate streaming for the UI effect
        let currentIndex = 0;
        while (currentIndex < fullContent.length) {
            // Chunk size 10-30 chars
            const chunkSize = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            const chunk = fullContent.slice(currentIndex, currentIndex + chunkSize);

            yield chunk;

            currentIndex += chunkSize;

            // Fast typing effect
            await new Promise(resolve => setTimeout(resolve, 30));
        }

    } catch (error) {
        console.error("API Request Failed:", error);
        // Fallback or re-throw? Let's yield an error message as content for now so user sees it
        yield `<div style="color: red; padding: 20px;"><strong>Error:</strong> Failed to connect to optimization service.<br><small>${error.message}</small></div>`;
    }
}
