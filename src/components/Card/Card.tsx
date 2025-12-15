import type { Product } from '@/types';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct, toggleLike } from '@/slices/product.slice';
import type { AppDispatch } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';
import defaultImage from '../../assets/chess.png';
import LikeIcon from '../../assets/like.svg';
import DeleteIcon from '../../assets/trash.svg';
import clsx from 'clsx';

export type CardProps = {
  product: Product;
};

export const Card: FC<CardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLike = (product: Product) => {
    dispatch(toggleLike(product));
  };

  const handleDelete = (product: Product) => {
    dispatch(deleteProduct(product));
  };

  const handleCardClick = (product: Product) => {
    navigate(`./${product.id}`);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.cardContent}
        onClick={() => handleCardClick(product)}
      >
        <div className={styles.cardImage}>
          <img
            className={styles.image}
            src={product.picture ?? defaultImage}
            alt="Фото продукта"
          />
        </div>
        <div className={styles.cardText}>{product.text}</div>
      </div>
      <div className={styles.cardButtons}>
        <button
          className={styles.cardButton}
          onClick={() => handleLike(product)}
        >
          <LikeIcon
            className={clsx(styles.button, product.liked && styles.active)}
          />
        </button>
        <button
          className={styles.cardButton}
          onClick={() => handleDelete(product)}
        >
          <DeleteIcon className={styles.button} />
        </button>
      </div>
    </div>
  );
};
