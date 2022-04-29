import type { NextPage } from "next";
import Image from "next/image";
import Logo, { LogoVariants } from "../components/Logo";
import Footer from "../components/Footer";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { getAPIRoute } from "../tags/apiRoutes";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const month = 1;
const MonthValues = Array.from(new Array(12), (val, index) => month + index);

const year = new Date().getFullYear();
const YearValues = Array.from(new Array(100), (val, index) => year - index);

const day = 1;
const DayValues = Array.from(new Array(31), (val, index) => day + index);

const Home: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [googlePhoto, setGooglePhoto] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const usernameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const firstNameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);
  const lastNameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);
  const aboutInput = (e: ChangeEvent<HTMLInputElement>) =>
    setAbout(e.target.value);
  const dayInput = (e: ChangeEvent<HTMLSelectElement>) =>
    setDay(Number(e.target.value));
  const monthInput = (e: ChangeEvent<HTMLSelectElement>) =>
    setMonth(Number(e.target.value));
  const yearInput = (e: ChangeEvent<HTMLSelectElement>) =>
    setYear(Number(e.target.value));

  const postRegister = () => {
    const info = {
      email: email,
      username: username,
      google_photo: googlePhoto,
      description: about,
      birthdate: {
        day: day,
        month: month,
        year: year,
      },
    };

    axios
      .post(`${getAPIRoute().SignUp}`, JSON.stringify(info), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        router.push("/home");
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    axios
      .get(getAPIRoute().Authenticate, { withCredentials: true })
      .then((res) => {
        const { token, registered } = res.data;
        setAuthToken(token);
        if (registered) {
          router.push("/home");
        }
      })
      .catch((err) => {
        router.push("/");
        console.log(err);
      });
  });

  useEffect(() => {
    if (authToken !== "") {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${authToken}`
        )
        .then((res) => {
          const { email, picture } = res.data;
          setEmail(email);
          setGooglePhoto(picture);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [authToken]);

  const createDateSelector = (
    inputChange: ChangeEventHandler<HTMLSelectElement> | undefined,
    values: number[] | string[],
    label: string
  ) => {
    return (
      <select
        onChange={inputChange}
        className="my-[0.2rem] w-[30%] bg-[#2D323E] stroke-[#2E3137] px-3 py-1 focus:outline-none rounded-sm shadow-sm focus:outline-[#40495C] text-[#c4c4c4]"
      >
        <option value={undefined}>{label}</option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  };

  const createInputForm = (
    inputChange: ChangeEventHandler<HTMLInputElement> | undefined,
    placeholder: string,
    disabled: boolean,
    value: string | number
  ) => {
    return (
      <input
        className="my-[0.2rem] w-full bg-[#2D323E] stroke-[#2E3137] px-3 py-1 focus:outline-none rounded-sm shadow-sm focus:outline-[#40495C] text-[#c4c4c4]"
        onChange={inputChange}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
      />
    );
  };

  return (
    <div className={``}>
      <div className={`flex flex-col w-full justify-center items-center`}>
        <Logo className="my-10" variant={LogoVariants.Header} />
        <div
          className={`w-[95%] sm:w-[442px] bg-[#353B48] shadow-sm rounded-sm px-5 py-4`}
        >
          <h1 className={`font-bold font-varelo text-[1.5rem] text-white pb-3`}>
            Create an account
          </h1>

          {error ?? (
            <p className="text-red-400 text-center">
              User is already registered!
            </p>
          )}
          <div className="flex flex-row items-center">
            <div
              className={`min-w-[85px] min-h-[85px] mr-5 overflow-hidden flex justify-center`}
            >
              {googlePhoto !== "" ? (
                <Image
                  className="rounded-full "
                  src={googlePhoto}
                  width={"85px"}
                  height={"85px"}
                />
              ) : null}
            </div>
            <div>
              {createInputForm(usernameInput, "username", false, username)}
              {createInputForm(undefined, "email", true, email)}
            </div>
          </div>

          <div className="my-5">
            {createInputForm(
              firstNameInput,
              "First Name (optional)",
              false,
              firstName
            )}
            {createInputForm(
              lastNameInput,
              "Last Name (optional)",
              false,
              lastName
            )}
          </div>

          <div className="mb-5">
            <h1
              className={`font-bold font-varelo text-[1.1rem] text-white mb-1`}
            >
              Tell us a little bit about yourself
            </h1>
            <p className="font-varela text-[#B1B1B1] text-xs mb-2">
              Tell us about your interests, hobbies, work, and other things you
              would like to share about yourself
            </p>
            {createInputForm(aboutInput, "About", false, about)}
          </div>

          <div className="mb-5">
            <h1
              className={`font-bold font-varelo text-[1.1rem] text-white mb-1`}
            >
              Date of birth
            </h1>
            <p className="font-varela text-[#B1B1B1] text-xs mb-2">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else
            </p>
            <div className="flex flex-row justify-between">
              {createDateSelector(dayInput, DayValues, "Day")}
              {createDateSelector(monthInput, MonthValues, "Month")}
              {createDateSelector(yearInput, YearValues, "Year")}
            </div>
          </div>
          <Button
            onClick={postRegister}
            className="bg-white"
            color="inherit"
            variant="contained"
            sx={{
              color: "#353B48",
              fontWeight: "bold",
              width: "100%",
              borderRadius: "100px",
            }}
          >
            Register
          </Button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
