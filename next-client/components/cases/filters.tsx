'use client';

import { useState } from 'react';
import { Button, MySelect, Sheet, SheetContent, SheetTitle, Title } from '../index';
import { filtersInterface } from '@/@types/filers';
import { filters_local_storage } from '@/store/web_storage';
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const specialtyVariants = [
  { label: 'общий', value: 'general' },
  { label: 'неврология', value: 'neurology' },
];

const difficultyVariants = [
  { label: 'легкий', value: 'easy' },
  { label: 'нормальный', value: 'normal' },
  { label: 'сложный', value: 'hard' },
];

export const CasesFilters = ({ open, onOpenChange }: Props) => {
  const getInitialFilter = () => {
    const storedFilters = filters_local_storage.getToken();
    const allUndefined = {
      specialty: undefined,
      questions_count: undefined,
      difficulty: undefined,
    };

    if (!storedFilters) return allUndefined;

    try {
      const parsed = JSON.parse(storedFilters) as filtersInterface;

      return {
        specialty: parsed.specialty || undefined,
        questions_count: parsed.questions_count || undefined,
        difficulty: parsed.difficulty || undefined,
      };
    } catch (error) {
      console.error(error);
      return allUndefined;
    }
  };

  const initial = getInitialFilter();

  const [specialty, setSpecialty] = useState<string | undefined>(initial.specialty);
  const [questionsCount, setQuestionsCount] = useState<string | undefined>(initial.questions_count);
  const [difficulty, setDifficulty] = useState<string | undefined>(initial.difficulty);

  const handleApplyFilters = () => {
    const newFilters: filtersInterface = {
      specialty: specialty,
      questions_count: questionsCount,
      difficulty: difficulty,
    };

    filters_local_storage.setToken(JSON.stringify(newFilters));
    console.log(newFilters);
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
              variants={specialtyVariants.map((item) => item.label)}
              onValueChange={(value) => {
                const found = specialtyVariants.find((item) => item.label === value);
                setSpecialty(found ? found.value : undefined);
              }}
              value={specialtyVariants.find((item) => item.value === specialty)?.label || ''}
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
              variants={difficultyVariants.map((item) => item.label)}
              onValueChange={(value) => {
                const found = difficultyVariants.find((item) => item.label === value);
                setDifficulty(found ? found.value : undefined);
              }}
              value={difficultyVariants.find((item) => item.value === difficulty)?.label || ''}
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
