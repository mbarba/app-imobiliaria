"use client";

import { Home, Menu, X, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Home className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">ImobPrime</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/imoveis" className="text-gray-700 hover:text-primary">Imóveis</Link>
            <Link href="/lancamentos" className="text-gray-700 hover:text-primary">Lançamentos</Link>
            <Link href="/sobre" className="text-gray-700 hover:text-primary">Sobre</Link>
            <Link href="/contato" className="text-gray-700 hover:text-primary">Contato</Link>
            {isAuthenticated ? (
              <Link href="/admin/dashboard">
                <Button variant="outline" className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/imoveis"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Imóveis
            </Link>
            <Link
              href="/lancamentos"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Lançamentos
            </Link>
            <Link
              href="/sobre"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            {isAuthenticated ? (
              <Link
                href="/admin/dashboard"
                className="block px-3 py-2 text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <button
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
              >
                Admin
              </button>
            )}
          </div>
        </div>
      )}

      <AuthModal
        open={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
      />
    </nav>
  );
}