import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';

const HomeScreen = () => {
  const { logout } = useAuthStore();
  // const logout = useAuthStore(state => state.logout);

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
