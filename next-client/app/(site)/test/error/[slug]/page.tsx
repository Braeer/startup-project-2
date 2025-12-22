'use client';

import { TestBlock } from '@/components/index';
import { getUserCompletedCaseById, updateUserCompletedCase } from '@/services';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState();
  const params = useParams();
  const router = useRouter();

  if (!params.slug || Array.isArray(params.slug)) {
    return null;
  }
  const slug = params.slug;

  useEffect(() => {
    getUserCompletedCaseById(slug).then((res) => {
      setData(res);
    });
  }, []);

  const handleClick = async (result: boolean) => {
    if (!result) {
      alert('Не правильно');
      return;
    }

    console.log('Ответ пользователя:', result);

    try {
      await updateUserCompletedCase(slug);

      router.push('/dashboard/profile/errors');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <TestBlock
        fio={data?.case.fio}
        age={data?.case.age}
        gender={data?.case.gender === 'male' ? 'Мужской' : 'Женский'}
        analysis={data?.case.analysis || []}
        help={data?.case.help}
        answers={data?.case.answers || []}
        clinic={data?.case.clinicalCase}
        result={data?.case.correctAnswer}
        calbackAnswer={(e) => handleClick(e)}
      />
    </section>
  );
}
