// import type { Metadata } from "next";
// import "./globals.css";
// import { SiteShell } from "./Components/SiteShell";

// export const metadata: Metadata = {
//   title: "Pooya Vaghef – Portfolio",
//   description: "Minimal full-screen portfolio with React Bits background.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-white text-white dark:bg-black">
//         <SiteShell>{children}</SiteShell>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "./Components/SiteShell";

export const metadata: Metadata = {
  title: "Pooya Vaghef – Portfolio",
  description: "Minimal full-screen portfolio with React Bits background.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          bg-black text-white
          dark:bg-white dark:text-black
          transition-colors duration-500
        "
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
