import Link from "next/link";

// Social items
import social from "@/data/social";
import MotionBtn from "./MotionBtn";

const Social = ({ containerStyle, iconStyle }) => {
  return (
    <div className={containerStyle}>
      {social.map((item, index) => {
        return (
          <MotionBtn
            key={index}
            whileHover={{ rotate: 360, scale: 1.5 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <Link href={item.url} target="_blank" key={index} className={iconStyle}>
              {item.icon}
            </Link>
          </MotionBtn>
        );
      })}
    </div>
  );
};

export default Social;
