import React from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

const LoginScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor ingrese para continuar</Text>
        </Layout>

        {/* inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder="contraseña"
            secureTextEntry
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" isWhite />}
            onPress={() => {}}>
            Ingresar
          </Button>
        </Layout>

        {/* información para crear cuenta */}
        <Layout style={{ height: 50 }} />
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            {' '}
            Crear cuenta{' '}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default LoginScreen;
