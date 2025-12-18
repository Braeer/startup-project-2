import { FiltersState } from '@/@types/filers';
import { filters_local_storage } from '@/store/web_storage';
import { useEffect, useState } from 'react';

export const useFilters = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<FiltersState>(null);

  useEffect(() => {
    try {
      const stored = filters_local_storage.getToken();

      if (!stored) {
        setFilters(null);
        return;
      }

      const parsed = JSON.parse(stored);

      setFilters({
        specialty: parsed?.specialty,
        questions_count: parsed?.questions_count,
        difficulty: parsed?.difficulty,
      });
    } catch (error) {
      console.error(error);
      setFilters(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // const setInitialFilters = (value: string | null) => {
  //   try {
  //     if (!value) {
  //       setState(null);
  //       return false;
  //     }

  //     const parse = JSON.parse(value);

  //     setState({
  //       specialty: parse?.specialty,
  //       questions_count: parse?.questions_count,
  //       difficulty: parse?.difficulty,
  //     });

  //     return false;
  //   } catch (e) {
  //     setState(null);
  //     console.error(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   setInitialFilters(storedFilters);
  // }, [storedFilters]);

  return {
    loading,
    filters,
  };
};
