import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

type JWT = {
  id: string;
  email: string;
  iat: number;
  exp: number;
  token: string;
};
type User = { userId: string; jwt: string } | null | unknown;

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
      if (res.status === 200) {
        const decoded = jwtDecode<JWT>(jwt);
        if (decoded.id) {
          setUser({ ...decoded, token: jwt });
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
