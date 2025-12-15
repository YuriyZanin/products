import { type FC } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

export const Button: FC<ButtonProps> = ({
  isActive = false,
  type = 'button',
  onClick,
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, isActive && styles.active)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
