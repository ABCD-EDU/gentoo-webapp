import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import router from "next/router";
import { useEffect } from "react";
import { getAPIRoute } from "../tags/apiRoutes";
import TimelineContainer from "../components/TimelineContainer";
import MoreInformation from "../components/MoreInformation";
import PostForm from "../components/PostForm";

const Timeline: NextPage = () => {
  useEffect(() => {
    axios
      .get(getAPIRoute().Authenticate, { withCredentials: true })
      .then((res) => {
        axios
          .get(getAPIRoute().UserInformation, { withCredentials: true })
          .then((res) => {
            const { can_post, created_on, user_id, user_info } = res.data.user;
            localStorage.setItem("email", user_info.email);
            localStorage.setItem("username", user_info.username);
            localStorage.setItem("description", user_info.description);
            localStorage.setItem("photo", user_info.google_photo);
            localStorage.setItem("canPost", can_post);
            localStorage.setItem("createdOn", created_on);
            localStorage.setItem("userId", user_id);
          });
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
      </TimelineContainer>
      <MoreInformation />
    </div>
  );
};

export default Timeline;
