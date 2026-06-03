import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Needed if this runs on the client side in Next.js
});

// We keep the export name "chatSession" so we don't have to rewrite 
// any other files in the codebase that import it.
export const chatSession = {
  sendMessage: async (prompt) => {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile", // Using latest Llama 3.3 70B for high quality JSON responses
        temperature: 0.7,
        max_tokens: 8192,
        top_p: 1,
      });

      const responseText = chatCompletion.choices[0]?.message?.content || "";

      // We mock the exact response object structure that Gemini used,
      // so the rest of the application (result.response.text()) works seamlessly.
      return {
        response: {
          text: () => responseText,
        },
      };
    } catch (error) {
      console.error("Groq AI Error:", error);
      throw error;
    }
  },
};
