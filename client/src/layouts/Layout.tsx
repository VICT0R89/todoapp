import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { LayoutProps } from '@/interfaces/layout.type'
import { Toaster } from 'react-hot-toast'

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

export default Layout
