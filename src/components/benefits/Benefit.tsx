"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
};

export default function Benefit({ id, imageUrl, title, description }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${id}`);
  };

  return (
    <motion.div
      variants={childVariant}
      onClick={handleClick}
      className="mt-5 cursor-pointer min-h-[370px] rounded-md border-2 border-gray-100 px-5 py-8 text-center hover:shadow-lg transition"
    >
      <div className="mb-4 flex justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>

      <h4 className="font-bold text-lg">{title}</h4>
      <p className="my-3 text-sm text-gray-600 line-clamp-3">{description}</p>

      <p className="text-primary-500 font-semibold mt-4">Learn More →</p>
    </motion.div>
  );
}
