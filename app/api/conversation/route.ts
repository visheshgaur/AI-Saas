import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenAI, Content } from "@google/genai";
import { checkApiLimit,increaseApiLimit } from "@/lib/rate-limit";

// 1. Initialize the client. It automatically finds the API key.
const ai = new GoogleGenAI({}); 
const MODEL_NAME = "gemini-2.5-flash"; 

// Define the type for the messages coming from the frontend
type FrontendMessage = {
    role: "user" | "assistant";
    content: string;
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {userId}=await auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        // 2. Read the "messages" array from the request body
        const frontendMessages: FrontendMessage[] = body.messages || [];

        if (frontendMessages.length === 0) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const success=await checkApiLimit(userId);

        if(!success){
           
            return new NextResponse("Free tier ended",{status:403});
        }
        await increaseApiLimit(userId)
        // 3. Map the roles: Frontend 'assistant' -> Gemini 'model'
        const contents: Content[] = frontendMessages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user', 
            parts: [{ text: msg.content }],
        }));


        // 4. Call the Gemini API with the full conversation history
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: contents, // Pass the full, correctly formatted history
        });

        const responseText = response.text; 

        // 5. Send the single text response back to the frontend
        return NextResponse.json({ response: responseText });

    } catch (error: any) {
        console.error("[CONVERSATION_ERROR]:", error);
        return NextResponse.json(
            { message: "Internal Server Error during AI generation.", error: error.message },
            { status: 500 }
        );
    }
}

