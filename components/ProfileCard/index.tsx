import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Tooltip } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { getAPIRoute } from "../../tags/apiRoutes";

interface CardProps {
  userId: string | number;
  username: string;
  photo: string;
  email: string;
  followed: boolean;
  isAdmin: boolean;
}

const ProfileCard: FC<CardProps> = ({
  userId,
  username,
  photo,
  email,
  followed,
  isAdmin,
}) => {
  const [follow, setFollow] = useState<boolean>(false);

  useEffect(() => {
    setFollow(followed);
  }, [followed]);

  const formatLabel = (label: string) => {
    if (label.length >= 15) {
      return label.slice(0, 15) + "...";
    } else {
      return label;
    }
  };

  const followUser = () => {
    const authId = localStorage.getItem("userId");
    if (authId) {
      axios
        .post(
          `${getAPIRoute().FollowUser}`,
          JSON.stringify({
            follower_id: authId,
            followed_id: userId,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          console.log("followed!", userId);
          setFollow(true);
        })
        .catch();
    }
  };

  const unfollowUser = () => {
    const authId = localStorage.getItem("userId");
    if (authId) {
      axios
        .post(
          `${getAPIRoute().UnfollowUser}`,
          JSON.stringify({
            follower_id: authId,
            followed_id: userId,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          console.log("unfollowed!", userId);
          setFollow(false);
        })
        .catch();
    }
  };

  return (
    <div className="flex flex-col bg-[#353B48] min-h-[138px] min-w-[379px] max-h-[138px] max-w-[380px] m-2 overflow-hidden rounded-md shadow-md">
      <div className="bg-[#b1b1b1] min-h-[69px]" />
      <div className="flex flex-row items-center justify-between h-full p-2">
        <Link href={`/profile/${userId}`}>
          <a>
            <div className="flex flex-row items-center decoration-[#b1b1b1]">
              <div
                className="
            rounded-full
            overflow-hidden
            bg-[#b1b1b1]
            w-[54px] h-[54px] min-w-[54px] min-h-[54px] max-w-[54px] max-h-[54px]"
              >
                {photo ? (
                  <Image src={photo} width={54} height={54} layout={"fixed"} />
                ) : null}
              </div>
              <div className="ml-3 flex flex-col">
                <Tooltip title={username}>
                  <div className="w-fit h-fit flex flex-row items-center">
                    <span className="hover:underline font-inter text-white text-md leading-tight">
                      {formatLabel(username)}
                    </span>
                    {isAdmin ? (
                      <div className="bg-white text-[#303742] text-xs w-fit h-fit px-2 ml-2 rounded-full">
                        admin
                      </div>
                    ) : null}
                  </div>
                </Tooltip>
                <Tooltip title={email}>
                  <span className="hover:underline font-inter text-[#b1b1b1] text-md leading-tight">
                    {formatLabel(email)}
                  </span>
                </Tooltip>
              </div>
            </div>
          </a>
        </Link>
        <Button
          onClick={
            follow || localStorage.getItem("userId") === userId
              ? unfollowUser
              : followUser
          }
          className="
          bg-white hover:bg-white hover:shadow-md rounded-full
          text-[#353B48] font-inter capitalize font-bold text-md px-4"
        >
          {follow || localStorage.getItem("userId") === userId
            ? "Followed"
            : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;
