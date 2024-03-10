import React, { useState } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

const RegisterScreen = ({ navigation }: Props) => {
  const register = useAuthStore(state => state.register);

  const { height } = useWindowDimensions();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const onRegister = async () => {
    if (
      form.email.length === 0 ||
      form.password.length === 0 ||
      form.fullName.length === 0
    ) {
      console.warn('try entering something on the text inputs');
      return;
    }

    setIsPosting(true);
    const wasRegisteredSuccessfully = await register(
      form.email,
      form.password,
      form.fullName,
    );
    setIsPosting(false);

    if (wasRegisteredSuccessfully) return;

    Alert.alert('Error', 'No se pudo registrar el usuario, intente nuevamente');
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.3 }}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor crea para continuar</Text>
        </Layout>

        {/* inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
            value={form.fullName}
            onChangeText={text => setForm({ ...form, fullName: text })}
          />

          <Input
            placeholder="correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
            value={form.email}
            onChangeText={text => setForm({ ...form, email: text })}
          />

          <Input
            placeholder="contraseña"
            secureTextEntry
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
            value={form.password}
            onChangeText={text => setForm({ ...form, password: text })}
          />
        </Layout>

        <Text>{JSON.stringify(form, null, 3)}</Text>

        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" isWhite />}
            onPress={onRegister}>
            Crear
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
          <Text>Ya tienes una cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}>
            {' '}
            ingresa{' '}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default RegisterScreen;
