import type { Product } from '@/types';
import { useState, type FC } from 'react';
import styles from './ProductList.module.css';
import { Filter } from '../Filter/Filter';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { VISIBLE_CARDS } from '@/constants';

export type ProductListProps = {
  products: Product[];
};

export const ProductList: FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(VISIBLE_CARDS);
  const hasMoreCards = products.length - visibleCards > 0;

  const loadMoreCards = () => {
    setVisibleCards(prevVisible => prevVisible + VISIBLE_CARDS);
  };

  const handleAdd = () => {
    navigate(ROUTES.create);
  };

  return (
    <div className={styles.sectionList}>
      <div className={styles.filter}>
        <Filter options={['All', 'Liked']} />
        <Button onClick={handleAdd}>Добавить</Button>
      </div>
      <div className={styles.sectionCards}>
        {products.slice(0, visibleCards).map((card, index) => (
          <Card key={index} product={card} />
        ))}
      </div>
      <div className={styles.moreButton}>
        {hasMoreCards && <Button onClick={loadMoreCards}>Показать еще</Button>}
      </div>
    </div>
  );
};
