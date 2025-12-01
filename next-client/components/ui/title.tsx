type Props = {
  text: string;
};

export const Title = ({ text }: Props) => {
  return <h1 className="font-bold text-4xl">{text}</h1>;
};
