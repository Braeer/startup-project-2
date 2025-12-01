'use client';

import { MyInput } from '@/components/index';
import { getMyProfile } from '@/services/user/get_profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function EditProfileModule() {
  const [loading, setLoading] = useState(true);

  const UpdateSchema = z
    .object({
      username: z.string().min(2, 'Имя пользователя должно быть не менее 2 символов').optional(),
      email: z.string().email('Неправильный email').optional(),
      password: z.string().min(6, 'Пароль должен быть не менее 6 символов').optional(),
      confirmPassword: z.string().min(6, 'Пароль должен быть не менее 6 символов').optional(),
      specialization: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    });

  type UpdateFormValues = z.infer<typeof UpdateSchema>;

  const old_data = getMyProfile().then((data) => {
    setLoading(false);
    return data;
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      username: old_data?.username || '',
      email: '',
      password: '',
      confirmPassword: '',
      specialization: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: UpdateFormValues) => {
    console.log(data);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="gap-5 flex flex-col mt-10">
          <MyInput
            label="Почта"
            placeholder="Введите почту"
            error={errors.email?.message}
            success={!errors.email && watch('email')?.length > 5 && watch('email').includes('@')}
            {...register('email')}
          />
          <MyInput
            label="Имя пользователя"
            placeholder="Введите имя"
            error={errors.username?.message}
            success={!errors.username && watch('username')?.length > 2}
            {...register('username')}
          />
          <MyInput
            label="Пароль"
            placeholder="Введите пароль"
            secrue
            error={errors.password?.message}
            success={!errors.password && watch('password')?.length >= 6}
            {...register('password')}
          />
          <MyInput
            label="Повторите пароль"
            placeholder="Введите пароль повторно"
            secrue
            error={errors.confirmPassword?.message}
            success={
              !errors.confirmPassword &&
              watch('confirmPassword')?.length >= 6 &&
              watch('password') === watch('confirmPassword')
            }
            {...register('confirmPassword')}
          />
        </div>
      </form>
    </section>
  );
}
