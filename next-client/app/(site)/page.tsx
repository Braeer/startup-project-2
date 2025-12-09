import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard/cases');

  return (
    <div>
      <p>/dash</p>
    </div>
  );
}
