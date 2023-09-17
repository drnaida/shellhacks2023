import { AppProps } from "../AppProps";

declare interface LoadingProps extends AppProps {
  text: string;
}

export function Loading({ text }: LoadingProps): JSX.Element {

  return (
    <div className="animate-pulse">
      <p className="text-lg text-center my-20 text-darkGray font-semibold">{text}</p>
    </div>
  );
}

