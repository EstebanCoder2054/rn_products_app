import { tesloApi } from '../../config/api/tesloApi';
import type { Product } from '../../domain/entities/product';
import { TesloProduct } from '../../infrastructure/interfaces/teslo-products.response';
import { ProductMapper } from '../../infrastructure/mappers/product.mapper';

export const getProductsByPage = async (
  page: number,
  limit: number = 20,
): Promise<Product[]> => {
  console.log({ page, limit });

  const offset = page * 10;

  try {
    const { data } = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${offset}&limit=${limit}`,
    );

    const products = data.map(
      tesloProduct => ProductMapper.tesloProductToEntity(tesloProduct), // This is to map (convert) the tesloProducts into our own Products entity that we have
    );

    console.log(
      '🚀 ~ getProductsByPage ~ products:',
      JSON.stringify(products, null, 3),
    );

    return products;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
