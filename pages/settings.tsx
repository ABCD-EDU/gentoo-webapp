import { Button } from "@mui/material";
import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import MoreInformation from "../components/MoreInformation";
import Sidebar from "../components/Sidebar";
import TimelineContainer from "../components/TimelineContainer";

const Settings: NextPage = () => {
  const [hateFilter, setHateFilter] = useState<number>(0);
  const filterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = Number(e.target.value);
    if (!isNaN(newFilter) && newFilter <= 100 && newFilter >= 0) {
      setHateFilter(newFilter);
    }
  };

  const applyFilter = () => {
    localStorage.setItem("hateFilter", hateFilter.toString());
  };

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />
      <TimelineContainer heading={"Settings"}>
        <div className="flex flex-col p-5">
          <h1 className="font-inter text-[1.6rem] font-bold text-white mb-2">
            Filters
          </h1>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col font-inter text-white w-fit">
              <span>Hate Speech Filter</span>
              <span className="text-[#b1b1b1] text-sm">
                Adding a filter to hate speech will let you only see posts
                within your given threshold
              </span>
            </div>
            <div>
              <input
                className="my-[0.2rem] w-full bg-[#2D323E] stroke-[#2E3137] px-3 py-1 focus:outline-none rounded-sm shadow-sm focus:outline-[#40495C] text-[#c4c4c4]"
                onChange={filterChange}
                placeholder={"0-100%"}
                value={hateFilter}
              />
            </div>
            <Button
              onClick={applyFilter}
              className="bg-[#0097E6] hover:bg-[#0097E6] rounded-full text-white font-inter capitalize font-bold mx-3"
            >
              Apply
            </Button>
          </div>
        </div>
      </TimelineContainer>
      <MoreInformation></MoreInformation>
    </div>
  );
};

export default Settings;
