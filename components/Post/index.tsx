import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ScorePill from "../ScorePill";

export interface PostProps {
  postId: string;
  photo: string;
  username: string;
  email: string;
  content: string;
  createdOn: number;
  isAdmin?: boolean;
  hateScores?: object;
}

const Post: FC<PostProps> = ({
  postId,
  photo,
  username,
  email,
  content,
  isAdmin = false,
  hateScores,
}: PostProps) => {
  return (
    <Link href={`/post/${postId}`}>
      <a
        className={`
        hover:bg-[#303742]
        text-left normal-case
        border-b-[1px] border-[#808080]
        hover:border-t-[0px] hover:border-l-[0px] hover:border-r-[0px] hover:border-[#808080]
        px-3 py-4
    `}
      >
        <div>
          <div
            className="
            float-left
            rounded-full
            overflow-hidden
            w-[54px] h-[54px] min-w-[54px] min-h-[54px] max-w-[54px] max-h-[54px]"
          >
            {photo ? (
              <Image src={photo} width={54} height={54} layout={"fixed"} />
            ) : null}
          </div>
          <div className="pl-[70px] w-full max-w-full">
            <div>
              <span className="mr-5 text-white font-inter text-md">
                {username}
              </span>
              <span className="text-[#B1B1B1] font-inter text-sm">{email}</span>
            </div>
            <div className="w-full break-words">
              <div className="font-inter text-white text-[15px] break-words">
                {content}
              </div>
            </div>
          </div>
        </div>
        {hateScores && isAdmin ? (
          <div className="flex flex-wrap w-full max-w-full mt-4 overflow-pre">
            {Object.keys(hateScores).map((value) => (
              <ScorePill
                key={value}
                className="mr-2 mb-1"
                label={value.split("_")[0]}
                score={Math.floor(
                  parseFloat(hateScores[value as keyof typeof hateScores]) * 100
                )}
              />
            ))}
          </div>
        ) : null}
      </a>
    </Link>
  );
};

export default Post;
