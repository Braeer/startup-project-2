type Props = {
  path: string;
};

export const Icon = ({ path }: Props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use href={path}></use>
    </svg>
  );
};
