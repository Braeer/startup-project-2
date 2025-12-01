import { NavBar } from '@/components/index';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className="text-warning">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic recusandae debitis laudantium
        aut, harum animi minus eaque assumenda itaque provident error deserunt perspiciatis sequi
        molestias adipisci quasi, doloribus necessitatibus enim.
      </p>

      <NavBar />
    </div>
  );
}
