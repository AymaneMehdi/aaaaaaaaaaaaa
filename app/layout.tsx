import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import NavBar from "./components/nav/NavBar";
import CartProvider from "@/provider/CartProvider";
import toast, { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "E-shop",
  description: "Ecommerce app",
  icons: {
    icon: "../public/winter.jpeg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} text-slate-500`}
        suppressHydrationWarning={true}
      >
        <Toaster
          toastOptions={{
            style: { background: " rgb(51 65 85)", color: "#fff" },
          }}
        />
        <CartProvider>
          <div className=" flex flex-col min-h-screen">
            <NavBar />
            <main className=" flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
