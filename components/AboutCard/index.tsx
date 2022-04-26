import * as React from "react";
import Image from "next/image";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import styles from "./AboutCard.module.css";

const AboutCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-[95%] sm:w-[442px] bg-[#353B48] shadow-sm rounded-sm ${className}`}
    >
      <div>
        <CardMedia
          component="img"
          height="262"
          image="/images/headers/gentoo_banner.png"
          alt="gentoo banner"
        />
      </div>
      <div style={{ padding: "1rem 1rem" }}>
        <Typography
          variant="body2"
          style={{ color: "#B1B1B1", textAlign: "justify", fontSize: "12px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue
          posuere justo non fringilla. Praesent dictum lobortis mi ac
          sollicitudin. Donec commodo pulvinar turpis et eleifend. Aenean
          scelerisque purus arcu, et vehicula dui suscipit imperdiet. Maecenas
          congue, leo vel porta molestie, quam dolor eleifend odio, vitae
          tincidunt sem metus commodo dolor.
        </Typography>

        <div className={styles.infoContainer}>
          <div className={`w-1/2 ${styles.infoColumn}`}>
            <p className={styles.admin}>ADMINISTERED BY:</p>
            <div className={"flex flex-row items-center"}>
              <div
                className="
                    flex
                    flex-col
                    rounded-full 
                    w-[35px] h-[35px] 
                    overflow-hidden
                    mr-[0.5rem]
                "
              >
                {/* TODO: fix path of image here to admin */}
                <Image
                  src={"/images/logo/logo.png"}
                  width={40}
                  height={40}
                  layout={"fixed"}
                />
              </div>

              <div className={styles.infoTextPair}>
                <p className={"text-[#FFFFFF]"}>username</p>
                <p className={"text-[#B1B1B1]"}>username@mail.com</p>
              </div>
            </div>
          </div>

          <div className={`w-1/3 ${styles.infoColumn}`}>
            <p className={styles.admin}>SERVER STATS:</p>
            <div className={"flex flex-row justify-between items-center"}>
              <div className={styles.infoTextPair}>
                <p className={"text-[#FFFFFF]"}>69K</p>
                <p className={"text-[#B1B1B1]"}>members</p>
              </div>
              <div className={styles.infoTextPair}>
                <p className={"text-[#FFFFFF]"}>69K</p>
                <p className={"text-[#B1B1B1]"}>posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
