'use client';

import { Button, MyInput } from '@/components/index';
import { editMyProfile } from '@/services/index';
import { user_session_storage } from '@/store/web_storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function EditProfileModule() {
  const UpdateSchema = z.object({
    username: z.string().min(2, 'Имя пользователя должно быть не менее 2 символов').optional(),
    email: z.string().email('Неправильный email').optional(),
    specialization: z.string().optional(),
  });

  type UpdateFormValues = z.infer<typeof UpdateSchema>;

  const data = user_session_storage.getToken();
  const parsedData = data ? JSON.parse(data) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      username: parsedData?.username || ' ',
      email: parsedData?.email || ' ',
      specialization: parsedData?.specialty || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: UpdateFormValues) => {
    await editMyProfile({
      username: data.username,
      email: data.email,
      specialty: data.specialization,
    });
  };

  return (
    <section className="pb-20">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="gap-5 flex flex-col mt-10">
          <MyInput
            label="Имя пользователя"
            placeholder="Введите имя"
            error={errors.username?.message}
            {...register('username')}
          />
          <MyInput
            label="Почта"
            placeholder="Введите почту"
            error={errors.email?.message}
            {...register('email')}
          />
          <MyInput
            label="Специализация"
            placeholder="Введите специализацию"
            error={errors.specialization?.message}
            {...register('specialization')}
          />
        </div>
        <Button size={'lg'} className="w-full mt-10" type="submit">
          Сохранить изменения
        </Button>
      </form>
    </section>
  );
}
