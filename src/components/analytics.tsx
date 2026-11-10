import Script from "next/script";

import { analyticsConfig } from "@/config/analytics";

/**
 * Google Analytics 4 + Meta Pixel. Không có mã trong src/config/analytics.ts thì không tải gì.
 * `pnpm dev` (máy cá nhân) không tải để bấm thử không lẫn vào số liệu thật.
 */
export function Analytics() {
  if (process.env.NODE_ENV === "development") return null;
  const { ga4Id, metaPixelId } = analyticsConfig;
  return (
    <>
      {ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());gtag("config","${ga4Id}");`}
          </Script>
        </>
      ) : null}
      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${metaPixelId}");fbq("track","PageView");`}
        </Script>
      ) : null}
    </>
  );
}
