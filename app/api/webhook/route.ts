import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2026-01-28.clover", // Ensure this matches your installed version
  typescript: true,
});

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // --- HANDLE CHECKOUT SESSION (Initial Purchase) ---
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    ) as any;

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const periodEnd = subscription.current_period_end 
      ? subscription.current_period_end * 1000 
      : Date.now() + 86_400_000; 

    await clerk.users.updateUserMetadata(session.metadata.userId, {
      publicMetadata: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: periodEnd, 
      },
    });
  }

  // --- HANDLE INVOICE PAYMENT (Recurring Payments) ---
  if (event.type === "invoice.payment_succeeded") {
    // 1. Correctly cast this as an Invoice
    const invoice = event.data.object as any ;

    // 2. SAFETY GATE: If there is no subscription ID, skip it safely
    if (!invoice.subscription) {
      // Return 200 so Stripe stops retrying. It's just a non-subscription invoice.
      return new NextResponse("Skipping: No subscription on invoice", { status: 200 });
    }

    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    ) as any;

    // 3. Update Clerk with new dates
    await clerk.users.updateUserMetadata(subscription.metadata.userId, {
      publicMetadata: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: subscription.current_period_end * 1000,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}