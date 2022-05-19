import { FC } from "react";

export interface DashboardProps {
  userTotal: string;
  reportedUserTotal: string;
  postTotal: string;
  reportedPostTotal: string;
}

const Dashboard: FC<DashboardProps> = ({
  userTotal,
  reportedUserTotal,
  postTotal,
  reportedPostTotal,
}: DashboardProps) => {
  return (
    <div
      className={
        "font-['Inter'] flex flex-row flex-wrap justify-evenly mt-[1.25rem] mr-auto ml-auto w-[97%] shadow-[0px_0px_0.938rem_-0.313rem_rgba(0,0,0,0.25)] py-3 rounded-[5px] sm:bg-[#353B48]"
      }
    >
      <div className="w-[100%] bg-[#353B48] mb-[5px] py-[0.625rem] sm:flex sm:flex-col sm:max-w-[8.125rem]">
        <div className="text-center font-[600] text-[1.875rem] text-[#FFFFFF] sm:mr-[0.313rem]  sm:ml-[0.313rem] text-[2.5rem] sm:leading-[3.026rem] sm:tracking-[1px]">
          {userTotal}
        </div>
        <div className="text-center font-[600] text-[0.938rem] leading-[1.125rem] text-[#FFFFFF] sm:my-[1px]">
          Total Number of Users
        </div>
      </div>
      <div className="w-[100%] bg-[#353B48] mb-[5px] py-[0.625rem] sm:flex sm:flex-col sm:max-w-[8.125rem]">
        <div className="text-center font-[600] text-[1.875rem] text-[#FFFFFF] sm:mr-[0.313rem]  sm:ml-[0.313rem] text-[2.5rem] sm:leading-[3.026rem] sm:tracking-[1px]">
          {reportedUserTotal}
        </div>
        <div className="text-center font-[600] text-[0.938rem] leading-[1.125rem] text-[#FFFFFF] sm:my-[1px]">
          Total Number of Reported Users
        </div>
      </div>
      <div className="w-[100%] bg-[#353B48] mb-[5px] py-[0.625rem] sm:flex sm:flex-col sm:max-w-[8.125rem]">
        <div className="text-center font-[600] text-[1.875rem] text-[#FFFFFF] sm:mr-[0.313rem]  sm:ml-[0.313rem] text-[2.5rem] sm:leading-[3.026rem] sm:tracking-[1px]">
          {postTotal}
        </div>
        <div className="text-center font-[600] text-[0.938rem] leading-[1.125rem] text-[#FFFFFF] sm:my-[1px]">
          Total Number of Posts
        </div>
      </div>
      <div className="w-[100%] bg-[#353B48] mb-[5px] py-[0.625rem] sm:flex sm:flex-col sm:max-w-[8.125rem]">
        <div className="text-center font-[600] text-[1.875rem] text-[#FFFFFF] sm:mr-[0.313rem]  sm:ml-[0.313rem] text-[2.5rem] sm:leading-[3.026rem] sm:tracking-[1px]">
          {reportedPostTotal}
        </div>
        <div className="text-center font-[600] text-[0.938rem] leading-[1.125rem] text-[#FFFFFF] sm:my-[1px]">
          Total Number of Reported Posts
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
