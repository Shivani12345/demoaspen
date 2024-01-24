import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
 * A React Hook which updates when the orientation changes
 * @returns whether the user is in 'PORTRAIT : true' or 'LANDSCAPE : false'
 */
export function useOrientation(): boolean {
  // State to hold the connection status
  const [orientation, setOrientation] = useState<boolean>(isPortrait());

  useEffect(() => {
    const callback = () => setOrientation(isPortrait());

    const changeListener = Dimensions.addEventListener('change', callback);

    return () => {
      changeListener.remove();
    };
  }, []);

  return orientation;
}
