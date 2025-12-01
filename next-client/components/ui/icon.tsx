type Props = {
  path: string;
};

export const Icon = ({ path }: Props) => {
  return (
    <svg width="22" height="22" className="inline-block">
      <use href={path}></use>
    </svg>
  );
};
