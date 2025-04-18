import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BMG Quiz",
  description: "Take quizes the easy way",
};

export default function RootLayout({ children }) {
  
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/fontawesome.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/brands.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-gray-100`}>
        {/* <ClerkProvider publishableKey='pk_test_bWFueS1oZXJtaXQtNTYuY2xlcmsuYWNjb3VudHMuZGV2JA'> */}
          {children}
        {/* </ClerkProvider> */}
        </body>
    </html>
)}

