// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import Bytez from "bytez.js";

// const bytez = new Bytez("0421add14657a8713f53bae046ab2689");

// export async function POST(req: Request) {
//     try {
//         const { userId } = await auth();
//         const body = await req.json();
//         const { prompt } = body;

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }

//         if (!prompt) {
//             return new NextResponse("Prompt is required", { status: 400 });
//         }

//        const model = bytez.model('ainize/bart-base-cnn');
//        const input = {prompt}
//        const params = {
//   "max_length": 40
// };
//         const { error, output } = await model.run(input,params);

//         if (error) {
//             console.error("[BYTEZ_MODEL_ERROR]:", error);
//             throw error;
//         }
//         else{
//             return NextResponse.json({ output });
//             console.log({output});
            
//         }


//     } catch (error: any) {
//         console.error("[Summarize_ERROR]:", error);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Bytez from "bytez.js";

const bytez = new Bytez("0421add14657a8713f53bae046ab2689");

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
