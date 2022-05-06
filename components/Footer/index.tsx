import Link from "next/link";
import Logo, { LogoVariants } from "../Logo";

const footerLinks = [
  {
    name: "RESOURCES",
    links: [
      {
        name: "readme",
        link: "https://github.com/ABCD-EDU/gentoo-webapp/blob/main/README.md",
      },
    ],
  },
  {
    name: "ABOUT",
    links: [
      { name: "github", link: "https://github.com/ABCD-EDU/gentoo-webapp/" },
    ],
  },
  {
    name: "WHAT IS GENTOO?",
    links: [],
  },
  {
    name: "GENTOO",
    links: [{ name: "v0.1.0", link: "/" }],
  },
  {
    name: "MORE",
    links: [{ name: "related tools", link: "https://github.com/ABCD-EDU" }],
  },
];

const Footer = ({ className }: { className?: string }) => {
  return (
    <div className="bg-[#353B48] lg:bg-[#2F3640] w-full mt-[7rem]">
      <div className="flex flex-col justify-center items-center mt-5 lg:hidden">
        <span className="font-varela text-[#9C9C9C]">WHAT IS GENTOO?</span>
        <Logo variant={LogoVariants.Photo} />
      </div>
      <div
        className={`
        flex flex-col lg:flex-row
        lg:justify-between
        w-9/12
        mx-auto
        ${className}`}
      >
        {footerLinks.map((e) => (
          <>
            {e.name === "WHAT IS GENTOO?" ? (
              <div
                key={e.name}
                className="hidden lg:flex flex-col justify-center items-center mt-5"
              >
                <span className="font-varela text-[#9C9C9C]">
                  WHAT IS GENTOO?
                </span>
                <Logo variant={LogoVariants.Photo} />
              </div>
            ) : (
              <div
                key={e.name}
                className="flex flex-col justify-center items-center mt-5"
              >
                <span
                  key={e.name}
                  className="font-urbanist font-bold text-[#9C9C9C]"
                >
                  {e.name}
                </span>
                {e.links.map((e) => (
                  <Link key={e.name} href={e.link}>
                    <a
                      target="_blank"
                      className={`text-[#979797] decoration-none hover:text-white hover:underline`}
                    >
                      {e.name}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Footer;
