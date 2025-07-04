"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Crown, Menu, X, Zap } from "lucide-react"
import { useState } from "react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Rules", href: "/rules" },
  { name: "Gallery", href: "/gallery" },
  { name: "VIP", href: "/vip" },
  { name: "Staff", href: "/staff" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Whitelist", href: "/whitelist" },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Crown className="h-10 w-10 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
            </div>
            <div>
              <span className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors">
                UNITED
              </span>
              <div className="text-xs text-orange-400 font-semibold tracking-wider">SERVER</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative group ${
                    pathname === item.href
                      ? "text-orange-400 bg-orange-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden lg:block">
            <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 group">
              <Zap className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-orange-500/10 hover:text-orange-400 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-black/95 backdrop-blur-xl border-t border-orange-500/20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                  pathname === item.href
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3 rounded-xl font-semibold">
                <Zap className="mr-2 h-4 w-4" />
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
