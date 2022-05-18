import { Tooltip } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface ChartProps {
  hateScores: object;
}

const ScoresChart: FC<ChartProps> = ({ hateScores }: ChartProps) => {
  const [maxScore, setMaxScore] = useState<number>(0);

  const getMaxScore = () => {
    let max = 0;
    Object.keys(hateScores).map((value) => {
      return (max = Math.max(
        max,
        Number(hateScores[value as keyof typeof hateScores])
      ));
    });
    return max;
  };

  const formatLabel = (value: string) => {
    return value.replace("_", " ");
  };

  useEffect(() => {
    setMaxScore(getMaxScore());
  }, [hateScores]);

  return (
    <div>
      {Object.keys(hateScores).map((value) => (
        <Tooltip
          key={value}
          className="capitalized"
          title={`${formatLabel(value)}: ${(
            parseFloat(hateScores[value as keyof typeof hateScores]) * 100
          ).toFixed(2)}%`}
        >
          <div className="hover:underline decoration-white rounded-md flex flex-row m-2 p-2 items-center">
            <div className="capitalize drop-shadow-lg min-w-[120px] text-right font-inter text-white">
              {formatLabel(value)}
            </div>
            <div
              className="shadow-lg ml-2 bg-white rounded-full h-[10px]"
              style={{
                width: `${
                  (Number(hateScores[value as keyof typeof hateScores]) /
                    maxScore) *
                  100
                }%`,
              }}
            />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default ScoresChart;
