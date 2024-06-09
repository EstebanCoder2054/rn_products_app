import { isAxiosError } from 'axios';
import { tesloApi } from '../../config/api/tesloApi';
import { Product } from '../../domain/entities/product';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  //si tiene un id significa que lo estoy actualizando (update)
  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createproduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  console.log({ product });
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    console.log(error);
    throw new Error('Error al actualizar el producto');
  }
};

const createproduct = async (product: Partial<Product>) => {
  console.log({ product });
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);

    const { data } = await tesloApi.post('/products/', {
      images: checkedImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    }
    console.log(error);
    throw new Error('Error al crear el producto');
  }
};

const prepareImages = (images: string[]) => {
  return images.map(image => image.split('/').pop());
};
