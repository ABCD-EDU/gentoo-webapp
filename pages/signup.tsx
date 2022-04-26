import type { NextPage } from "next";
import Logo, { LogoVariants } from "../components/Logo";
import AboutCard from "../components/AboutCard";
import SignIn from "../components/SignIn";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div className={``}>
      <div className={`flex flex-col w-full justify-center items-center`}>
        <Logo className="my-10" variant={LogoVariants.Header} />

        <Footer />
      </div>
    </div>
  );
};

export default Home;
