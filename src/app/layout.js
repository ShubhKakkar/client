import { Inter } from 'next/font/google'
import './globals.css'
import { SocketProvider } from '@/contexts/SocketContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'grocery-store/home',
  description: 'Home page for grocery store app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </head>
      <body className={inter.className}>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
