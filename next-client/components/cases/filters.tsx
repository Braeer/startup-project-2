'use client';

import { useEffect, useState } from 'react';
import { Button, MySelect, Sheet, SheetContent, SheetTitle, Title } from '../index';
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

    setData(newFilters);
    filters_local_storage.setToken(JSON.stringify(newFilters));
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] max-h-[800px] rounded-t-main">
        <Title size="md" text="Фильтры" className="text-center my-5" />

        <div className="max-w-[700px] mx-auto w-full px-3 h-full flex flex-col justify-between gap-6 pb-6">
          <div>
            <MySelect
              label="По специальности / направлению"
              placeholder="Выберете направление"
              variants={['общий', 'хирургия']}
              onValueChange={setSpecialty}
              value={specialty}
            />
            <MySelect
              label="Количество вопросов"
              placeholder="Выберете количество вопросов"
              variants={['1', '2', '3', '5']}
              onValueChange={setQuestionsCount}
              value={questionsCount}
            />
            <MySelect
              label="Сложность"
              placeholder="Выберете сложность"
              variants={['normal', 'hard']}
              onValueChange={setDifficulty}
              value={difficulty}
            />
          </div>

          <div>
            <Button className="w-full max-w-[700px]" size={'lg'} onClick={handleApplyFilters}>
              Применить фильтры
            </Button>
          </div>
        </div>
      </SheetContent>
      <SheetTitle />
    </Sheet>
  );
};
