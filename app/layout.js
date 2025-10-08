import { DM_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Script from "next/script";

// Load DM Mono font
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"], // optional weights
  variable: "--font-dm-mono",
});

export const metadata = {
  title: "Robinhood",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmMono.variable}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            {children}
            <Script id="tawkto-chat" strategy="afterInteractive">
              {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68e39690a72e3519521839c9/1j6sg8a5v';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
            </Script>

          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
