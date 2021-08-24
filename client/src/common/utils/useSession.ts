import { useEffect, useState } from 'react';

export function useSession() {
  const [user, setUser] = useState(null);

  const loadSession = async () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const res = await fetch('/api/user/current', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (res.status === 200) {
        const userJson = await res.json();
        if (userJson.id) {
          setUser({ ...userJson, token: jwt });
        } else {
          localStorage.removeItem('jwt');
          setUser(null);
        }
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
