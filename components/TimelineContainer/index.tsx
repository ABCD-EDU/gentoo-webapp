import { FC } from "react";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  heading: string;
}

const TimelineContainer: FC<ContainerProps> = ({
  children,
  className,
  heading,
}: ContainerProps) => {
  return (
    <div
      className={`last border-b-0 flex flex-col w-[650px] border-[#808080] border-r-[1px] border-l-[1px] ${className}`}
    >
      <span className="font-bold font-Inter text-[1.7rem] text-white mt-3 h-fit w-[100%] px-5">
        {heading}
      </span>
      {children}
    </div>
  );
};

export default TimelineContainer;
