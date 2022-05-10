import UserReports, { UserReportsProps } from "../UserReports";
import styles from "./ReportsTable.module.css";
import { FC } from "react";

interface ReportsTableProps {
  className?: string;
  users: any[];
}

// import { FC } from 'react'
const ReportsTable: FC<ReportsTableProps> = ({
  className,
  users
}: ReportsTableProps) => {
  // const userReport1 = {
  //   userID: 1,
  //   username: "hotdogasdfasdfas",
  //   email: "hotdosdfasdfasdfg@mail.com",
  //   photo: "",
  //   totalPosts: 69,
  //   reports: 13,
  //   hate_score: 0.44,
  //   normal_score: 0.22,
  //   profanity_score: 0.33145,
  //   racePercent: 0.6341,
  //   religionPercent: 0.323,
  //   genderPercent: 0.1353,
  // } as UserReportsProps;

  // const userReport2 = {
  //   userID: 2,
  //   username: "nice",
  //   email: "nice@mail.com",
  //   photo: "",
  //   totalPosts: 6,
  //   reports: 133,
  //   hate_score: 0.04,
  //   normal_score: 0.02,
  //   profanity_score: 0.0335,
  //   racePercent: 0.06,
  //   religionPercent: 0.323,
  //   genderPercent: 0.03,
  // } as UserReportsProps;

  const userReportsList = users;

  return (
    <div className={styles.mainContainer + " " + `${className}`}>
      <div className={styles.headerContainer}>
        <div className={styles.userInfoHeader}>
          <p>User Information</p>
        </div>
        <div className={styles.statsHeader}>
          <p>Reports</p>
          <p>HATE</p>
          <p>NOT</p>
          <p>PRFN</p>
          <p>RACE</p>
          <p>REL</p>
          <p>GEN</p>
          <p></p>
        </div>
      </div>
      <div className={styles.allStatsContainer}>
        {userReportsList.map((userReports) => (
          <UserReports
            key={userReports.userID}
            userID={userReports.userID}
            username={userReports.username}
            email={userReports.email}
            google_photo={userReports.google_photo}
            totalPosts={userReports.totalPosts}
            reports={userReports.reports}
            hate_score={userReports.hate_score}
            normal_score={userReports.normal_score}
            profanity_score={userReports.profanity_score}
            race_score={userReports.race_score}
            religion_score={userReports.religion_score}
            sex_score={userReports.sex_score}
          />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default ReportsTable;
