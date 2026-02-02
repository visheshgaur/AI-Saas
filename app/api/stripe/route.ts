// app/api/stripe/route.ts
import { auth, currentUser } from "@clerk/nextjs/server"; // Or your auth provider
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your Secret Key (sk_test_...)
const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2026-01-28.clover", // Use latest version
  typescript: true,
});

const settingsUrl = process.env.NEXT_PUBLIC_APP_URL; // e.g., http://localhost:3000

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1. Create a Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${settingsUrl}/dashboard`, // Where to go after payment
      cancel_url: `${settingsUrl}/`,         // Where to go if they cancel
      payment_method_types: ["card"],
      mode: "subscription",                  // or "payment" for one-time
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "AI SaaS Pro",
              description: "Unlimited AI Generations",
            },
            unit_amount: 2000, // $20.00
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      // VITAL: Pass the userId so the webhook knows who paid!
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}