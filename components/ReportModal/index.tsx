import {
  Modal,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { getAPIRoute } from "../../tags/apiRoutes";

interface ReportModal {
  modalOpen: boolean;
  closeReportModal: (
    event: unknown,
    reason: "backdropClick" | "escapeKeyDown"
  ) => void;
  postId: string | number;
  username: string;
  email: string;
  content: string;
  userId: string;
}

const reasons = ["PROFANITY", "RACE", "RELIGION", "SEX", "OTHER", "NONE"];

const ReportModal: FC<ReportModal> = ({
  modalOpen,
  closeReportModal,
  postId,
  username,
  email,
  content,
  userId,
}) => {
  const [reason, setReason] = useState<string>("");
  const [selfReport, setSelfReport] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const setReportReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason((event.target as HTMLInputElement).value);
    setError(false);
  };

  const submitReport = () => {
    if (reason === "") {
      setError(true);
    } else {
      axios
        .post(`${getAPIRoute().AdminEndPoint}report-post`, {
          data: JSON.stringify({
            poster_id: userId,
            post_id: postId,
            reason: reason,
          }),
        })
        .then(() => {
          setSuccess(true);
        })
        .catch(() => setSuccess(false));
    }
  };

  const formatLabel = (value: string) => {
    return (
      value.charAt(0).toUpperCase() + value.slice(1, value.length).toLowerCase()
    );
  };

  useEffect(() => {
    const authId = localStorage.getItem("userId");
    if (authId) {
      setSelfReport(authId === userId);
    }
  });

  return (
    <Modal
      className="flex w-full h-full"
      open={modalOpen}
      onClose={closeReportModal}
    >
      <div className="m-auto bg-[#353B48] rounded-md py-3 px-5 shadow-lg w-[600px] flex flex-col">
        <span className="font-inter text-white font-bold text-[1.2rem]">
          Report User
        </span>
        <div className="flex flex-col bg-[#2f3640] p-2 rounded-md shadow-lg text-white font-inter text-sm mt-3">
          <span>Username: {username}</span>
          <span>Email: {email}</span>
          <span>Post: {content}</span>
        </div>
        <span className="font-inter text-white font-bold text-md mt-3">
          Reason: {formatLabel(reason)}
        </span>
        <FormControl>
          <RadioGroup value={reason} onChange={setReportReason}>
            {reasons.map((value) => (
              <FormControlLabel
                className="text-white"
                key={value}
                value={value}
                control={<Radio />}
                label={formatLabel(value)}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <span className="font-inter text-[#b1b1b1] text-md my-2 mb-3 text-justify">
          Reporting a user ensures the safety of our community. Your report will
          go through a moderation process where the moderation team will assess
          the actions to be done for the user.
        </span>

        {success ? (
          <span className="font-inter text-white text-md my-2 mb-3 text-justify">
            Thank you for making our community safer.
          </span>
        ) : null}

        {error ? (
          <span className="font-inter text-red-500 text-md">
            Please select a reason for your report
          </span>
        ) : null}

        <div className="flex flex-row w-full items-center justify-center mt-5">
          <Button
            disabled={success}
            onClick={() => {
              closeReportModal({}, "escapeKeyDown");
            }}
            className="bg-[#b1b1b1] hover:bg-[#b1b1b1] capitalize text-white font-bold font-inter rounded-full w-[40%] mr-5 shadow-md"
          >
            Cancel
          </Button>
          <Button
            disabled={success}
            onClick={submitReport}
            className="bg-[#0097E6] hover:bg-[#0097E6] capitalize text-white font-bold font-inter rounded-full w-[40%] shadow-md"
          >
            Submit Report
          </Button>
        </div>
        {!success && selfReport ? (
          <span className="font-inter text-white text-md my-2 mt-3 text-center">
            Are you sure you want to report yourself?
          </span>
        ) : null}
      </div>
    </Modal>
  );
};

export default ReportModal;
