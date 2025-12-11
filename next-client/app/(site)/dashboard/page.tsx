import { redirect } from 'next/navigation';

export default function DashboardPage() {
  redirect('/dashboard/cases');
  return <div>Dashboard Page</div>;
}
