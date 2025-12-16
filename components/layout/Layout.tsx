import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] noise-overlay">
      <Header />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
