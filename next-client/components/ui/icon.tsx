type Props = {
  path: string;
};

export const Icon = ({ path }: Props) => {
  return (
    <svg className={'w-6 h-6 '}>
      <use href={path}></use>
    </svg>
  );
};
