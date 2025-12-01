'use client';

import { Button } from '@/components/index';
import { MyInput } from '@/components/my_input';
import { Checkbox } from '@/components/ui/checkbox';
import { registerRequest } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export function RegisterModule() {
  const RegisterSchema = z
    .object({
      name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
      email: z.string().email('Неправильный email'),
      password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
      confirmPassword: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
      acceptTerms: z.literal(true, { message: 'Необходимо принять условия' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    });

  type RegisterFormValues = z.infer<typeof RegisterSchema>;

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: true,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormValues) => {
    registerRequest('/auth/register', {
      email: data.email,
      password: data.password,
      username: data.name,
    }).then((success) => {
      if (!success) {
        alert('Ошибка при входе. Проверьте правильность введенных данных.');
      }
    });
  };

  return (
    <section className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="text-4xl text-center">Регистрация</h1>
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
            error={errors.name?.message}
            success={!errors.name && watch('name')?.length > 2}
            {...register('name')}
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

          <div className="flex justify-between items-center">
            <p className=" text-black/50 text-sm mr-2">
              Согласен с условиями{' '}
              <span>
                <a className="text-acent" href="">
                  пользовательского соглашения
                </a>
              </span>
            </p>
            <Controller
              control={control}
              name="acceptTerms"
              render={({ field }) => (
                <Checkbox
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                  // {...register('acceptTerms')}
                  defaultChecked
                />
              )}
            />
          </div>
        </div>

        <p className="mt-10 text-black/50 text-sm text-center">
          Если у вас есть аккаунт, то переходите на страницу{' '}
          <span>
            <a href="/auth/login" className="text-acent underline underline-offset-2 font-semibold">
              авторизации
            </a>
          </span>
        </p>

        <div className="my-5 flex">
          <Button className="w-full" size={'lg'} disabled={!isValid} type="submit">
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </section>
  );
}
