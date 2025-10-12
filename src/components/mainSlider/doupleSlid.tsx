import Image from "next/image";

type Props = {
  image1: string;
  image2: string;
};
// B 150 L 200
const DoupleSlid = ({ image1, image2 }: Props) => {
  return (
    <div className="flex h-fit w-fit flex-col gap-1 px-0.5 py-0.5">
      <div className="relative h-[200px] w-[150px] transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
        <Image src={image1} alt="no image" fill className="object-cover" />
      </div>
      <div className="relative h-[200px] w-[150px] transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
        <Image src={image2} alt="no image" fill className="object-cover" />
      </div>
    </div>
  );
};

export default DoupleSlid;
