import { NavBar } from '@/components/index';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen pt-5 pb-20 bg-zinc-50 dark:bg-black">
      {children}
      <NavBar />
    </main>
  );
}
