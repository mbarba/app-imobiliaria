import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ImobPrime</h3>
            <p className="text-gray-400">
              Sua imobiliária de confiança para encontrar o imóvel dos seus sonhos.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contato@imobprime.com.br</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Horário de Funcionamento</h3>
            <p className="text-gray-400">
              Segunda a Sexta: 9h às 18h<br />
              Sábado: 9h às 13h
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ImobPrime. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}