import type { NextPage } from "next";
import Logo, { LogoVariants } from "../components/Logo";
import AboutCard from "../components/AboutCard";
import SignIn from "../components/SignIn";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    localStorage.setItem("hateFilter", "100");
  }, []);

  return (
    <div className={``}>
      <div className={`flex flex-col w-full justify-center items-center`}>
        <Logo className="my-10" variant={LogoVariants.Header} />
        <AboutCard />
        <SignIn className="mt-3 px-3 py-2" />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
