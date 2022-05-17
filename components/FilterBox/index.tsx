import {
  Button,
  createTheme,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import FilterPill from "../FilterPill";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export interface FilterProp {
  category: string;
  minScore: number;
  maxScore: number;
}

export interface FilterBoxProps {
  filters: FilterProp[];
  setFilters: Dispatch<SetStateAction<FilterProp[]>>;
}

const FilterBox: FC<FilterBoxProps> = ({
  filters,
  setFilters,
}: FilterBoxProps) => {
  const [currentFilter, setCurrentFilter] = useState<string>("hate");
  const [minValue, setMinValue] = useState<number>(0);
  const [inputError, setInputError] = useState<boolean>(false);
  const [maxValue, setMaxValue] = useState<number>(0);

  const handleFilterChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCurrentFilter(e.target.value);
  };

  const handleMinValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setMinValue(newValue);
    if (!isNaN(newValue) && newValue <= 100 && newValue < maxValue) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const handleMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setMaxValue(newValue);
    if (!isNaN(newValue) && newValue <= 100 && newValue > minValue) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const containsFilter = (label: string): boolean => {
    for (let i = 0; i < filters.length; i++) {
      if (filters[i]["category"] === label.toLowerCase()) return true;
    }
    return false;
  };

  const addFilter = () => {
    if (containsFilter(currentFilter)) {
      const index = filters.findIndex((object) => {
        return object["category"] === currentFilter;
      });

      filters[index]["minScore"] = minValue;
      filters[index]["maxScore"] = maxValue;
      setFilters([...filters]);
    } else {
      setFilters([
        ...filters,
        {
          category: currentFilter,
          minScore: minValue,
          maxScore: maxValue,
        },
      ]);
      setCurrentFilter("hate");
      setMinValue(0);
      setMaxValue(0);
    }
  };

  return (
    <div
      className={`p-4 pt-3 w-full h-contain font-['Inter'] flex flex-row flex-wrap justify-evenly mt-[1.25rem] mr-auto ml-auto w-[97%]
        shadow-[0px_0px_0.938rem_-0.313rem_rgba(0,0,0,0.25)] rounded-[5px] sm:bg-[#353B48]`}
    >
      <span className="font-bold font-Inter text-[1.5rem] text-white h-fit w-[100%]">
        Filter
      </span>

      <ThemeProvider theme={darkTheme}>
        <Select
          className="w-full"
          displayEmpty
          value={currentFilter}
          onChange={handleFilterChange}
        >
          <MenuItem value={"hate"}>Hate</MenuItem>
          <MenuItem value={"normal"}>Normal</MenuItem>
          <MenuItem value={"offensive"}>Offensive</MenuItem>
          <MenuItem value={"profanity"}>Profanity</MenuItem>
          <MenuItem value={"race"}>Race</MenuItem>
          <MenuItem value={"religion"}>Religion</MenuItem>
          <MenuItem value={"sex"}>Sex</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
          <MenuItem value={"none"}>None</MenuItem>
        </Select>
        <div className="mt-5 flex flex-row">
          <TextField
            type="number"
            onChange={handleMinValue}
            value={minValue <= 0 ? "" : minValue}
            label="Minimum"
            variant="outlined"
            size="small"
            className="mr-2"
            error={inputError}
          />
          <TextField
            type="number"
            onChange={handleMaxValue}
            value={maxValue <= 0 ? "" : maxValue}
            label="Maximum"
            variant="outlined"
            size="small"
            error={inputError}
          />
        </div>
        {inputError ? (
          <span className="text-sm text-red-500 text-center">
            Something is wrong with your inputted values
          </span>
        ) : null}
        <Button
          onClick={addFilter}
          className="bg-white hover:shadow-lg hover:bg-white rounded-full capitalize text-lg w-full mt-2 text-[#353B48]"
        >
          Apply
        </Button>
        {filters.length > 0 ? (
          <div className="flex flex-wrap w-full h-fit mt-2">
            {filters.map((values) => (
              <FilterPill
                key={values["category"]}
                className="mr-1"
                minScore={values["minScore"]}
                maxScore={values["maxScore"]}
                label={values["category"]}
                filters={filters}
                setFilters={setFilters}
              />
            ))}
          </div>
        ) : null}
      </ThemeProvider>
    </div>
  );
};

export default FilterBox;
