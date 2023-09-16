import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export function PageWrapper(): JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet context={{}} />
      <Footer />
    </>
  )
}
