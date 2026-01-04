import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Bytez from "bytez.js";

const bytez = new Bytez(process.env.BYTEZ_API_KEY!);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

    const model = bytez.model("facebook/musicgen-stereo-small");
    
    // Run the model
    const { error, output } = await model.run(prompt);

    if (error) {
      console.error("[BYTEZ_MODEL_ERROR]:", error);
      throw error;
    }

    // 3. Send the ready-to-play URL
    return NextResponse.json({audio:output});

  } catch (error: any) {
    console.error("[MUSIC_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}