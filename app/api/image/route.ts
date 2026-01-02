import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const MODEL_NAME = "gemini-2.0-flash-exp"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: "user",
          parts: [
            { text: `Generate an image of: ${prompt}` }
          ],
        },
      ],
      config: {
        // FIX: You must allow BOTH 'TEXT' and 'IMAGE'
        responseModalities: ["TEXT", "IMAGE"], 
      },
    });

    // 3. Find the Image Part (The response might have text parts too)
    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData
    );

    if (!imagePart || !imagePart.inlineData) {
      throw new Error("No image generated. The model might have just returned text.");
    }

    // 4. Return the Image
    const imageBytes = imagePart.inlineData.data;

    return NextResponse.json({ 
      b64_json: imageBytes,
      prompt: prompt 
    });

  } catch (error: any) {
    console.error("[IMAGE_GEN_ERROR]:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}