"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

function CartProvider({ children }: { children: ReactNode }) {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL as string;

  const successUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/stripe/success"
      : `${frontendUrl}/stripe/success`;

  const cancelUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/stripe/error"
      : `${frontendUrl}/stripe/error`;

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl={successUrl}
      cancelUrl={cancelUrl}
      currency="USD"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}

export default CartProvider;
