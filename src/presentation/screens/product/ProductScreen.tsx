import React, { useRef } from 'react';
import MainLayout from '../../layouts/MainLayout';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size, Product } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';
import { updateCreateProduct } from '../../../actions/products/update-create-product';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { isLoading, data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductById(productIdRef.current),
  });

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product) {
      productIdRef.current = data.id;

      //Para que el caché se reinicie al hacer la mutación y no esperar el time stale
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });

      console.log('SUCCESS');
      console.log({ data });
    },
  });

  if (isLoading) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <Formik
      initialValues={product as Product}
      onSubmit={values => mutation.mutate(values)}>
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout
          title={values?.title}
          subTitle={`Precio: ${values?.price}$`}>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <Layout>
                <FlatList
                  data={values?.images}
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
                  value={values?.title}
                  onChangeText={handleChange('title')}
                  style={{ marginVertical: 5 }}
                />

                <Input
                  label="Slug"
                  value={values?.slug}
                  onChangeText={handleChange('slug')}
                  style={{ marginVertical: 5 }}
                />

                <Input
                  label="descripción"
                  value={values?.description}
                  onChangeText={handleChange('description')}
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
                  value={values?.price.toString()}
                  onChangeText={handleChange('price')}
                  style={{ flex: 1 }}
                  keyboardType="numeric"
                />
                <Input
                  label="Inventario"
                  value={values?.stock.toString()}
                  onChangeText={handleChange('stock')}
                  style={{ flex: 1 }}
                  keyboardType="numeric"
                />
              </Layout>

              <ButtonGroup
                style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
                size="small"
                appearance="outline">
                {sizes.map(size => (
                  <Button
                    onPress={() =>
                      setFieldValue(
                        'sizes',
                        values.sizes.includes(size)
                          ? values.sizes.filter((s: Size) => s !== size)
                          : [...values.sizes, size],
                      )
                    }
                    key={size}
                    style={{
                      flex: 1,
                      backgroundColor: values.sizes.includes(size)
                        ? theme['color-primary-200']
                        : undefined,
                    }}>
                    {size}
                  </Button>
                ))}
              </ButtonGroup>

              <ButtonGroup
                style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
                size="small"
                appearance="outline">
                {genders.map(gender => (
                  <Button
                    onPress={() => setFieldValue('gender', gender)}
                    key={gender}
                    style={{
                      flex: 1,
                      backgroundColor: values.gender.startsWith(gender)
                        ? theme['color-primary-200']
                        : undefined,
                    }}>
                    {gender}
                  </Button>
                ))}
              </ButtonGroup>

              <Button
                accessoryLeft={<MyIcon name="save-outline" isWhite />}
                onPress={() => handleSubmit()}
                disabled={mutation.isPending}
                style={{ margin: 15 }}>
                Guardar
              </Button>

              <Text>{JSON.stringify(values, null, 3)}</Text>

              <Layout style={{ height: 200 }} />
            </ScrollView>
          </KeyboardAvoidingView>
        </MainLayout>
      )}
    </Formik>
  );
};

export default ProductScreen;
