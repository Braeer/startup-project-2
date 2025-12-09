import { Title } from '@/components/index';
import { StartCaseModule } from '@/module/cases/start';

export default function CasesPage() {
  return (
    <div>
      <Title text="Кейсы" />
      <StartCaseModule />
    </div>
  );
}
