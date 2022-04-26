import * as React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import { getAPIRoute } from "../../tags/apiRoutes";
import Link from "next/link";
import axios from "axios";

const SignIn = ({ className }: { className?: string }) => {
  const signIn = async () => {
    // window.link
  };

  return (
    <div
      className={`w-[95%] sm:w-[442px] bg-[#353B48] shadow-sm rounded-sm ${className}`}
    >
      <p className={`text-white text-center text-md`}>Sign in / Register</p>

      <Link href={`${getAPIRoute().SignIn}`}>
        <a>
          <Button
            onClick={signIn}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0097E6",
              margin: "0.5rem 0",
            }}
          >
            <Icon
              style={{ width: "25px", height: "25px", marginRight: "0.5rem" }}
              icon="flat-color-icons:google"
            />
            <span className="text-white font-bold drop-shadow-lg">
              Sign in with Google
            </span>
          </Button>
        </a>
      </Link>
    </div>
  );
};

export default SignIn;
