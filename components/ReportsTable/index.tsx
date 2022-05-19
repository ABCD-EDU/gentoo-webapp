import UserReports from "../UserReports";
import styles from "./ReportsTable.module.css";
import { Button } from "@mui/material";
import { FC } from "react";

interface ReportsTableProps {
  className?: string;
  setSorting?: any;
  sorting?: any;
  pagination?: any;
  setPagination?: any;
  users: any[];
}

const ReportsTable: FC<ReportsTableProps> = ({
  className,
  users,
  setSorting,
  sorting,
  pagination,
  setPagination,
}: ReportsTableProps) => {
  const userReportsList = users;

  const onLabelClick = (label: string): any => {
    let categ = sorting["category"];
    let order = sorting["order"];

    if (categ == label) {
      if (order == "asc") order = "desc";
      else order = "asc";
    } else {
      categ = label;
      order = "desc";
    }
    console.log(categ);
    console.log(order);
    setSorting({ category: categ, order: order });
  };

  const onLoadMore = (): any => {
    const offset = pagination["offset"] + 10;
    setPagination({ offset: offset, limit: 10 });
  };

  return (
    <div className={styles.mainContainer + " " + `${className}`}>
      <div className={styles.headerContainer}>
        <div className={styles.userInfoHeader}>
          <p>User Information</p>
        </div>
        <div className={styles.statsHeader}>
          <p onClick={() => onLabelClick("reports")}>Reports</p>
          <p onClick={() => onLabelClick("hate")}>HATE</p>
          <p onClick={() => onLabelClick("normal")}>NOT</p>
          <p onClick={() => onLabelClick("profanity")}>PRFN</p>
          <p onClick={() => onLabelClick("race")}>RACE</p>
          <p onClick={() => onLabelClick("religion")}>REL</p>
          <p onClick={() => onLabelClick("sex")}>GEN</p>
          <p></p>
        </div>
      </div>
      <div className={styles.allStatsContainer}>
        {userReportsList.map((userReports) => (
          <UserReports
            key={userReports.user_id}
            user_id={userReports.user_id}
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
      {userReportsList.length > 0 ? (
        <Button
          onClick={() => onLoadMore()}
          className="bg-white hover:shadow-lg hover:bg-white rounded-full capitalize text-lg w-contain my-2 mx-[250px] text-[#353B48]"
        >
          Load More
        </Button>
      ) : null}
    </div>
  );
};

export default ReportsTable;
