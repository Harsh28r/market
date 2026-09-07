"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { OtpAuth } from "@/components/otp-auth";

function Inner() {
  const params = useSearchParams();
  return <OtpAuth mode="signup" next={params.get("next") || "/account"} />;
}

export default function SignupPage() {
  return (
    <Suspense>
      <Inner />
    </Suspense>
  );
}
