export interface AIMessage {
    role: "player" | "dm";
    content: string;
}

const WEBHOOK_URL = "https://n8n.srv1054234.hstgr.cloud/webhook-test/96c6bb95-3b7a-4f3a-8640-03691ae1edb9";

export const aiService = {
    async sendMessage(message: string, history: AIMessage[] = []) {
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                    history: history.slice(-5), // Send last 5 messages for context
                }),
            });

            if (!response.ok) {
                throw new Error(`AI Service Error: ${response.statusText}`);
            }

            // Assuming n8n returns { output: "text" } or similar. 
            // Adjusting to handle likely raw text or simple JSON.
            const data = await response.json();

            // Adaptation: n8n webhooks can return various structures. 
            // We'll look for 'output', 'text', 'response', or just the body if it's text.
            return data.output || data.text || data.response || data.message || "O Mestre está em silêncio... (Erro na resposta)";

        } catch (error) {
            console.error("Failed to fetch AI response:", error);
            return "O Mestre não pôde ser contatado no momento.";
        }
    }
};
