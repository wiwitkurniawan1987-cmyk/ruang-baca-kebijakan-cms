/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { headers } from "next/headers";
import { getPublicNavigation, getSiteSettings, type PublicMenu } from "../../lib/cms";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "127.0.0.1:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");
  const baseURL = `${protocol}://${host}`;
  const title = "Ruang Baca Kebijakan | Pusat Studi Kebijakan Pendidikan";
  const description = "Pusat riset dan ruang belajar bersama untuk kebijakan pendidikan, perpustakaan, taman baca, dan diskusi publik.";

  return {
    metadataBase: new URL(baseURL),
    title: { default: title, template: "%s | Ruang Baca Kebijakan" },
    description,
    openGraph: {
      type: "website",
      locale: "id_ID",
      title,
      description,
      images: [{ url: "/og.png", width: 1731, height: 909, alt: "Ruang Baca Kebijakan — Riset, Bacaan, Percakapan Publik" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

function Nav({ items }: { items: PublicMenu[] }) {
  return <nav aria-label="Navigasi utama">
    <a href="/">Beranda</a>
    {items.map((item) => item.children.length ? (
      <details className="nav-group" key={item.id}>
        <summary>{item.label}</summary>
        <div className="submenu">
          <a href={item.href}>Semua {item.label}</a>
          {item.children.map((child) => <a key={child.id} href={child.href}>{child.label}</a>)}
        </div>
      </details>
    ) : <a key={item.id} href={item.href}>{item.label}</a>)}
    <a className="admin-link" href="/admin">Login Admin</a>
  </nav>;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [items, settings] = await Promise.all([getPublicNavigation(), getSiteSettings()]);
  const siteName = settings?.siteName || "Ruang Baca Kebijakan";
  const organizationName = settings?.organizationName || "Pusat Studi Kebijakan Pendidikan";
  const tagline = settings?.tagline || "Riset yang jernih, bacaan yang terbuka, dan percakapan publik yang bermakna.";
  return (
    <html lang="id"><body>
      <header className="site-header">
        <a className="brand" href="/" aria-label={`${siteName}, beranda`}><b>RB</b><span><strong>{siteName}</strong><small>{organizationName}</small></span></a>
        <div className="desktop-nav"><Nav items={items} /></div>
        <details className="mobile-nav"><summary>Menu</summary><Nav items={items} /></details>
      </header>
      {children}
      <footer>
        <div><span className="footer-kicker">{organizationName}</span><h2>{siteName}</h2><p>{tagline}</p></div>
        <div className="footer-nav"><a href="/terbitan-terbaru">Publikasi</a><a href="/ruang-pengetahuan">Ruang Pengetahuan</a><a href="/agenda">Agenda</a></div>
        <small>© 2026 {siteName} · Dikelola melalui dashboard konten</small>
      </footer>
    </body></html>
  );
}
