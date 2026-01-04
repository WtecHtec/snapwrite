// Simulate streaming response
export async function* mockOptimizeStream(text) {
    // Simple mock transformation logic
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    const htmlParts = paragraphs.map(p => {
        if (p.startsWith('#')) return `<h2>${p.replace(/^#+/, '').trim()}</h2>`;
        return `<p>${p}</p>`;
    });

    const finalHtml = `
    <article style="font-family: sans-serif; line-height: 1.6; color: #333;">
      ${htmlParts.join('\n')}
      <div style="margin-top: 20px; padding: 15px; background: #eef2ff; border-radius: 8px; color: #4f46e5;">
        <strong>✨ AI Insight:</strong> This content was optimized for readability and mobile engagement.
      </div>
    </article>
  `;

    // Simulate streaming: yield chunks of 10-30 characters
    let currentIndex = 0;
    while (currentIndex < finalHtml.length) {
        // Random chunk size between 10 and 30
        const chunkSize = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        const chunk = finalHtml.slice(currentIndex, currentIndex + chunkSize);

        yield chunk;

        currentIndex += chunkSize;

        // Random delay between 50ms and 150ms for realistic typing effect
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
    }
}
