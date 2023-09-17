import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GetBaseUrl } from '../api/build';
import { Client, User } from '../api/client';
import { Footer } from './Footer';
import { Header } from './Header';

export declare interface AuthContextState {
  client: Client | undefined;
  user: User | undefined;
}
export function nullAuthContext(): AuthContextState {
  return {
    client: new Client(GetBaseUrl()),
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
    const storedUser = localStorage.getItem("user");
    if (!storedUser && location.pathname != "/Auth" && location.pathname != "/") {
      if(location.pathname.includes("Student")){
        //Save the location to redirect to after login
        localStorage.setItem("redirect-to", location.pathname );
      }
      navigate("/Auth");
    } else if (storedUser) {
      if(!user) {
        // If you have stored the user data as a stringified JSON, you can parse it like so:
        setUser(JSON.parse(storedUser));
      }
      //If location is /Auth or /, redirect to /Exams
      if(location.pathname == "/Auth" || location.pathname == "/") {
        navigate("/Exams");
      }
    }
  }, [location, navigate]);
  const logout = () => {
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
