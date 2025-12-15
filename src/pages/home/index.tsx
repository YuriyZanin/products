import { ProductList } from '@/components/ProductList/ProductList';
import { Title } from '@/components/Title/Title';
import { isLoadingProducts, selectProducts } from '@/slices/product.slice';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const products = useSelector(selectProducts);
  const isLoading = useSelector(isLoadingProducts);

  return (
    <section>
      <Title value="Список продуктов" />
      {isLoading ? <div>Загрузка...</div> : <ProductList products={products} />}
    </section>
  );
}
