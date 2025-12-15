import type { FC } from 'react';
import styles from './Title.module.css';

export type TitleProps = {
  value: string;
};

export const Title: FC<TitleProps> = ({ value }) => {
  return (
    <div className={styles.Title}>
      <h1>{value}</h1>
    </div>
  );
};
