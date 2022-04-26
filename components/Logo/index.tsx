import Image from "next/image";
import { FC } from "react";

export enum LogoVariants {
  Full = "full",
  Photo = "photo",
  Header = "header",
}

interface LogoProps {
  variant: LogoVariants.Full | LogoVariants.Header | LogoVariants.Photo;
  className?: string;
}

interface VariantProps {
  Full: string;
  Photo: string;
  Header: string;
}

const VariantPaths: VariantProps = {
  Full: "logo_with_name.png",
  Photo: "logo.png",
  Header: "logo_header.png",
};

interface VariantSizes {
  Width: number;
  Height: number;
}

const VariantToSize: { [variant: string]: VariantSizes } = {
  [LogoVariants.Full]: {
    Width: 128,
    Height: 48,
  },
  [LogoVariants.Header]: {
    Width: 279,
    Height: 51,
  },
  [LogoVariants.Photo]: {
    Width: 48,
    Height: 48,
  },
};

const getVariantToSize = (variant: string): VariantSizes => {
  if (!VariantToSize[variant]) {
    throw new Error(`Unknown variant (${variant}).`);
  }
  return VariantToSize[variant];
};

const getFileName = (variant: string) => {
  if (variant === "full") {
    return VariantPaths.Full;
  } else if (variant === "photo") {
    return VariantPaths.Photo;
  } else if (variant === "header") {
    return VariantPaths.Header;
  }

  throw new Error(`Unknown variant (${variant})`);
};

const Logo: FC<LogoProps> = ({ variant, className }: LogoProps) => {
  const imagePath = `/images/logo/${getFileName(variant)}`;
  const size: VariantSizes = getVariantToSize(variant);

  return (
    <div className={`${className}`}>
      <Image src={imagePath} width={size.Width} height={size.Height} />
    </div>
  );
};

export default Logo;
