const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Use gemini-2.0-flash as primary (stable and widely available)
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Wrapper with automatic retry on 503 overload errors
const createChatSessionWithRetry = () => {
  const session = model.startChat({ generationConfig });

  const originalSendMessage = session.sendMessage.bind(session);

  session.sendMessage = async (message, retries = 3, delay = 2000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await originalSendMessage(message);
      } catch (error) {
        const is503 =
          error?.message?.includes("503") ||
          error?.message?.includes("high demand") ||
          error?.message?.includes("overloaded");

        if (is503 && attempt < retries) {
          console.warn(
            `Gemini 503 overload — retrying attempt ${attempt + 1}/${retries} in ${delay}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // exponential backoff
        } else {
          throw error;
        }
      }
    }
  };

  return session;
};

export const chatSession = createChatSessionWithRetry();
