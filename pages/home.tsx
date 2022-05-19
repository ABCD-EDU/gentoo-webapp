import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAPIRoute } from "../tags/apiRoutes";
import TimelineContainer from "../components/TimelineContainer";
import MoreInformation from "../components/MoreInformation";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";

const Timeline: NextPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [posts, setPosts] = useState<[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hateFilter, setHateFilter] = useState<number>(0);

  useEffect(() => {
    const localHateFilter = localStorage.getItem("hateFilter");
    if (localHateFilter) {
      setHateFilter(parseInt(localHateFilter) / 100);
    }
  }, []);

  useEffect(() => {
    axios
      .get(getAPIRoute().Authenticate, { withCredentials: true })
      .then((res) => {
        if (res.data.message !== "authorized") {
          router.push("/");
        } else {
          axios
            .get(getAPIRoute().UserInformation, {
              params: { user_id: res.data.user_id },
            })
            .then((res) => {
              const { can_post, is_admin, created_on, user_id, user_info } =
                res.data.user;
              localStorage.setItem("email", user_info.email);
              localStorage.setItem("username", user_info.username);
              localStorage.setItem("description", user_info.description);
              localStorage.setItem("photo", user_info.google_photo);
              localStorage.setItem("canPost", can_post);
              localStorage.setItem("createdOn", created_on);
              localStorage.setItem("userId", user_id);
              setIsAdmin(is_admin);
              setUserId(user_id);
            });
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, []);

  useEffect(() => {
    getPosts();
  }, [userId]);

  const getPosts = () => {
    const authId = localStorage.getItem("userId");
    if (userId && userId !== "" && authId) {
      console.log(hateFilter);
      axios
        .get(`${getAPIRoute().GetUserTimeline}`, {
          params: {
            user_id: userId,
            auth_id: authId,
            offset: posts.length,
            limit: 10,
            hate_filter: hateFilter,
          },
        })
        .then((res) => {
          const newPosts: [] = res.data.posts;
          setPosts((post) => [...post, ...newPosts]);

          if (newPosts.length === 0) {
            setHasMore(false);
          }
        })
        .catch();
    }
  };

  const submitPost = () => {
    const post = {
      user_id: userId,
      content: content,
      created_on: new Date().toISOString(),
    };

    axios
      .post(`${getAPIRoute().SubmitPost}`, JSON.stringify(post), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setContent("");
        getPosts();
      })
      .catch();
  };

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />

      <InfiniteScroll
        className="overflow-"
        dataLength={posts.length}
        next={getPosts}
        hasMore={hasMore}
        loader={<></>}
        endMessage={
          <h4 className="text-center font-inter text-md text-[#b1b1b1]">
            Nothing more to show...
          </h4>
        }
      >
        <TimelineContainer heading={"Home"}>
          <PostForm
            submitPost={submitPost}
            content={content}
            setContent={setContent}
          />
          {posts.map((values) => (
            <Post
              posterId={values["user"]["user_id"]}
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
        </TimelineContainer>
      </InfiniteScroll>
      <MoreInformation />
    </div>
  );
};

export default Timeline;
