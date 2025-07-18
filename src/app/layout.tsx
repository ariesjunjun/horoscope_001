import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { DM_Serif_Display } from 'next/font/google';
import StarryBackground from "@/components/StarryBackground";

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: "ホロスコープ研究所",
  description: "占星術・占いについての雑談掲示板",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto p-4 md:p-8">
          <div className="w-full">
            {children}
          </div>
        </main>
        <Footer />
        <ScrollToTop />

       
      </body>
    </html>
  );
}
