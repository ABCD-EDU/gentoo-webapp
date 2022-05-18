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

const PostSelected: NextPage = () => {
  const router = useRouter();
  const [postId, setPostId] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [createdOn, setCreatedOn] = useState<number>(0);
  const [hateScores, setHateScores] = useState<object[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
    if (postId && postId !== "" && authId && authId !== "") {
      axios
        .get(`${getAPIRoute().GetPost}`, {
          params: { post_id: postId, user_id: authId },
        })
        .then((res) => {
          console.log(res.data);
          setPhoto(res.data.post.user["user_info"]["google_photo"]);
          setUsername(res.data.post.user.user_info.username);
          setEmail(res.data.post.user.user_info.email);
          setContent(res.data.post.post.post_info.content);
          setCreatedOn(res.data.post.post.post_info.created_on);
          setHateScores(res.data.post.hate_scores);
          setIsAdmin(true);
        })
        .catch();
    }
  }, [postId, authId]);

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />
      <TimelineContainer heading={"Home"}>
        <div className="flex flex-row p-3 items-center">
          <div
            className="
            float-left
            rounded-full
            overflow-hidden
            w-[65px] h-[65px] min-w-[65px] min-h-[65px] max-w-[65px] max-h-[65px]"
          >
            {photo ? (
              <Image src={photo} width={65} height={65} layout={"fixed"} />
            ) : null}
          </div>
          <div className="ml-5 flex flex-col">
            <span className="mr-5 text-white font-inter font-bold text-md">
              {username}
            </span>
            <span className="text-[#B1B1B1] font-inter text-md">{email}</span>
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
  );
};

export default PostSelected;
