import { useState, useEffect} from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
}

export function ContextProvider() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<AuthContextState>(nullAuthContext());
  const [user, setUser] = useState(state.user);
  const loggedIn = user !== null;

  useEffect(() => {
    if(location.pathname == "/Auth" || location.pathname == "/") return;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/Auth");
    } else if (storedUser && !user) {
      // If you have stored the user data as a stringified JSON, you can parse it like so:
      setUser(JSON.parse(storedUser));
    }
  }, [user, navigate, location]);
  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem("user");
    setUser(undefined);
    navigate("/Auth");
  }

  const outletContext: AuthContext = {
    state: state,
    client: state.client,
    user: user,
    setUser: setUser,
  }

  return (
    <>
      <Header user={user} setUser={setUser} logout={logout} />
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
