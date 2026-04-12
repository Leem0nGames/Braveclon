import type {Metadata, Viewport} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Braveclon - Brave Frontier Clone',
  description: 'Un RPG táctico por turnos con mecánicas gacha, ventajas elementales y Brave Bursts.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Braveclon',
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      rel: 'icon',
      url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect fill="%23fbbf24" width="48" height="48"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="30" fill="%23000">⚔️</text></svg>',
    }
  ],
  openGraph: {
    title: 'Braveclon - Brave Frontier Clone',
    description: 'RPG táctico por turnos con gacha, elementos y Brave Bursts',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#09090b',
  viewportFit: 'cover',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Braveclon" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect fill='%23fbbf24' width='180' height='180' rx='40'/><text x='90' y='90' text-anchor='middle' dominant-baseline='middle' font-size='120' font-weight='bold' fill='%23000'>⚔️</text></svg>" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
