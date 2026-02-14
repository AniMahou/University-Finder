import "./globals.css";

export const metadata = {
  title: "University Finder - Discover Your Perfect University",
  description: "Find and compare top universities worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}