import { FC } from 'react';
import { Button, TextField, ThemeProvider, createTheme } from "@mui/material";
import styles from "./UserSearch.module.css";
import { useState } from "react";
import axios from "axios";

export interface SearchUserProps {
    searchFunction: any;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Dashboard = ({
    searchFunction
}: SearchUserProps) => {
    const [textValue, setTextValue] = useState<any>("");

    return (
        <div className={"p-4 pt-3 w-full h-contain font-['Inter'] flex flex-row flex-wrap justify-evenly mt-[1.25rem] mr-auto ml-auto w-[97%] shadow-[0px_0px_0.938rem_-0.313rem_rgba(0,0,0,0.25)] rounded-[5px] sm:bg-[#353B48]"}>
            <span className="font-bold font-Inter text-[1.5rem] text-white h-fit w-[100%]">
                Search User
            </span>
            <div className="flex gap-3 pt-1">
                <ThemeProvider theme={darkTheme}>                    
                <TextField 
                    id="outlined-basic" 
                    label="name" 
                    variant="outlined" 
                    size="small"
                    onChange={(e) => setTextValue(e.target.value)}
                />
                <Button className={styles.Button} variant="contained" onClick={() => searchFunction(textValue)}>
                    Search
                </Button>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Dashboard;