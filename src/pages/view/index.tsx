import { Title } from '@/components/Title/Title';
import { selectProductById } from '@/slices/product.slice';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductView } from '@/components/ProductView/ProductView';

export default function ViewPage() {
  const { id } = useParams<{ id: string }>();

  const product = useSelector((state: RootState) =>
    selectProductById(state, id!)
  );

  if (!id) {
    return <div>Не указан ID продукта</div>;
  }

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <section>
      <Title value={`Просмотр продукта ${id}`} />
      <ProductView product={product} />
    </section>
  );
}
