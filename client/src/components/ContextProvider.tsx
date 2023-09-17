import { Outlet } from 'react-router-dom';
import { Client, User } from '../api/client';
import { Footer } from './Footer';
import { Header } from './Header';

const devBaseUrl = 'https://localhost:7287';

export declare interface UserContextProps {
  client: Client | null;
  user: User | null;
}

export function nullAuthContext(): UserContextProps {
  return {
    client: new Client(devBaseUrl),
    user: null
  };
}

export const ContextProvider = () => {
  const outletContext: UserContextProps = nullAuthContext();

  return (
    <>
      <Header />
      <Outlet context={outletContext} />
      <Footer />
    </>
  );
};
