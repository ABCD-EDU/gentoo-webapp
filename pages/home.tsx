import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAPIRoute } from "../tags/apiRoutes";
import TimelineContainer from "../components/TimelineContainer";
import MoreInformation from "../components/MoreInformation";
import PostForm from "../components/PostForm";
import Post, { PostProps } from "../components/Post";

const Timeline: NextPage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(getAPIRoute().Authenticate, { withCredentials: true })
      .then((res) => {
        if (res.data.message !== "authorized") {
          router.push("/");
        } else {
          axios
            .get(getAPIRoute().UserInformation, { withCredentials: true })
            .then((res) => {
              const { can_post, created_on, user_id, user_info } =
                res.data.user;
              localStorage.setItem("email", user_info.email);
              localStorage.setItem("username", user_info.username);
              localStorage.setItem("description", user_info.description);
              localStorage.setItem("photo", user_info.google_photo);
              localStorage.setItem("canPost", can_post);
              localStorage.setItem("createdOn", created_on);
              localStorage.setItem("userId", user_id);
            });
        }
      })
      .catch((err) => {
        router.push("/");
        console.log(err);
      });
  });

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />
      <TimelineContainer heading={"Home"}>
        <PostForm />
        <Post
          postId={"1"}
          photo={""}
          username={"arevalolance"}
          email={"arevalolance@mail.com"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue posuere justo non fringilla. Praesent dictum lobortis mi ac sollicitudin. Donec commodo pulvinar turpis et eleifend. Aenean scelerisque purus arcu, et vehicula dui suscipit imperdiet."
          }
        />
      </TimelineContainer>
      <MoreInformation />
    </div>
  );
};

export default Timeline;
