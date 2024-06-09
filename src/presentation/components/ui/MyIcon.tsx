import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { Icon, useTheme } from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string;
  isWhite?: boolean;
}

export const MyIcon = ({ name, color, isWhite = false }: Props) => {
  const theme = useTheme();

  const appliedColor = useMemo(() => {
    if (isWhite) {
      return theme['color-info-100'];
    }

    return theme[color || 'text-basic-color'];
  }, [color, theme, isWhite]);

  return <Icon name={name} style={styles.icon} fill={appliedColor} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
