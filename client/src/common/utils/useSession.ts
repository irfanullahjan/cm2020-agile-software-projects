import { useEffect, useState } from 'react';

type User = { userId: string; jwt: string } | null;

export function useSession() {
  const [user, setUser] = useState<User>(null);

  const loadSession = async () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const res = await fetch('/api/whoAmI', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const userId = await res.text();
      if (
        // match userId with RegExp for UUID
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          userId,
        )
      ) {
        setUser({ userId, jwt });
      } else {
        localStorage.removeItem('jwt');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const updateSession = () => {
    loadSession();
  };

  return [user, updateSession];
}
