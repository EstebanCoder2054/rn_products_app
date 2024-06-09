import React, { useState } from 'react';
import { Product } from '../../../domain/entities/product';
import { Layout, List, Text } from '@ui-kitten/components';
import ProductCard from './ProductCard';
import { RefreshControl } from 'react-native';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
  // TODO: fetch next page
}

const ProductList = ({ products, fetchNextPage }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    // Sleep 1.5 secs
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

export default ProductList;
