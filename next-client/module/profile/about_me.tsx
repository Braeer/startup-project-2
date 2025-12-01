import { Container } from '@/components/ui/container';

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <span className="bg-acent text-white p-2 rounded-main">{value}</span>
    </div>
  );
};

export function AboutMeModule() {
  return (
    <Container>
      <h2>Данные об аккаунте</h2>
      <div className="flex flex-col gap-4 my-4">
        <Item label="Почта" value="developer@dev.dev" />
        <Item label="Имя" value="Иван" />
        <Item label="Специализация" value="Ветеринар" />
      </div>
    </Container>
  );
}
