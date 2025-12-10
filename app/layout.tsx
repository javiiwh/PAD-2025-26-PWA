"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {useEffect} from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("sw.js").catch((err) => console.log("Service Worker registration failed:", err))
        }
    }, [])

  return (
    <html lang="es">
    <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Busca libros por título, con soporte para modo offline" />
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="manifest" href="manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <title>Busqueda de libros</title>
        <meta name="apple-mobile-web-app-title" content="GoogleBooks" />
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
