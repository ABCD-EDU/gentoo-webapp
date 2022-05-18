import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { getAPIRoute } from "../../tags/apiRoutes";
import ScoresChart from "../ScoresChart";

interface UserProps {
  userId: string;
  email: string;
  description: string;
  photo: string;
  isAdmin: boolean;
  username: string;
  hateScores: object;
}

const UserProfile: FC<UserProps> = ({
  userId,
  email,
  description,
  photo,
  isAdmin,
  username,
  hateScores,
}: UserProps) => {
  const [following, setFollowing] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  // const [userRating, setUserRating] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`${getAPIRoute().UserSocialStatistics}`, {
        params: { user_id: userId },
      })
      .then((res) => {
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
      })
      .catch();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="h-[233px] bg-zinc-500" />
      <div className="justify-between">
        <div className="absolute ml-[1rem] top-[25%] rounded-full max-w-[127px] max-h-[127px] overflow-hidden border-[#2F3640] border-[4px]">
          {photo && photo !== "" ? (
            <Image src={photo} width={120} height={120} layout={"fixed"} />
          ) : null}
        </div>

        <div className="mt-3 ml-[150px] mr-[1rem] flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="flex flex-row items-center font-inter font-bold text-white">
              {username}{" "}
              {isAdmin ? (
                <div className="bg-white text-[#303742] text-xs w-fit h-fit px-2 ml-2 rounded-full">
                  admin
                </div>
              ) : null}
            </span>
            <span className="font-inter text-[#B1B1B1] text-sm">{email}</span>
          </div>
          {/* <Button
            className="font-inter font-bold capitalize rounded-full shadow-sm hover:shadow-lg px-4 py-0"
            style={{
              backgroundColor: "#353B48",
              color: "white",
            }}
          >
            Edit Profile
          </Button> */}
        </div>
      </div>
      <div className="ml-[150px] mt-5 font-inter text-white">{description}</div>

      <ScoresChart hateScores={hateScores} />

      <div className="flex flex-row justify-between px-20 mt-5">
        <div className="mr-5 border-b-[1px] border-[#2F3640] hover:border-[#B1B1B1] hover:cursor-pointer">
          <span className="font-bold font-inter text-white text-lg mr-1">
            {following}
          </span>
          <span className="font-inter text-[#B1B1B1] text-lg">Following</span>
        </div>

        <div className="mr-5 border-b-[1px] border-[#2F3640] hover:border-[#B1B1B1] hover:cursor-pointer">
          <span className="font-bold font-inter text-white text-lg mr-1">
            {followers}
          </span>
          <span className="font-inter text-[#B1B1B1] text-lg">Followers</span>
        </div>

        {/* <div className="border-b-[1px] border-[#2F3640] hover:border-[#B1B1B1] hover:cursor-pointer">
          <span className="font-bold font-inter text-white text-lg mr-1">
            {userRating}%
          </span>
          <span className="font-inter text-[#B1B1B1] text-lg">User Rating</span>
        </div> */}
      </div>
      <div className="py-2 mt-2 text-center border-[#b1b1b1] border-b-[1px] hover:bg-[#38404B] hover:cursor-pointer">
        <span className="font-bold font-inter text-xl text-white">Posts</span>
      </div>
    </div>
  );
};

export default UserProfile;
