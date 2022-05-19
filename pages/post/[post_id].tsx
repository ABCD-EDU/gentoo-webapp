import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MoreInformation from "../../components/MoreInformation";
import Sidebar from "../../components/Sidebar";
import TimelineContainer from "../../components/TimelineContainer";
import axios from "axios";
import { getAPIRoute } from "../../tags/apiRoutes";
import ScoresChart from "../../components/ScoresChart";
import { Button, Menu, MenuItem } from "@mui/material";
import ReportModal from "../../components/ReportModal";
import { Icon } from "@iconify/react";
import Link from "next/link";

const PostSelected: NextPage = () => {
  const router = useRouter();
  const [postId, setPostId] = useState<string>("");
  const [posterId, setPosterId] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [createdOn, setCreatedOn] = useState<number>(0);
  const [hateScores, setHateScores] = useState<object[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const closeReportModal = () => setModalOpen(false);
  const openReportModal = () => setModalOpen(true);

  const [authId, setAuthId] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setAuthId(userId);
    }
  });

  useEffect(() => {
    const { post_id } = router.query;
    if (post_id) {
      setPostId(post_id.toString());
    }
  });

  useEffect(() => {
    const localAdmin = localStorage.getItem("isAdmin");
    if (localAdmin) {
      setIsAdmin(localAdmin === "true");
    }
  });

  useEffect(() => {
    if (postId && postId !== "" && authId && authId !== "") {
      axios
        .get(`${getAPIRoute().GetPost}`, {
          params: { post_id: postId, user_id: authId },
        })
        .then((res) => {
          setPosterId(res.data.post.user.user_id);
          setPhoto(res.data.post.user["user_info"]["google_photo"]);
          setUsername(res.data.post.user.user_info.username);
          setEmail(res.data.post.user.user_info.email);
          setContent(res.data.post.post.post_info.content);
          setCreatedOn(res.data.post.post.post_info.created_on);
          setHateScores(res.data.post.hate_scores);
        })
        .catch();
    }
  }, [postId, authId]);

  return (
    <>
      <div className="flex flex-row justify-center">
        <Sidebar />
        <TimelineContainer heading={"Home"}>
          <div className="flex flex-row p-3 items-center justify-between">
            <Link href={`/profile/${posterId}`}>
              <a className="hover:underline decoration-[#b1b1b1]">
                <div className="flex flex-row items-center">
                  <div
                    className="
                    float-left
                    rounded-full
                    overflow-hidden
                    w-[65px] h-[65px] min-w-[65px] min-h-[65px] max-w-[65px] max-h-[65px]"
                  >
                    {photo ? (
                      <Image
                        src={photo}
                        width={65}
                        height={65}
                        layout={"fixed"}
                      />
                    ) : null}
                  </div>
                  <div className="ml-5 flex flex-col">
                    <span className="mr-5 text-white font-inter font-bold text-md">
                      {username}
                    </span>
                    <span className="text-[#B1B1B1] font-inter text-md">
                      {email}
                    </span>
                  </div>
                </div>
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
                  className="text-[#b1b1b1] w-[50px] h-[50px] p-3"
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

          <div className="px-3 font-inter text-white text-[22px] break-words">
            {content}
          </div>

          {isAdmin ? <ScoresChart hateScores={hateScores} /> : null}

          <div className="p-3 border-[#808080] text-[#B1B1B1] font-inter hover:underline mt-2 border-y-[1px]">
            {new Date(createdOn).toUTCString()}
          </div>
        </TimelineContainer>
        <MoreInformation />
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

export default PostSelected;
