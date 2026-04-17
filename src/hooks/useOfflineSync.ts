import { useState, useEffect } from 'react';

export function useOfflineSync() {
  const [isOffline, setIsOffline] = useState(true);
  const [pendingPhotos, setPendingPhotos] = useState(0);
  const [syncStatus, setSyncStatus] = useState<'offline' | 'up_to_date' | 'syncing' | 'pending'>('offline');

  useEffect(() => {
    if (isOffline) {
      setSyncStatus(pendingPhotos > 0 ? 'pending' : 'offline');
    } else {
      if (pendingPhotos > 0) {
        setSyncStatus('syncing');
        const timer = setTimeout(() => {
          setPendingPhotos(0);
          setSyncStatus('up_to_date');
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setSyncStatus('up_to_date');
      }
    }
  }, [isOffline, pendingPhotos]);

  const queuePayload = () => {
    setPendingPhotos(prev => prev + 1);
  };

  return {
    isOffline,
    setIsOffline,
    pendingPhotos,
    syncStatus,
    queuePayload
  };
}
