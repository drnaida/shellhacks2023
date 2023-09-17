import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Client, User } from '../api/client';
import { Footer } from './Footer';
import { Header } from './Header';

const devBaseUrl = 'https://localhost:7183';

export declare interface AuthContextState {
  client: Client | undefined;
  user: User | undefined;
}
export function nullAuthContext(): AuthContextState {
  return {
    client: new Client(devBaseUrl),
    user: undefined,
  };
}

export declare interface AuthContext {
  state: AuthContextState;
  client: Client | undefined;
  user: User | undefined;
  setUser: React.Dispatch<User>;
  loggedIn: boolean;
}

export function ContextProvider() {
  const [state, setState] = useState<AuthContextState>(nullAuthContext());
  const [user, setUser] = useState(state.user);
  const loggedIn = user !== null;


  const logout = () => {
    setUser(undefined);
  }

  const outletContext: AuthContext = {
    state: state,
    client: state.client,
    user: user,
    setUser: setUser,
    loggedIn: loggedIn
  }

  return (
    <>
      <Header />
      <Outlet context={outletContext} />
      <Footer />
    </>
  );
};

const _consoleLog = console.log;
function log(...data: any[]) {
  const d = new Date();
  _consoleLog(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`, ...data);
}
console.log = log;
