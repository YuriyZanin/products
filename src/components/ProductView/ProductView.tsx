import type { Product } from '@/types';
import type { FC } from 'react';
import { Button } from '../Button/Button';
import defaultImage from '../../assets/chess.png';
import { useNavigate } from 'react-router-dom';
import styles from './ProductView.module.css';

export type ProductViewProps = {
  product: Product;
};

export const ProductView: FC<ProductViewProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.view}>
      <img
        className={styles.viewImage}
        src={product.picture ?? defaultImage}
        alt="Фото продукта"
      />
      <div className={styles.viewText}>{product.text}</div>
      <Button onClick={handleClickBack}>На главную</Button>
    </div>
  );
};
