import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Bytez from "bytez.js";

const bytez = new Bytez(process.env.BYTEZ_API_KEY!);

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const model = bytez.model("facebook/musicgen-stereo-melody");
        const { error, output } = await model.run(prompt);
console.log("Model Output Type:", typeof output);
console.log("Is Array?", Array.isArray(output));
console.log("Output Preview:", output);
        if (error) {
            console.error("[BYTEZ_MODEL_ERROR]:", error);
            throw error;
        }

        // Essential conversion for raw binary data
        const buffer = Buffer.from(output);
        const audioBase64 = buffer.toString("base64");

        // Return formatted JSON for the frontend
        return NextResponse.json({ 
            audio: `data:audio/wav;base64,${audioBase64}` 
        });

    } catch (error: any) {
        console.error("[MUSIC_ERROR]:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}