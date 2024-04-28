import React from 'react';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import ProductList from '../../components/products/ProductList';

const HomeScreen = () => {
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout
      title="TesloShop - Products"
      subTitle="Admin App"
      // rightAction={() => {}}
      // rightActionIcon="plus-outline"
    >
      {isLoading ? <FullScreenLoader /> : <ProductList products={products} />}
    </MainLayout>
  );
};

export default HomeScreen;
