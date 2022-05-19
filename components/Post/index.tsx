import { Icon } from "@iconify/react";
import { Button, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import ReportModal from "../ReportModal";
import ScorePill from "../ScorePill";

export interface PostProps {
  posterId: string;
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
  posterId,
  postId,
  photo,
  username,
  email,
  content,
  isAdmin = false,
  hateScores,
}: PostProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const closeReportModal = () => setModalOpen(false);
  const openReportModal = () => setModalOpen(true);

  return (
    <>
      <div
        className={`
        flex flex-row
        hover:border-t-[0px] hover:border-l-[0px] hover:border-r-[0px] hover:border-[#808080]
        border-b-[1px] border-[#808080]
        px-3 py-4
        hover:bg-[#303742]
        text-left normal-case
        w-full
        `}
      >
        <Link href={`/post/${postId}`}>
          <a className="flex w-full">
            <div className="flex flex-row w-full">
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
              <div className="pl-5 [70px] w-full max-w-full">
                <div>
                  <span className="mr-5 text-white font-inter text-md">
                    {username}
                  </span>
                  <span className="text-[#B1B1B1] font-inter text-sm">
                    {email}
                  </span>
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
                      parseFloat(hateScores[value as keyof typeof hateScores]) *
                        100
                    )}
                  />
                ))}
              </div>
            ) : null}
          </a>
        </Link>
        <div className="w-fit">
          <Button
            className="w-fit min-w-fit h-fit rounded-full p-0 m-0"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Icon
              className="text-[#b1b1b1] w-[30px] h-[30px] p-1"
              icon="bi:three-dots"
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={openReportModal}>Report</MenuItem>
          </Menu>
        </div>
      </div>

      <ReportModal
        userId={posterId}
        username={username}
        email={email}
        content={content}
        modalOpen={modalOpen}
        closeReportModal={closeReportModal}
        postId={postId}
      />
    </>
  );
};

export default Post;
