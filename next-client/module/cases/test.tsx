'use client';

import { TestBlock } from '@/components/cases/test_block';
import { saveUserCompletedCase } from '@/services';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestCase } from '@/hooks/useTestCase';
import Link from 'next/link';
import { Button } from '@/components/index';

// Сделать сохранение прогресса в session storage

export const TestCaseModule = () => {
  const { caseData, counter, casesId, setCounter, maxCases, loading } = useTestCase();
  const [numError, setNumError] = useState<number>(0);
  const [finish, setFinish] = useState<boolean>(false);

  if (!casesId) return;

  const handleClickNext = (result: boolean) => {
    console.log('Ответ пользователя:', result);

    saveUserCompletedCase(casesId[counter]?.id, result === true ? 'success' : 'error');
    if (result === false) {
      setNumError((prev) => prev + 1);
    }

    if (counter + 1 < maxCases!) {
      setCounter(counter + 1);
    } else {
      setFinish(true);
    }
  };

  if (loading || !casesId) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      {!finish ? (
        <TestBlock
          fio={caseData?.fio}
          age={caseData?.age}
          gender={caseData?.gender === 'male' ? 'Мужской' : 'Женский'}
          analysis={caseData?.analysis || []}
          help={caseData?.help}
          answers={caseData?.answers || []}
          clinic={caseData?.clinicalCase}
          result={caseData?.correctAnswer}
          numberQuestion={counter + 1}
          maxQuestions={maxCases}
          calbackAnswer={(e) => handleClickNext(e)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 my-auto font-bold h-screen">
          <p className="text-2xl">Количество ошибок: {numError}</p>
          <p className="text-xl">
            Процент правильных ответов: {((maxCases! - numError) / maxCases!) * 100}%
          </p>

          <div className="mt-5">
            <Link href="/dashboard/cases">
              <Button>Вернуться на главный экран</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
