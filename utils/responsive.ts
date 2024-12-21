import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Based on standard iPhone 11 Pro width
const scale = SCREEN_WIDTH / 375;

export function normalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
} 
