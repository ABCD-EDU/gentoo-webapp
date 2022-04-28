import { Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { getAPIRoute } from "../../tags/apiRoutes";

const PostForm = () => {
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rows, setRows] = useState<number>(1);

  const handleContentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newContent = e.target.value;
    let rows = newContent.split("\n").length + 1;

    /**
     * This splits the content depending on the line split "\n"
     * then it splits the texts based on the length 43
     *
     * after looping after each item, increment rows by 1 if length is equal to 43
     * which is the max amount of characters per row
     */
    newContent.split("\n").forEach((body) => {
      body.match(/.{1,43}/g)?.forEach((item) => {
        if (item.length === 43) {
          rows++;
        }
      });
    });

    if (newContent.length <= 250) {
      setContent(newContent);
      setRows(rows);
    }
  };

  const submitPost = () => {
    axios.post(`${getAPIRoute().SubmitPost}`);
  };

  useEffect(() => {
    const _photo = localStorage.getItem("photo");

    setUserPhoto(_photo ? _photo : "");
  });

  return (
    <div>
      <div className="flex flex-row items-start mt-2 py-3 border-b-[1px] border-[#808080] px-5">
        <Button
          variant={`text`}
          className={`rounded-full`}
          style={{ padding: "0 0" }}
        >
          <div
            className="
                    flex
                    flex-col
                    rounded-full
                    w-[54px] h-[54px]
                    overflow-hidden
                "
          >
            {userPhoto === "" ? (
              <div className="w-[54px] h-[54px] bg-[#B1B1B1]" />
            ) : (
              <Image
                src={userPhoto}
                width={54}
                height={54}
                layout={"fixed"}
                priority
              />
            )}
          </div>
        </Button>
        <textarea
          className="w-full my-[0.2rem] bg-[#2f3640] stroke-[#2E3137] px-3 py-1 focus:outline-none text-[#c4c4c4] text-[1.5rem] font-Inter overflow-hidden resize-none"
          onChange={handleContentInput}
          placeholder={"What's on your mind?"}
          value={content}
          rows={rows}
          cols={44}
        />
        <Button
          onClick={submitPost}
          className="bg-[#0097E6] rounded-full font-urbanist shadow-md font-bold text-lg capitalize mt-2 px-2"
          variant={"contained"}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostForm;
