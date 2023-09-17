import classnames from "classnames";
import { CodeSlash, Github } from "react-bootstrap-icons";
import Themes from "../ThemableProps";
import { Button } from "./Button";
import { Link } from "./Link";

export function Footer(): JSX.Element {
  const iconClasses = classnames('text-xl text-tertiary');
  const rowClasses = classnames('w-full flex items-center justify-center mb-2');

  return (
    <footer className="mt-auto">
      <div className="flex flex-col items-center mt-10">
        <div className={rowClasses}>
          <p className="text-darkGray text-center">
            This application was developed by<br />
            <a href="https://www.linkedin.com/in/tkalandarov/" target="_blank" className="font-bold underline">Timur Kalandarov</a>,
            <a href="https://www.linkedin.com/in/anzhelika-kurnikova/" target="_blank" className="font-bold underline"> Anzhelika Kurnikova</a>, and
            <a href="https://www.linkedin.com/in/l42aro/" target="_blank" className="font-bold underline"> Alvaro Lazaro Aguilar</a><br />
            for the ShellHacks 2023 hackathon.
          </p>
        </div>

        <div className={rowClasses}>
          <Link to='https://github.com/drnaida/shellhacks2023' isAbsoluteUrl external target="_blank">
            <Button theme={Themes.Default}>
              <Github className={iconClasses} />
              <span className="ml-1">GitHub</span>
            </Button>
          </Link>
          <Link to='https://www.shellhacks.net/' isAbsoluteUrl external target="_blank">
            <Button theme={Themes.Default}>
              <CodeSlash className={iconClasses} />
              <span className="ml-1">ShellHacks</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
