'use client';

import { FiltersState } from '@/@types/filers';
import { TestBlock } from '@/components/cases/test_block';
import { useFilters } from '@/hooks/useFilters';
import { getCaseById, getCasesWitchSettings, saveUserCompletedCase } from '@/services';
import { useEffect, useMemo, useState } from 'react';

const useTestCase = () => {
  const [casesId, setCasesId] = useState<getCasesIdType[] | null>(null);
  const [counter, setCounter] = useState<number>(0);
  const [caseData, setCaseData] = useState<any>(null);
  const [loadingCases, setLoadingCases] = useState(false);
  const { filters, loading } = useFilters();

  useEffect(() => {
    if (loading || !filters) return;

    let cancelled = false;

    const fetchCasesId = async () => {
      setLoadingCases(true);

      const res = await getCasesWitchSettings({
        type: filters.specialty,
        count: Number(filters.questions_count),
        difficulty: filters.difficulty,
      });

      if (!cancelled) {
        setCasesId(res);
        setCounter(0);
      }

      setLoadingCases(false);
    };

    fetchCasesId();

    return () => {
      cancelled = true;
    };
  }, [loading, filters]);

  useEffect(() => {
    if (!casesId || !casesId[counter]) return;

    let cancelled = false;

    const fetchCase = async () => {
      setCaseData(null);

      const res = await getCaseById(casesId[counter].id);

      if (!cancelled) {
        setCaseData(res);
      }
    };

    fetchCase();

    return () => {
      cancelled = true;
    };
  }, [casesId, counter]);

  const maxCases = useMemo(() => casesId?.length ?? 0, [casesId]);

  return {
    loading: loading || loadingCases,
    caseData,
    casesId,
    counter,
    maxCases,
    setCounter,
  };
};

type getCasesIdType = {
  id: string;
  difficulty: string;
  type: string;
};

// Сделать сохранение прогресса в session storage

export const TestCaseModule = () => {
  const { caseData, counter, casesId, setCounter, maxCases, loading } = useTestCase();
  const [numError, setNumError] = useState<number>(0);

  const handleClickNext = (result: boolean) => {
    console.log('Ответ пользователя:', result);

    saveUserCompletedCase(loading && casesId[counter].id, result === true ? 'success' : 'error');
    if (result === false) {
      setNumError((prev) => prev + 1);
    }

    if (counter + 1 < maxCases!) {
      setCounter(counter + 1);
    } else {
      console.log('Тест завершен');

      // Страница с окончанием теста
    }
  };

  console.log('render');

  if (loading || !casesId) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
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

      {<div>{}</div>}
    </>
  );
};
