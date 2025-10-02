import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/footer"
import "./globals.css"
import AuthProvider from "./_providers/auth"
import { ThemeProvider } from "./_providers/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FSW Barber - Agende seu horário",
  description: "Sistema de agendamento profissional para barbearias",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "bg-card border-border/50 text-foreground",
                title: "text-foreground font-semibold",
                description: "text-muted-foreground",
                actionButton:
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                cancelButton:
                  "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                error:
                  "bg-destructive text-destructive-foreground border-destructive",
                success: "bg-primary/10 text-foreground border-primary/20",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
