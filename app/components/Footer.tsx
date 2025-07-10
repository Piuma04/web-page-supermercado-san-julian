import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          
          <div className="space-y-4">
              <Image
                src="/images/favicon.ico"
                alt="Logo"
                width={256}
                height={255}
                className="h-auto w-auto"
              />
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                  Mi Cuenta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-400">Av. San Martín 1584, Laprida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-400">+54 9 2284 57-7592</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
                <Link
                href="https://www.facebook.com/sanjulian.supermercado/"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Ir a Facebook de Supermercado San Julián"
                >
                <Facebook className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                href="https://www.instagram.com/sanjuliansupermercado/"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Ir a Instagram de Supermercado San Julián"
                >
                <Instagram className="h-5 w-5" aria-hidden="true" />
                </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Supermercado San Julián. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
