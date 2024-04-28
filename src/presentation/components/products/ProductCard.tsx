import React from 'react';
import { Product } from '../../../domain/entities/product';
import { Text } from '@ui-kitten/components';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return <Text>{product.id}</Text>;
};

export default ProductCard;
