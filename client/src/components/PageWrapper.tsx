import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageWrapper(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet context={{}} />
      <Footer />
    </>
  )
}
