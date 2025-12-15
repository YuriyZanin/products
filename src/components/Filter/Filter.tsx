import { getFilteredMethod, setFilteringMethod } from '@/slices/product.slice';
import type { AppDispatch } from '@/store/store';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { Button } from '../Button/Button';
import type { TFilterOption, TFilterOptions } from '@/types';

export type FilterProps = {
  options: TFilterOptions;
};

export const Filter: FC<FilterProps> = ({ options }) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeFilter = useSelector(getFilteredMethod);

  const handleFilter = (param: TFilterOption) => {
    dispatch(setFilteringMethod(param));
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterButtons}>
        {options.map(option => (
          <Button
            key={option}
            isActive={activeFilter === option}
            onClick={() => handleFilter(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};
