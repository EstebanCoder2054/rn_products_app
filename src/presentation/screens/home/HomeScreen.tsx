import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';

const HomeScreen = () => {
  const { logout } = useAuthStore();

  getProductsByPage(0);

  return (
    // same as View Component, it's a wrapper
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      <Button accessoryLeft={<Icon name="log-out-outline" />} onPress={logout}>
        Cerrar sesión
      </Button>
    </Layout>
  );
};

export default HomeScreen;
