import React, { useRef } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Input, Layout } from '@ui-kitten/components';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);

  const { isLoading, data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductById(productIdRef.current),
  });

  if (isLoading) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <MainLayout title={product?.title} subTitle={`Precio: ${product?.price}$`}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Layout>
            <FlatList
              data={product?.images}
              horizontal
              keyExtractor={item => item}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <FadeInImage
                  uri={item}
                  style={{ width: 300, height: 300, marginHorizontal: 7 }}
                />
              )}
            />
          </Layout>

          <Layout style={{ marginHorizontal: 10 }}>
            <Input
              label="Titulo"
              value={product?.title}
              style={{ marginVertical: 5 }}
            />

            <Input
              label="Slug"
              value={product?.slug}
              style={{ marginVertical: 5 }}
            />

            <Input
              label="descripción"
              value={product?.description}
              style={{ marginVertical: 5 }}
              multiline
              numberOfLines={5}
            />
          </Layout>

          <Layout
            style={{
              marginHorizontal: 15,
              gap: 10,
              flexDirection: 'row',
              marginVertical: 5,
            }}>
            <Input
              label="Precio"
              value={product?.price.toString()}
              style={{ flex: 1 }}
            />
            <Input
              label="Inventario"
              value={product?.stock.toString()}
              style={{ flex: 1 }}
            />
          </Layout>

          <Layout style={{ height: 200 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

export default ProductScreen;
