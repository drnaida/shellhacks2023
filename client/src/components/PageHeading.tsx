import { AppProps } from "../AppProps";

export function PageHeading({ children }: AppProps): JSX.Element {
  return (
    <h1 className="text-5xl font-light mb-3">
      {children}
    </h1>
  );
}
