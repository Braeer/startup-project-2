'use client';

import { useEffect, useState } from 'react';
import { MySelect, Sheet, SheetContent, SheetTitle, Title } from '../index';
import { filtersInterface } from '@/@types/filers';
import { filters_local_storage } from '@/store/web_storage';
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CasesFilters = ({ open, onOpenChange }: Props) => {
  const [data, setData] = useState<filtersInterface | null>(null);
  const [specialty, setSpecialty] = useState<string | undefined>(undefined);
  const [questionsCount, setQuestionsCount] = useState<string | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedFilters = filters_local_storage.getToken();
    if (storedFilters) {
      setSpecialty(JSON.parse(storedFilters).specialty);
      setQuestionsCount(JSON.parse(storedFilters).questions_count);
      setDifficulty(JSON.parse(storedFilters).difficulty);
    }
  }, []);

  const handleApplyFilters = () => {
    const newFilters: filtersInterface = {
      specialty,
      questions_count: questionsCount,
      difficulty,
    };
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] max-h-[800px] rounded-t-main">
        <Title size="md" text="Фильтры" className="text-center my-5" />

        <div className="px-3">
          <MySelect
            label="По специальности / направлению"
            placeholder="Выберете направление"
            variants={['общий', 'хирургия']}
            onValueChange={(value) => console.log(value)}
          />
        </div>
      </SheetContent>
      <SheetTitle />
    </Sheet>
  );
};
