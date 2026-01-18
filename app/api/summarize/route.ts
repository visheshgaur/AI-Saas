import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Bytez from "bytez.js";
import { checkApiLimit, increaseApiLimit } from "@/lib/rate-limit";
const apiKey = process.env.BYTEZ_API_KEY!;

const bytez = new Bytez(apiKey);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const success=await checkApiLimit(userId);
    if(!success){
      return new NextResponse("Free tier Reached",{status:403})
    }
    await increaseApiLimit(userId)
    const model = bytez.model("ainize/bart-base-cnn");

    const params = {
      max_length: 40,
    };

    const { error, output } = await model.run(prompt, params);

    if (error) {
      console.error("[BYTEZ_MODEL_ERROR]:", error);
      return new NextResponse("Model Error", { status: 500 });
    }

    return NextResponse.json({ summary: output });

  } catch (error) {
    console.error("[SUMMARIZE_ERROR]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
