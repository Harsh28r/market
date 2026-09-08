"use client";

import Script from "next/script";
import { CLARITY_ID } from "@/lib/site";

const ID = /^[a-zA-Z0-9]+$/.test(CLARITY_ID) ? CLARITY_ID : "";

export function Clarity() {
  if (!ID) return null;
  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(ID)});`,
      }}
    />
  );
}
