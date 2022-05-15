import { FC } from "react";

interface PillProps {
  label: string;
  score: string | number | symbol;
  className?: string;
}
const ScorePill: FC<PillProps> = ({ label, score, className }: PillProps) => {
  const getColor = (label: string) => {
    switch (label) {
      case "hate":
        return "#b33939";
      case "normal":
        return "#aaa69d";
      case "offensive":
        return "#474787";
      case "profanity":
        return "#227093";
      case "race":
        return "#218c74";
      case "religion":
        return "#5f27cd";
      case "sex":
        return "#cf6a87";
      case "other":
        return "#cd6133";
      case "none":
        return "#303952";
      default:
        return "black";
    }
  };

  return (
    <div
      className={`text-black shadow-lg hover:shadow-xl flex flex-row bg-white max-w-fit font-inter text-xs rounded-md px-2 py-1 mb-1 capitalize ${className}`}
    >
      <span className="mr-1 drop-shadow-lg" style={{ color: getColor(label) }}>
        {label}:
      </span>
      <span>{score.toString()}</span>
    </div>
  );
};

export default ScorePill;
