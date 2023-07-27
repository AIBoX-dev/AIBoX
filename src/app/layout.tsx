import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeProvider } from "@/components/theme-provider"
import { M_PLUS_2 } from 'next/font/google'

const inter = M_PLUS_2({ weight: ["100","200","300","400","500","600","700","800","900"], subsets: ["latin"] })

export const metadata = {
  title: {
    default: 'AIBoX',
    template: '%s | AIBoX',
  },
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen relative pb-60 box-border`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
