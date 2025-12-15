export type ProductDto = {
  data: string[];
};

export type Product = {
  id: string;
  text: string;
  liked: boolean;
  picture?: string;
};

export type TFilterOption = 'All' | 'Liked';

export type TFilterOptions = TFilterOption[];
