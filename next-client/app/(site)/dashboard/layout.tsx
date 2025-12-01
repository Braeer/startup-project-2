import { NavBar } from '@/components/index';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="pt-5 px-4">{children}</div>
      <NavBar />
    </main>
  );
}
