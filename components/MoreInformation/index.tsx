import { FC } from "react";

interface MoreInformationContainer {
  children?: React.ReactNode;
  className?: string;
}

const MoreInformation: FC<MoreInformationContainer> = ({
  children,
  className
}) => {
  return(
    <div className={`w-[340px] h-[100vh] + ${className}`}>
      {children}
    </div>
  );
};

export default MoreInformation;
