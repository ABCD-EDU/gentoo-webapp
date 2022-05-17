import { Icon } from "@iconify/react";
import { Dispatch, FC, SetStateAction } from "react";
import { FilterProp } from "../FilterBox";
import ScorePill from "../ScorePill";

interface FilterPillProps {
  label: string;
  minScore: number | string | symbol;
  maxScore: number | string | symbol;
  className?: string;
  filters: FilterProp[];
  setFilters: Dispatch<SetStateAction<FilterProp[]>>;
}

const FilterPill: FC<FilterPillProps> = ({
  label,
  minScore,
  maxScore,
  className,
  filters,
  setFilters,
}: FilterPillProps) => {
  const removeFilter = () => {
    const newFilters = filters;

    const index = filters.findIndex((object) => {
      return object["category"] === label;
    });

    if (index > -1) {
      newFilters.splice(index, 1);
      setFilters([...newFilters]);
    }
  };

  return (
    <div
      className={`flex h-fit bg-white pr-1 rounded-md items-center ${className}`}
    >
      <ScorePill label={label} minScore={minScore} maxScore={maxScore} />
      <button
        className="hover:cursor-pointer w-fit h-fit"
        onClick={removeFilter}
      >
        <Icon
          className="hover:bg-slate-200 p-[3px] rounded-full h-[16px] w-[16px]"
          icon="akar-icons:cross"
        />
      </button>
    </div>
  );
};

export default FilterPill;
