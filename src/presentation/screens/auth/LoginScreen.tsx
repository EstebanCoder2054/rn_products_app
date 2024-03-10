import React, { useState } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

const LoginScreen = ({ navigation }: Props) => {
  const login = useAuthStore(state => state.login);

  const { height } = useWindowDimensions();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      console.warn('try entering something on the text inputs');
      return;
    }
    setIsPosting(true);
    const wasLoginSuccessful = await login(form.email, form.password);
    setIsPosting(false);

    if (wasLoginSuccessful) return;

    Alert.alert('Error', 'Usuario o contraseña incorrecta');
    // navigation.goBack();
  };

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
            value={form.email}
            onChangeText={text => setForm({ ...form, email: text })}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder="contraseña"
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={text => setForm({ ...form, password: text })}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Text>{JSON.stringify(form, null, 3)}</Text>

        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" isWhite />}
            onPress={onLogin}>
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
