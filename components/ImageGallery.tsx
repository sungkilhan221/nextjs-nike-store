"use client";

import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: any;
}

function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };

  return (
    <div className="flex gap-4 max-w-7xl flex-col md:flex-row">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: number) => (
          <div
            key={idx}
            className={cn(
              "overflow-hidden rounded-lg bg-gray-100",
              bigImage === image && "brightness-[90%]"
            )}
          >
            <Image
              src={urlFor(image).url()}
              width={150}
              height={150}
              alt="photo"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
              onMouseEnter={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={urlFor(bigImage).url()}
          width={2000}
          height={2000}
          alt="photo"
          className="w-full object-cover object-center cursor-pointer rounded-lg"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-gray-900 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          New
        </span>
      </div>
    </div>
  );
}

export default ImageGallery;
