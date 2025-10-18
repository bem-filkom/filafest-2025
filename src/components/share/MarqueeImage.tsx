import Marquee from "react-fast-marquee";
import image1 from "@/assets/filafest-2024/1.webp";
import image2 from "@/assets/filafest-2024/2.webp";
import image3 from "@/assets/filafest-2024/3.webp";
import image4 from "@/assets/filafest-2024/4.webp";
import image5 from "@/assets/filafest-2024/5.webp";
import image6 from "@/assets/filafest-2024/6.webp";
import image7 from "@/assets/filafest-2024/7.webp";
import image8 from "@/assets/filafest-2024/8.webp";

export default function MarqueeImage() {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8];
  return (
    <>
      <Marquee className="mb-4 rotate-3">
        {images.map((item, index) => (
          <div key={index}>
            <img src={item} alt="" className="h-52 me-10" />
          </div>
        ))}
      </Marquee>
      <Marquee direction="right" className="-rotate-3">
        {images.map((item, index) => (
          <div key={index}>
            <img src={item} alt="" className="h-52 me-10" />
          </div>
        ))}
      </Marquee>
    </>
  );
}
