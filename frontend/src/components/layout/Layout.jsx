import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2026 Real estate key - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
