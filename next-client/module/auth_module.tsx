import { Icon } from '@/components/index';
import { MyInput } from '@/components/my_input';
import Image from 'next/image';

export function AuthModule() {
  return (
    <section>
      <h1>Регистрация</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus neque consectetur
        in, saepe animi repudiandae laboriosam! Aspernatur quis quia, dignissimos labore quod soluta
        illo, fuga laborum eius quo placeat necessitatibus.
      </p>
      <div className=" w-50 h-50">
        <Icon path="/icons/eye.svg" />
      </div>
      <div className="gap-5 flex flex-col mt-10">
        <MyInput label="Почта" placeholder="Введите почту" />
        <MyInput label="Пароль" placeholder="Введите пароль" secrue />
      </div>
    </section>
  );
}
