import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Options: React.FC<Props> = ({ children }: Props) => {
  return (
    <div>
      Options
      {children}
    </div>
  );
};

export default Options;
