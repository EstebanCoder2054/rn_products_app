import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';

const HomeScreen = () => {
  return (
    // same as View Component, it's a wrapper
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      <Button accessoryLeft={<Icon name="facebook" />}>Cerrar sesión</Button>
    </Layout>
  );
};

export default HomeScreen;
