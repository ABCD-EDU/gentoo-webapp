import UserReports, { UserReportsProps } from "../UserReports";
import styles from "./ReportsTable.module.css";

// import { FC } from 'react'
const ReportsTable = () => {
  const userReport1 = {
    userID: 1,
    username: "hotdogasdfasdfas",
    email: "hotdosdfasdfasdfg@mail.com",
    photo: "",
    totalPosts: 69,
    reports: 13,
    hatePercent: 0.44,
    notPercent: 0.22,
    prfnPercent: 0.33145,
    racePercent: 0.6341,
    religionPercent: 0.323,
    genderPercent: 0.1353,
  } as UserReportsProps;

  const userReport2 = {
    userID: 2,
    username: "nice",
    email: "nice@mail.com",
    photo: "",
    totalPosts: 6,
    reports: 133,
    hatePercent: 0.04,
    notPercent: 0.02,
    prfnPercent: 0.0335,
    racePercent: 0.06,
    religionPercent: 0.323,
    genderPercent: 0.03,
  } as UserReportsProps;

  const userReportsList = [userReport1, userReport2];

  return (
    <div className={styles.mainContainer}>
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
            photo={userReports.photo}
            totalPosts={userReports.totalPosts}
            reports={userReports.reports}
            hatePercent={userReports.hatePercent}
            notPercent={userReports.notPercent}
            prfnPercent={userReports.prfnPercent}
            racePercent={userReports.racePercent}
            religionPercent={userReports.religionPercent}
            genderPercent={userReports.genderPercent}
          />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default ReportsTable;
