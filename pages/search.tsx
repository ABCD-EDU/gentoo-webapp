import { Button } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import router from "next/router";
import { useEffect, useState } from "react";
import ExploreTweets from "../components/ExploreTweets";
import MoreInformation from "../components/MoreInformation";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import TimelineContainer from "../components/TimelineContainer";
import { getAPIRoute } from "../tags/apiRoutes";

const Search: NextPage = () => {
  const [query, setQuery] = useState<string>("");
  const [searched, setSearched] = useState<string>("");
  const [queryResults, setQueryResults] = useState<[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hateFilter, setHateFilter] = useState<number>(0);

  useEffect(() => {
    const localHateFilter = localStorage.getItem("hateFilter");
    if (localHateFilter) {
      setHateFilter(parseInt(localHateFilter));
    }
  }, []);

  const searchQuery = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`${getAPIRoute().Search}`, {
          params: {
            query: query,
            user_id: userId,
            offset: queryResults.length,
            limit: 10,
            hate_filter: hateFilter,
          },
        })
        .then((res) => {
          const results: [] = res.data.users;
          setSearched(query);
          setQueryResults((result) => [...result, ...results]);
          if (results.length === 0) {
            setHasMore(false);
          }
        });
    }
  };

  const handleTextChange = (e: { target: { value: any } }) => {
    setQuery(e.target.value);
  };

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
            });
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />
      <TimelineContainer heading={"Search"}>
        <div className="flex flex-row justify-center items-center mt-2">
          <input
            onChange={handleTextChange}
            className="my-[0.2rem] bg-[#2f3640] stroke-[#2E3137]
            focus:outline-none overflow-hidden resize-none
            border-[1px] border-[#808080] focus:border-white focus:drop-shadow-sm
            rounded-full
            px-3 py-3
            text-[#c4c4c4] text-[1.2rem] font-Inter
            w-10/12
            mr-3
            "
            placeholder={"Find your friends here"}
            value={query}
          />
          <Button
            onClick={searchQuery}
            className={
              "bg-[#0097E6] hover:bg-[#0097E6] text-white rounded-full capitalize text-xl font-inter h-fit py-2 px-4"
            }
          >
            Search
          </Button>
        </div>

        {queryResults && queryResults.length > 0 ? (
          <>
            <span className="ml-2 font-inter text-[#b1b1b1] text-sm mt-3 leading-none">
              Found {queryResults.length} results for &quot{searched}&quot
            </span>
            <div className="flex flex-wrap justify-between">
              {queryResults.map((values) => (
                <>
                  <ProfileCard
                    userId={values["user"]["user_id"]}
                    username={values["user"]["username"]}
                    photo={values["user"]["google_photo"]}
                    email={values["user"]["email"]}
                    followed={values["followed"]}
                    isAdmin={values["user"]["is_admin"]}
                  />
                </>
              ))}
            </div>
            {hasMore ? (
              <Button
                onClick={searchQuery}
                className="text-white rounded -full"
              >
                View More
              </Button>
            ) : (
              <span className="font-inter text-[#b1b1b1] text-md mt-3 leading-none">
                Nothing more to show...
              </span>
            )}
          </>
        ) : null}

        <ExploreTweets isAdmin={isAdmin} />
      </TimelineContainer>
      <MoreInformation />
    </div>
  );
};

export default Search;
