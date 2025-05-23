import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryProvider } from '@/providers/query';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ImobPrime | Seu Imóvel dos Sonhos',
  description: 'Encontre as melhores ofertas de imóveis com a ImobPrime',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster richColors />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}