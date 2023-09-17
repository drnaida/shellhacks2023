import classNames from "classnames";
import { DoorOpenFill, PersonFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Themes from "../ThemableProps";
import { User } from "../api/client";
import logo from "../assets/mortarboard.png";
import { Button } from "./Button";
import { Link } from "./Link";

declare interface HeaderProps {
  user: User | undefined;
  setUser: React.Dispatch<User | undefined>;
}

export function Header({ user, setUser }: HeaderProps): JSX.Element {
  const iconClasses = classNames('text-xl');
  const rowClasses = classNames('w-full flex items-center justify-center mb-2');

  const navigate = useNavigate();

  return (
    <header className="px-10 py-4 mb-10 bg-white border-custom flex justify-between">
      <Link to="/" theme={Themes.Nav}>
        <div className="flex flex-row items-center">
          <img src={logo} alt="logo" width={64} height={64} />
          <h1 className="text-3xl font-bold text-darkGray ml-3">Some awesome name</h1>
        </div>
      </Link>

      <div className="flex items-center">
        {!user &&
          <Button theme={Themes.Secondary} className="flex items-center" onClick={() => navigate(`/Auth`)}>
            <PersonFill className={iconClasses} />
            <span className="ml-1">Log in</span>
          </Button>}
        {user &&
          <div className="flex items-center">
            <span className="mr-6 font-semibold text-darkGray text-xl">Hi, {user.name}!</span>
            <Button theme={Themes.Info} className="flex items-center" onClick={() => setUser(undefined)}>
              <DoorOpenFill className={iconClasses} />
              <span className="ml-1">Sign out</span>
            </Button>
          </div>}
      </div>
    </header>
  )
}
