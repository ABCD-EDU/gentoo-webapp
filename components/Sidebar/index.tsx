import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";
import Logo, { LogoVariants } from "../Logo";
import { useEffect, useState } from "react";

const Sidebar: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    const _username = localStorage.getItem("username");
    const _email = localStorage.getItem("email");
    const _photo = localStorage.getItem("photo");

    setUsername(_username ? _username : "");
    setEmail(_email ? _email : "");
    setPhoto(_photo ? _photo : "");
  });

  const createLink = (path: string, name: string, icon: string) => {
    return (
      <Link href={path}>
        <a>
          <Button
            variant={`text`}
            className={`flex flex-row justify-start px-10 rounded-full w-[120%]`}
          >
            <Icon icon={icon} className={`w-[32px] h-[32px] text-white mr-2`} />
            <span
              className={`font-inter font-bold text-white capitalize text-[25px]`}
            >
              {name}
            </span>
          </Button>
        </a>
      </Link>
    );
  };

  return (
    <div
      className={`w-[340px] flex flex-col py-10 items-center justify-between h-[100vh]`}
    >
      <div className="flex flex-col items-center">
        <Logo className="my-5" variant={LogoVariants.Photo} />
        <div className={`flex flex-col`}>
          {createLink("/home", "Home", "bx:home-smile")}
          {createLink("/home", "Search", "akar-icons:search")}
          {createLink("/home", "Profile", "ant-design:user-outlined")}
        </div>
      </div>
      <Link href={`/profile/${0}`}>
        <a>
          <Button variant={`text`} className={`rounded-full w-[120%]`}>
            <div className={"flex flex-row items-center"}>
              <div
                className="
                    flex
                    flex-col
                    rounded-full
                    w-[54px] h-[54px]
                    overflow-hidden
                    mr-[0.5rem]
                "
              >
                {photo === "" ? (
                  <div className="w-[54px] h-[54px] bg-[#B1B1B1]" />
                ) : (
                  <Image
                    src={photo}
                    width={54}
                    height={54}
                    layout={"fixed"}
                    priority
                  />
                )}
              </div>

              <div
                className={`flex flex-col items-start lowercase leading-none`}
              >
                <p className={"text-[#FFFFFF] font-bold text-md"}>{username}</p>
                <p className={"text-[#B1B1B1] text-xs"}>{email}</p>
              </div>
            </div>
          </Button>
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
