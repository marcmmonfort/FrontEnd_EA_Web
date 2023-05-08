import { StyleProp, ViewStyle } from 'react-native';

export interface ButtonGradientProps {
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}
