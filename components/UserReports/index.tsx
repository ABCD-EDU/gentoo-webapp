import { FC } from "react";
import Image from "next/image";
import { Button, Tooltip } from "@mui/material";
import styles from "./UserReports.module.css";

export interface UserReportsProps {
  user_id: number;
  username: string;
  email: string;
  google_photo?: string;
  totalPosts: number;
  reports: number;
  hate_score: number;
  normal_score: number;
  profanity_score: number;
  race_score: number;
  religion_score: number;
  sex_score: number;
}

const UserReports: FC<UserReportsProps> = ({
  // userID,
  username,
  email,
  google_photo,
  totalPosts,
  reports,
  hate_score,
  normal_score,
  profanity_score,
  race_score,
  religion_score,
  sex_score,
}: UserReportsProps) => {
  return (
    // Main container
    <div className={styles.mainContainer}>
      {/*Image and User Info Container */}
      <div className={styles.imageAndUserInfoContainer}>
        {/*Image container*/}
        <div className={styles.imageContainer}>
          {!google_photo || google_photo === "" ? (
            <div className="rounded-full w-[54px] h-[54px] bg-[#B1B1B1]" />
          ) : (
            <Image
              className="rounded-full"
              loader={({ src, width, quality }) => {
                return `${src}?w=${width}&q=${quality || 75}`
              }}
              src={google_photo}
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
        <p>{Math.round(hate_score * 100)}%</p>
        <p>{Math.round(normal_score * 100)}%</p>
        <p>{Math.round(profanity_score * 100)}%</p>
        <p>{Math.round(race_score * 100)}%</p>
        <p>{Math.round(religion_score * 100)}%</p>
        <p>{Math.round(sex_score * 100)}%</p>
        <Button className={styles.Button} variant="contained">
          info
        </Button>
      </div>
    </div>
  );
};

export default UserReports;
