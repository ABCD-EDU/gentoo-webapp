import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

export interface PostProps {
  postId: string;
  photo?: string;
  username: string;
  email: string;
  content: string;
}

const Post: FC<PostProps> = ({
  postId,
  photo,
  username,
  email,
  content,
}: PostProps) => {
  const router = useRouter();

  const goToPost = () => {
    router.push(`/post/${postId}`);
  };

  return (
    <Button
      onClick={goToPost}
      variant={"outlined"}
      className={`text-left normal-case
      border-t-[0px] border-l-[0px] border-r-[0px] border-[#808080]
      hover:border-t-[0px] hover:border-l-[0px] hover:border-r-[0px] hover:border-[#808080]
      `}
      style={{ borderRadius: "0" }}
    >
      <div className="flex flex-row p-4 justify-between w-full break-words">
        {!photo || photo === "" ? (
          <div className="rounded-full w-[54px] h-[54px] bg-[#B1B1B1]" />
        ) : (
          <Image
            className="rounded-full"
            src={photo}
            width={54}
            height={54}
            layout={"fixed"}
            priority
          />
        )}

        <div className="flex flex-col w-[88%] text-[15px]">
          <div className={`flex flex-row items-start lowercase leading-none`}>
            <p className={"text-[#FFFFFF] font-bold font-inter mr-5"}>
              {username}
            </p>
            <p className={"text-[#B1B1B1] font-inter"}>{email}</p>
          </div>
          <p className={`font-inter text-white mt-1`}>{content}</p>
        </div>
      </div>
    </Button>
  );
};

export default Post;
