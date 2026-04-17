import { useState, useEffect } from 'react';

export type ScreenType = 'home' | 'camera' | 'analyzing' | 'result' | 'sent' | 'calculator' | 'mesh' | 'ussd' | 'expert' | 'chat' | 'expertDirectory';

export function useScreenNavigation() {
  const [screen, setScreen] = useState<ScreenType>('home');

  // Auto-transition for the analyzing state
  useEffect(() => {
    if (screen === 'analyzing') {
      const timer = setTimeout(() => setScreen('result'), 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  return { screen, setScreen };
}
