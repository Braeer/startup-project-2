'use client';

import Link from 'next/link';
import { Button, Container } from '../index';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

type Props = {
  fio: string;
  age: number;
  gender: 'Мужской' | 'Женский';
  clinic: string;
  analysis: string[];
  help: string;
  result: string;
  answers: string[];
  numberQuestion: number;
  maxQuestions: number;
  calbackAnswer: (answer: boolean) => void;
};

export const TestBlock = ({
  fio,
  age,
  gender,
  help,
  clinic,
  analysis,
  numberQuestion,
  maxQuestions,
  answers,
  result,
  calbackAnswer,
}: Props) => {
  const [active, setActive] = useState<number | null>(null);

  const handleAnswerClick = () => {
    if (active === null) return;

    if (answers[active! - 1] === result) {
      calbackAnswer(true);
      return;
    }
    calbackAnswer(false);
  };

  return (
    <section>
      <div className="relative flex flex-col items-center gap-4 mb-8 bg-bluebg m-0 p-3 rounded-b-main">
        <Link className="absolute left-2 top-2" href="/dashboard/cases">
          <ChevronLeft size={36} />
        </Link>

        <h1 className="text-2xl font-semibold text-center flex-1">
          {numberQuestion && maxQuestions ? `Кейс ${numberQuestion}/${maxQuestions}` : 'Тест'}
        </h1>
      </div>

      <Container className="mx-4 py-6 px-8 flex flex-col gap-1 border border-black/30 rounded-main mb-8">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">{fio}</h2>
          {/* <Button className="w-12 h-12" variant="link" size="icon-lg">
            <Star size={20} />
          </Button> */}
        </div>
        <p>
          <b>Возраст:</b> {age} лет
        </p>
        <p>
          <b>Пол:</b> {gender}
        </p>
        <div className="mt-2">
          <b>Клинический случай:</b>
          <p>{clinic}</p>
        </div>
        <div className="mt-2">
          <b>Анализы:</b>
          <ul>
            {analysis.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <b>Подсказка:</b>
          <p>{help}</p>
        </div>

        <div className="mt-4 w-full border-t-2 border-black/30 pt-2">
          <b className="text-lg">Какой диагноз наиболее вероятен:</b>

          <ul>
            {answers.map((item, index) => (
              <li className="text-acent" key={index}>
                {String.fromCharCode('A'.charCodeAt(0) + index) + ')'} {item}
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-center gap-2 flex-wrap mt-6">
            <Button
              variant={active === 1 ? 'default' : 'outline'}
              onClick={() => setActive(1)}
              size={'md'}>
              A
            </Button>
            <Button
              variant={active === 2 ? 'default' : 'outline'}
              onClick={() => setActive(2)}
              size={'md'}>
              B
            </Button>
            <Button
              variant={active === 3 ? 'default' : 'outline'}
              onClick={() => setActive(3)}
              size={'md'}>
              C
            </Button>
            <Button
              variant={active === 4 ? 'default' : 'outline'}
              onClick={() => setActive(4)}
              size={'md'}>
              D
            </Button>
            <Button
              variant={active === 5 ? 'default' : 'outline'}
              onClick={() => setActive(5)}
              size={'md'}>
              E
            </Button>
          </div>
        </div>
      </Container>

      <div className="mx-4 mb-10">
        <Button className="w-full" size="lg" disabled={active === null} onClick={handleAnswerClick}>
          {numberQuestion < maxQuestions ? 'Следующий вопрос' : 'Завершить тест'}
        </Button>
      </div>
    </section>
  );
};
