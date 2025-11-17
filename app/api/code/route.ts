
// import { NextResponse } from "next/server";
// import { GoogleGenAI, Content } from "@google/genai";

// // 1. Initialize the client. It automatically finds the API key.
// const ai = new GoogleGenAI({}); 
// const MODEL_NAME = "gemini-2.5-flash"; 

// // Define the type for the messages coming from the frontend
// type FrontendMessage = {
//     role: "user" | "assistant";
//     content: string;
// };

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
        
//         // 2. Read the "messages" array from the request body
//         const frontendMessages: FrontendMessage[] = body.messages || [];

//         if (frontendMessages.length === 0) {
//             return new NextResponse("Messages are required", { status: 400 });
//         }

//         // 3. Map the roles: Frontend 'assistant' -> Gemini 'model'
//         const contents: Content[] = frontendMessages.map(msg => ({
//             role: msg.role === 'assistant' ? 'model' : 'user', 
//             parts: [{ text: msg.content }],
//         }));


//         // 4. Call the Gemini API with the full conversation history
//         const response = await ai.models.generateContent({
//             model: MODEL_NAME,
//             contents: contents, // Pass the full, correctly formatted history
//         });

//         const responseText = response.text; 

//         // 5. Send the single text response back to the frontend
//         return NextResponse.json({ response: responseText });

//     } catch (error: any) {
//         console.error("[CODE_ERROR]:", error);
//         return NextResponse.json(
//             { message: "Internal Server Error during AI generation.", error: error.message },
//             { status: 500 }
//         );
//     }
// }

import { NextResponse } from "next/server";
import { GoogleGenAI, Content } from "@google/genai";

// 1. Initialize the client
const ai = new GoogleGenAI({});
const MODEL_NAME = "gemini-2.5-flash";

type FrontendMessage = {
  role: "user" | "assistant";
  content: string;
};


const systemPrompt: Content[] = [
  {
    role: "user",
    parts: [{
      text: "You are Genius, a helpful and expert code generation assistant. Your job is to provide clear, well-commented code and explanations. Always provide your answers in Markdown format. When you generate code, always include the language identifier (e.g., ```javascript) so the frontend can highlight it."
    }]
  },
  {
    role: "model",
    parts: [{
      text: "Okay, I understand. I am Genius, the code generation assistant. I will provide all my responses in Markdown and make sure to include language identifiers for code blocks. I'm ready to help!"
    }]
  }
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const frontendMessages: FrontendMessage[] = body.messages || [];

    if (frontendMessages.length === 0) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // 3. Map the roles: Frontend 'assistant' -> Gemini 'model'
    const chatHistory: Content[] = frontendMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // 4. Call the Gemini API with the *combined* history
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      
      // (MODIFIED) Prepend the system prompt to the chat history
      contents: [...systemPrompt, ...chatHistory],
    });

    const responseText = response.text;

    // 5. Send the single text response back
    return NextResponse.json({ response: responseText });

  } catch (error: any) {
    console.error("[CONVERSATION_ERROR]:", error);
    return NextResponse.json(
      { message: "Internal Server Error during AI generation.", error: error.message },
      { status: 500 }
    );
  }
}