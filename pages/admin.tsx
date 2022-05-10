import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TimelineContainer from "../components/TimelineContainer";
import MoreInformation from "../components/MoreInformation";
import ReportsTable from "../components/ReportsTable";
import Dashboard from "../components/Dashboard";
import { UserReportsProps } from "../components/UserReports";

const Timeline: NextPage = () => {
  const [users, setUsers] = useState<UserReportsProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/get-users/5',
      responseType: 'stream',
    }).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <Sidebar />
      <TimelineContainer heading={"Users Overview"}>
        <Dashboard userTotal={"69"} reportedPostTotal={"69"} postTotal={"69"} reportedUserTotal={"69"}/>
        <ReportsTable className="mt-5" users={users}/>
      </TimelineContainer>
      <MoreInformation />
    </div>
  );
};

export default Timeline;
