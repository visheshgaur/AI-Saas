// import { auth } from "@clerk/nextjs/server";
// import { log } from "console";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { measureMemory } from "vm";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// export async function POST(req:Request){
//     try {
//         const { userId } =  await auth();
//         const body=await req.json();
//         const {messages}=body;
//         console.log("called with", userId,messages);
        
//         if(!userId){
//             return new NextResponse("unauthorized",{status:401});
//         }
//         if(!client){
//             return new NextResponse("OpenAi key not configured",{status:500});
//         }
//         if(!messages){
//             return new NextResponse("messages are required",{status:400});
//         }
        
//        const response = await client.chat.completions.create({
//                      model: "gpt-3.5-turbo",
//                     messages
//                         });
//                     return NextResponse.json(response.choices[0].message);
//                 console.log(response.choices[0].message);

//     } catch (error) {
//         console.log("conversation error",error);
//         return new NextResponse("Internal Error",{status:500});
        
//     }

// }
// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const userPrompt = body.prompt || "Hello Gemini";

    

//     // 💡 FIX: Change the model ID from 'gemini-1.5-flash' to 'gemini-2.5-flash'
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent(userPrompt);
    

//     // Extract text safely
//     const responseText = result.response.text();

//     return NextResponse.json({ response: responseText });
//   } catch (error: any) {
   
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// 🧠 Keep this chat session persistent in memory (server lifetime)
let chatSession = model.startChat({ history: [] });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "Hello Gemini";

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("Error in conversation route:", error);

    // if session breaks, restart it
    chatSession = model.startChat({ history: [] });

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

