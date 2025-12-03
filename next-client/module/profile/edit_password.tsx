'use client';

import { Button, MyInput } from '@/components/index';
import { editMyPassword } from '@/services/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

export function EditPasswordModule() {
  const UpdateSchema = z
    .object({
      password: z.string().min(6, 'Новый пароль должен быть не менее 6 символов'),
      newPassword: z.string().min(6, 'Текущий пароль должен быть не менее 6 символов'),
      confirmPassword: z.string().min(6, 'Новый пароль должен быть не менее 6 символов'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    });

  type UpdateFormValues = z.infer<typeof UpdateSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateSchema),
  });

  const onSubmit = async (data: UpdateFormValues) => {
    await editMyPassword({
      password: data.password,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    }).catch((err) => console.log(err));
  };
  return (
    <section className="px-4 ">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="gap-5 flex flex-col mt-10">
          <MyInput
            label="Текущий пароль"
            placeholder="Введите пароль"
            secrue
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
          <MyInput
            label="Пароль"
            placeholder="Введите пароль"
            secrue
            error={errors.password?.message}
            {...register('password')}
          />
          <MyInput
            label="Повторите пароль"
            placeholder="Введите пароль повторно"
            secrue
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <Button size={'lg'} className="w-full mt-10" type="submit">
          Сохранить изменения
        </Button>
      </form>
    </section>
  );
}
