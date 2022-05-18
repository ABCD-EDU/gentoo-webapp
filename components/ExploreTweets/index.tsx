import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAPIRoute } from "../../tags/apiRoutes";
import Post from "../Post";

const ExploreTweets = ({ isAdmin }: { isAdmin: boolean }) => {
  const [userId, setUserId] = useState<string>("");
  const [posts, setPosts] = useState<[]>([]);

  useEffect(() => {
    const storageId = localStorage.getItem("userId");
    if (storageId) setUserId(storageId);
  }, []);

  useEffect(() => {
    const authId = localStorage.getItem("userId");
    if (userId && userId !== "") {
      axios
        .get(`${getAPIRoute().GetLatestPosts}`, {
          params: { user_id: userId, auth_id: authId },
        })
        .then((res) => {
          setPosts(res.data.posts);
        });
    }
  }, [userId]);

  return (
    <div className="flex flex-col">
      <div className="p-2 font-inter text-white font-bold text-[25px] flex flex-row items-center border-b-[1px] border-[#808080]">
        <Icon
          icon="eva:message-circle-fill"
          className="mr-2 text-[#0097E6] w-[30px] h-[30px]"
        />
        Latest Posts from Everyone
      </div>

      {posts.map((values) => (
        <Post
          photo={values["user"]["user_info"]["google_photo"]}
          key={values["post"]["post_id"]}
          postId={values["post"]["post_id"]}
          username={values["user"]["user_info"]["username"]}
          email={values["user"]["user_info"]["email"]}
          content={values["post"]["post_info"]["content"]}
          createdOn={values["post"]["post_info"]["created_on"]}
          hateScores={values["hate_scores"]}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default ExploreTweets;
