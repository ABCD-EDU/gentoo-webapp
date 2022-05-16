import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import TimelineContainer from "../components/TimelineContainer";
import MoreInformation from "../components/MoreInformation";
import ReportsTable from "../components/ReportsTable";
import Dashboard from "../components/Dashboard";
import UserSearch from "../components/UserSearch";
import { UserReportsProps } from "../components/UserReports";
import FilterBox, { FilterProp } from "../components/FilterBox";

const Timeline: NextPage = () => {
  const [users, setUsers] = useState<UserReportsProps[]>([]);
  const [filters, setFilters] = useState<FilterProp[]>([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/get-users/5",
      responseType: "stream",
    }).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const getUsersFromSearch = (user: any): any => {
    axios({
      method: "get",
      url: "http://localhost:8000/search-users/" + user,
      responseType: "stream",
    }).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />
      <TimelineContainer heading={"Users Overview"}>
        <Dashboard
          userTotal={"13613"}
          reportedPostTotal={"6235"}
          postTotal={"66236"}
          reportedUserTotal={"2366"}
        />
        <ReportsTable className="mt-5" users={users} />
      </TimelineContainer>
      <MoreInformation className="flex flex-col gap-1 p-4">
        <UserSearch searchFunction={getUsersFromSearch} />
        <FilterBox filters={filters} setFilters={setFilters} />
      </MoreInformation>
    </div>
  );
};

export default Timeline;
