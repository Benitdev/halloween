import localFont from "next/font/local"
import { Eater } from "next/font/google"
import { Rubik_Burned } from "next/font/google"

import "./globals.css"
import "./seminar.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

const gesco = localFont({
  src: "./fonts/Gesco.ttf",
  variable: "--font-gesco",
  weight: "100 900",
})

const hongKy2 = localFont({
  src: "./fonts/HONG KY 2.ttf",
  variable: "--font-hongKy2",
  weight: "100 900",
})

const eater = Eater({
  subsets: ["latin"],
  variable: "--font-eater",
  weight: "400",
})

const fontHeading = Rubik_Burned({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${eater.variable} ${fontHeading.variable} ${gesco.variable} ${hongKy2.variable} antialiased`}
      >
        {children}
        {/* <AnimatedCursor
          innerSize={36}
          outerSize={0}
          color="transparent"
          outerAlpha={0.2}
          innerScale={0.6}
          outerScale={4}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
          innerStyle={{
            backgroundImage: `url(/images/pointer.png)`,
            backgroundSize: "cover",
          }}
        /> */}
      </body>
    </html>
  )
}
