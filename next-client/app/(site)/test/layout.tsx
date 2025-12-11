export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-zinc-50 text-text-black">
      <div>{children}</div>
    </main>
  );
}
