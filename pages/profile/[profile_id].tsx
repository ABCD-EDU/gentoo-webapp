import type { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MoreInformation from "../../components/MoreInformation";
import Post from "../../components/Post";
import Sidebar from "../../components/Sidebar";
import TimelineContainer from "../../components/TimelineContainer";
import { getAPIRoute } from "../../tags/apiRoutes";
import UserProfile from "../../components/UserProfile";
import { Button } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const Timeline: NextPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [posts, setPosts] = useState<[]>([]);
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [hateScores, setHateScores] = useState<object>([]);
  const [isAdminViewing, setAdminView] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hateFilter, setHateFilter] = useState<number>(0);
  const [follow, setFollow] = useState<boolean>(false);

  const followUser = () => {
    const authId = localStorage.getItem("userId");
    if (authId) {
      axios
        .post(
          `${getAPIRoute().FollowUser}`,
          JSON.stringify({
            follower_id: authId,
            followed_id: userId,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          console.log("followed!", userId);
          setFollow(true);
        })
        .catch();
    }
  };

  const unfollowUser = () => {
    const authId = localStorage.getItem("userId");
    if (authId) {
      axios
        .post(
          `${getAPIRoute().UnfollowUser}`,
          JSON.stringify({
            follower_id: authId,
            followed_id: userId,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          console.log("unfollowed!", userId);
          setFollow(false);
        })
        .catch();
    }
  };

  useEffect(() => {
    const localHateFilter = localStorage.getItem("hateFilter");
    if (localHateFilter) {
      setHateFilter(parseInt(localHateFilter) / 100);
    }
  }, []);

  const muteUser = () => {
    axios
      .post(`${getAPIRoute().MuteUser}`, null, {
        params: {
          user_id: userId,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then()
      .catch();
  };

  const banUser = () => {
    axios
      .post(`${getAPIRoute().BanUser}`, null, {
        params: {
          user_id: userId,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then()
      .catch();
  };

  useEffect(() => {
    axios
      .get(getAPIRoute().Authenticate, { withCredentials: true })
      .then((res) => {
        if (res.data.message !== "authorized") {
          router.push("/");
        } else {
          const { profile_id } = router.query;
          if (profile_id) {
            setUserId(profile_id.toString());
            axios
              .get(getAPIRoute().UserInformation, {
                params: { user_id: profile_id },
              })
              .then((res) => {
                const { user_info } = res.data.user;
                setUsername(user_info["username"]);
                setEmail(user_info["email"]);
                setDescription(user_info["description"]);
                setPhoto(user_info["google_photo"]);
                setAdmin(user_info["is_admin"]);
              })
              .catch();
          }
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, [router]);

  useEffect(() => {
    const authId = localStorage.getItem("userId");
    if (authId) {
      axios
        .get(`http://localhost:8003/follow-check`, {
          params: {
            user_id: authId,
            following_id: userId,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch();
    }
  });

  useEffect(() => {
    const authId = localStorage.getItem("userId");
    if (authId) {
      axios
        .get(`${getAPIRoute().UserInformation}`, {
          params: { user_id: authId },
        })
        .then(() => {
          const localAdmin = localStorage.getItem("isAdmin");
          if (localAdmin) {
            console.log(localAdmin === "true");
            setAdminView(localAdmin === "true");
          }
        });
    }
  }, [router]);

  const getPosts = () => {
    const authId = localStorage.getItem("userId");
    if (userId !== "" && userId && authId) {
      axios
        .get(`${getAPIRoute().GetUserPosts}`, {
          params: {
            user_id: userId,
            auth_id: authId,
            offset: posts.length,
            limit: 10,
            hate_filter: userId === authId ? 1 : hateFilter,
          },
        })
        .then((res) => {
          const newPosts: [] = res.data.posts;
          console.log(newPosts);
          setPosts((post) => [...post, ...newPosts]);
          if (newPosts.length === 0) {
            setHasMore(false);
          }
          let hateAvg = 0;
          let noneAvg = 0;
          let normalAvg = 0;
          let offensiveAvg = 0;
          let otherAvg = 0;
          let profanityAvg = 0;
          let raceAvg = 0;
          let religionAvg = 0;
          let sexAvg = 0;

          res.data.posts.map((values: object) => {
            const scores = values["hate_scores" as keyof typeof values];
            hateAvg += scores["hate_score"];
            noneAvg += scores["none_score"];
            normalAvg += scores["normal_score"];
            offensiveAvg += scores["offensive_score"];
            otherAvg += scores["other_score"];
            profanityAvg += scores["profanity_score"];
            raceAvg += scores["race_score"];
            religionAvg += scores["religion_score"];
            sexAvg += scores["sex_score"];
          });

          hateAvg /= res.data.posts.length;
          noneAvg /= res.data.posts.length;
          normalAvg /= res.data.posts.length;
          offensiveAvg /= res.data.posts.length;
          otherAvg /= res.data.posts.length;
          profanityAvg /= res.data.posts.length;
          raceAvg /= res.data.posts.length;
          religionAvg /= res.data.posts.length;
          sexAvg /= res.data.posts.length;

          setHateScores({
            hate_score: hateAvg,
            none_score: noneAvg,
            normal_score: normalAvg,
            offensive_score: offensiveAvg,
            other_score: otherAvg,
            profanity_score: profanityAvg,
            race_score: raceAvg,
            religion_score: religionAvg,
            sex_score: sexAvg,
          });
        })
        .catch();
    }
  };

  useEffect(() => {
    getPosts();
  }, [userId, router]);

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />
      <InfiniteScroll
        dataLength={posts.length}
        next={getPosts}
        hasMore={hasMore}
        loader={
          <h4 className="text-center font-inter text-md text-[#b1b1b1]">
            Loading...
          </h4>
        }
        endMessage={
          <h4 className="text-center font-inter text-md text-[#b1b1b1]">
            Nothing more to show...
          </h4>
        }
      >
        <TimelineContainer>
          <div className="flex flex-row items-center justify-between pr-5">
            <div className="flex flex-col">
              <span className="font-bold font-Inter text-[1.7rem] text-white mt-3 h-fit w-[100%] px-5">
                Profile
              </span>
              <span className="font-inter text-sm text-[#B1B1B1] leading-none mb-3 h-fit w-[100%] px-5">
                {posts.length} posts
              </span>
            </div>
            <div className="flex flex-row">
              <Button
                onClick={follow ? unfollowUser : followUser}
                className="capitalize font-bold text-lg font-inter text-black hover:bg-white bg-white rounded-full shadow-md w-[80px] mr-2"
              >
                {follow ? "Unfollow" : "Follow"}
              </Button>
              {isAdminViewing ? (
                <>
                  <Button
                    onClick={muteUser}
                    className="capitalize font-bold text-lg font-inter text-white bg-[#353B48] rounded-full shadow-md w-[80px] mr-2"
                  >
                    Mute
                  </Button>
                  <Button
                    onClick={banUser}
                    className="capitalize font-bold text-lg font-inter text-[#FF3D00] bg-[#353B48] rounded-full shadow-md w-[80px]"
                  >
                    Ban
                  </Button>
                </>
              ) : null}
            </div>
          </div>
          {userId && userId !== "" ? (
            <>
              <UserProfile
                hateScores={hateScores}
                userId={userId}
                email={email}
                description={description}
                photo={photo}
                isAdmin={isAdmin}
                username={username}
                isAdminViewing={isAdminViewing}
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
                  isAdmin={isAdminViewing}
                />
              ))}
            </>
          ) : null}
        </TimelineContainer>
      </InfiniteScroll>
      <MoreInformation />
    </div>
  );
};

export default Timeline;
