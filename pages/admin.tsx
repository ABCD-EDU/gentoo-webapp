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
  const [name, setName] = useState<string>("");

  useEffect(() => {
    onQueryChange()
    // axios({
    //   method: "get",
    //   url: "http://localhost:8000/get-users/5",
    //   responseType: "stream",
    // }).then((res) => {
    //   console.log(res.data);
    //   setUsers(res.data);
    // });
  }, [filters, name]);

  const onChangeName = (user: any): any => {
    console.log(user)
    setName(user)
    // onQueryChange()
    
  };

  const onQueryChange = () : any => {
  
    axios.post("http://localhost:8000/get-filtered-users/", {
      data:JSON.stringify({
          name: name,
          filters: filters, 
          sorting:{category: "Hate", order: "descending"},
          pagination: {
            items:5,
            page:10
          }
        })
    }).then((res) => {
      setUsers(res.data)
    })
    console.log("Name:" + name)
    console.log("Filters:" + filters)
  }

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
        <UserSearch searchFunction={onChangeName}/>
        <FilterBox filters={filters} setFilters={setFilters}/>
      </MoreInformation>
    </div>
  );
};

export default Timeline;
