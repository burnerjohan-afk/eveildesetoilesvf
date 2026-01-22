import { NextRequest, NextResponse } from "next/server";

// Route pour initier le paiement Stripe
// En DEV: redirige vers une page de confirmation
// En PROD: intégrer Stripe Checkout

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const offerKey = formData.get("offerKey") as string;
    const amount = formData.get("amount") as string;

    // En développement, on simule juste le paiement
    if (process.env.NODE_ENV === "development") {
      console.log("=== PAIEMENT STRIPE (DEV) ===");
      console.log("Offre:", offerKey);
      console.log("Montant:", amount);
      console.log("=============================");
      
      // Rediriger vers une page de confirmation
      return NextResponse.redirect(
        new URL(`/offres-tarifs/paiement-confirme?offer=${offerKey}`, request.url)
      );
    }

    // PROD: Intégrer Stripe Checkout
    // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "eur",
    //         product_data: {
    //           name: `Formation ${offerKey}`,
    //         },
    //         unit_amount: parseInt(amount),
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/offres-tarifs/paiement-confirme?offer=${offerKey}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/offres-tarifs/${slug}`,
    // });
    // return NextResponse.redirect(session.url);

    return NextResponse.json({ error: "Stripe non configuré" }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur lors du paiement" },
      { status: 500 }
    );
  }
}
