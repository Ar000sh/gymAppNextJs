import "./globals.css";
// import { AuthProvider } from "@/contexts/AuthContext"; // add later
import Providers from "./providers";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-20">
        {/* <AuthProvider>{children}</AuthProvider> */}
        <Providers>{children}</Providers>
        {/*{children} */}
      </body>
    </html>
  );
}