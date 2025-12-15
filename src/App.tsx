import { Suspense, useEffect } from 'react';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FallbackErrorView } from './components/FallbackErrorView';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { fetchProducts } from './slices/product.slice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<FallbackErrorView message="Загрузка..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
