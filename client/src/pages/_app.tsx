import 'bootstrap/dist/css/bootstrap.min.css';
import '../common/styles/globals.css';

import type { AppProps } from 'next/app';
import { Layout } from 'components/lib/Layout';
import { createContext } from 'react';
import { useSession } from 'utils/useSession';

export const SessionContext = createContext<any>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, updateSession] = useSession();
  return (
    <SessionContext.Provider value={{ user, updateSession }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContext.Provider>
  );
}
export default MyApp;
