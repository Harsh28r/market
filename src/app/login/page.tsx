"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { OtpAuth } from "@/components/otp-auth";

function Inner() {
  const params = useSearchParams();
  return <OtpAuth mode="login" next={params.get("next") || "/account"} />;
}

export default function LoginPage() {
  return (
    <Suspense>
      <Inner />
    </Suspense>
  );
}
