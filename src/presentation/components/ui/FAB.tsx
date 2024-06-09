import React from 'react';
import { Button } from '@ui-kitten/components';
import { MyIcon } from './MyIcon';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  onPress: () => void;
}

const FAB = ({ style, iconName, onPress }: Props) => {
  return (
    <Button
      onPress={onPress}
      accessoryLeft={<MyIcon name={iconName} isWhite />}
      style={[
        style,
        {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 3,
          borderRadius: 13,
        },
      ]}
    />
  );
};

export default FAB;
