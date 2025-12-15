import { get } from '@/api/get-products';
import type { Product, TFilterOption } from '@/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

export interface ProductsState {
  products: Product[];
  filteredBy: TFilterOption;
  isLoading: boolean;
}

const initialState: ProductsState = {
  products: [],
  filteredBy: 'All',
  isLoading: true,
};

export const fetchProducts = createAsyncThunk('products/getAll', async () => {
  return get('/?lang=rus&count=20');
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<Product>) => {
      const found = state.products.find(prod => prod.id === action.payload.id);
      if (found) {
        found.liked = !found.liked;
      }
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.filter(
        prod => prod.id !== action.payload.id
      );
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setFilteringMethod: (state, action: PayloadAction<TFilterOption>) => {
      state.filteredBy = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, state => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export const selectProductsBase = (state: ProductsState) => state.products;
export const selectFilteredBy = (state: ProductsState) => state.filteredBy;
export const selectIsLoading = (state: ProductsState) => state.isLoading;

export const selectProducts = createSelector(
  [selectProductsBase, selectFilteredBy],
  (products, filteredBy) => {
    switch (filteredBy) {
      case 'All':
        return products;
      case 'Liked':
        return products.filter(prod => prod.liked);
      default:
        return products;
    }
  }
);

export const getFilteredMethod = createSelector(
  selectFilteredBy,
  filteredBy => filteredBy
);

export const isLoadingProducts = createSelector(
  selectIsLoading,
  isLoading => isLoading
);

export const selectProductById = createSelector(
  [selectProductsBase, (_state: ProductsState, productId: string) => productId],
  (products, productId) => {
    return products.find(product => product.id === productId);
  }
);

export const {
  addProduct,
  toggleLike,
  deleteProduct,
  setProducts,
  setFilteringMethod,
} = productSlice.actions;

export default productSlice.reducer;
