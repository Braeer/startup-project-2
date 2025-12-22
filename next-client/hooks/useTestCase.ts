import { useFilters } from '@/hooks/useFilters';
import { useEffect, useMemo, useState } from 'react';
import { getCaseById, getCasesWitchSettings } from '@/services';

type getCasesIdType = {
  id: string;
  difficulty: string;
  type: string;
};

export const useTestCase = () => {
  const [casesId, setCasesId] = useState<getCasesIdType[] | null>(null);
  const [counter, setCounter] = useState<number>(0);
  const [caseData, setCaseData] = useState<any>(null);
  const [loadingCases, setLoadingCases] = useState(false);
  const { filters, loading } = useFilters();

  useEffect(() => {
    if (loading) return;

    let cancelled = false;

    const fetchCasesId = async () => {
      setLoadingCases(true);

      const res = await getCasesWitchSettings({
        type: filters?.specialty,
        count: Number(filters?.questions_count) || 1,
        difficulty: filters?.difficulty,
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
