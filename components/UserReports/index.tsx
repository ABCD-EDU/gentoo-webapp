import { FC } from "react";
import Image from "next/image";
import { Button, Tooltip } from "@mui/material";
import styles from "./UserReports.module.css";

export interface UserReportsProps {
  userID: number;
  username: string;
  email: string;
  photo?: string;
  totalPosts: number;
  reports: number;
  hatePercent: number;
  notPercent: number;
  prfnPercent: number;
  racePercent: number;
  religionPercent: number;
  genderPercent: number;
}

const UserReports: FC<UserReportsProps> = ({
  // userID,
  username,
  email,
  photo,
  totalPosts,
  reports,
  hatePercent,
  notPercent,
  prfnPercent,
  racePercent,
  religionPercent,
  genderPercent,
}: UserReportsProps) => {
  return (
    // Main container
    <div className={styles.mainContainer}>
      {/*Image and User Info Container */}
      <div className={styles.imageAndUserInfoContainer}>
        {/*Image container*/}
        <div className={styles.imageContainer}>
          {!photo || photo === "" ? (
            <div className="rounded-full w-[54px] h-[54px] bg-[#B1B1B1]" />
          ) : (
            <Image
              className="rounded-full"
              src={photo}
              width={54}
              height={54}
              layout={"fixed"}
              priority
            />
          )}
        </div>
        {/*User info container*/}
        <div className={styles.userInfoContainer}>
          <p className={styles.username}>{username}</p>
          <Tooltip title={email}>
            <p className={styles.email}>{email}</p>
          </Tooltip>
          <p className={styles.totalPosts}>{totalPosts}</p>
        </div>
      </div>

      {/*Stats */}
      <div className={styles.statsContainer}>
        <p>{reports}</p>
        <p>{Math.round(hatePercent * 100)}%</p>
        <p>{Math.round(notPercent * 100)}%</p>
        <p>{Math.round(prfnPercent * 100)}%</p>
        <p>{Math.round(racePercent * 100)}%</p>
        <p>{Math.round(religionPercent * 100)}%</p>
        <p>{Math.round(genderPercent * 100)}%</p>
        <Button className={styles.Button} variant="contained">
          info
        </Button>
      </div>
    </div>
  );
};

export default UserReports;
