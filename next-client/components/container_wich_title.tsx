import { Container } from './ui/container';
import { Title } from './ui/title';

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const ContainerWichTitle = ({ title, children, className }: Props) => {
  return (
    <Container className={className}>
      <Title text={title} size="md" className="mb-2" />
      {children}
    </Container>
  );
};
