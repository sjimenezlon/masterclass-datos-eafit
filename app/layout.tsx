import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Masterclass Datos · EAFIT',
  description:
    'Cultura, gobernanza, visualización e inteligencia artificial sobre datos. Una experiencia interactiva diseñada para EAFIT · Dirección de Desarrollo Académico.',
  keywords: ['datos', 'gobernanza', 'EAFIT', 'IA', 'visualización', 'masterclass'],
  authors: [{ name: 'Santiago Jiménez · EAFIT' }],
  openGraph: {
    title: 'Masterclass Datos · EAFIT',
    description: 'De la cultura del dato a la inteligencia artificial.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
