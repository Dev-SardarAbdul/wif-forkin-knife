"use client";

import Image from "next/image";
import blackImg from "@assets/blackImg.png";
import redImg from "@assets/redImg.png";
import blueImg from "@assets/blueImg.png";
import vanillaImg from "@assets/vanillaImg.png";
import whiteImg from "@assets/whiteImg.png";
import { useRef, useState } from "react";

export default function Home() {
  const [selectedValue, setActiveValue] = useState<string>("white");
  const [image, setImage] = useState<string | null>(null);
  const uploaderRef = useRef<any>();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const targetWidth = 200;
    const targetHeight = 200;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = targetWidth * pixelRatio;
    canvas.height = targetHeight * pixelRatio;

    canvas.style.width = `${targetWidth}px`;
    canvas.style.height = `${targetHeight}px`;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    const baseImage = new window.Image();
    const overlayImage = new window.Image();

    baseImage.crossOrigin = "anonymous";
    overlayImage.crossOrigin = "anonymous";

    baseImage.src =
      selectedValue === "white"
        ? whiteImg.src
        : selectedValue === "vanilla"
        ? vanillaImg.src
        : selectedValue === "black"
        ? blackImg.src
        : selectedValue === "red"
        ? redImg.src
        : selectedValue === "blue"
        ? blueImg.src
        : whiteImg.src;

    if (image) {
      overlayImage.src = image;
      overlayImage.onload = () => {
        context.drawImage(
          overlayImage,
          0,
          0,
          targetWidth * pixelRatio,
          targetHeight * pixelRatio
        );
        baseImage.onload = () => {
          context.drawImage(
            baseImage,
            0,
            0,
            targetWidth * pixelRatio,
            targetHeight * pixelRatio
          );
          const finalImage = canvas.toDataURL("image/png");
          downloadImage(finalImage, "image.png");
        };
      };
    } else {
      baseImage.onload = () => {
        context.drawImage(
          baseImage,
          0,
          0,
          targetWidth * pixelRatio,
          targetHeight * pixelRatio
        );
        const finalImage = canvas.toDataURL("image/png");
        downloadImage(finalImage, "image.png");
      };
    }
  };

  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;

    // Append link to body
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Remove link from body
    document.body.removeChild(link);
  };

  return (
    <main className="pt-12 min-h-screen flex flex-col bg-[#0052ff]">
      <main className="flex-1 px-4 container mx-auto">
        <h4 className="text-white text-center text-2xl md:text-4xl lg:text-[52px] font-bold !leading-none mt-4 lg:mt-8">
          WIFFORKINKNIFE PFP CREATOR
        </h4>
        <div className="md:w-[700px] mt-12 mx-auto">
          <div className="flex justify-end items-center gap-2">
            <p className="text-white text-lg font-bold">Style:</p>
            <select
              className="p-2 bg-white border cursor-pointer border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => setActiveValue(event.target.value)}
            >
              <option value="white">White</option>
              <option value="vanilla">Vanilla</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div className="flex flex-col rounded-lg p-8 mt-4 justify-center items-center gap-2 w-full bg-white border shadow-xl">
            <div className="relative w-[200px] h-[200px] overflow-clip rounded-full">
              <Image
                className="w-full h-full relative z-10"
                src={
                  selectedValue === "white"
                    ? whiteImg
                    : selectedValue === "vanilla"
                    ? vanillaImg
                    : selectedValue === "black"
                    ? blackImg
                    : selectedValue === "red"
                    ? redImg
                    : selectedValue === "blue"
                    ? blueImg
                    : whiteImg
                }
                alt="Image"
              />
              {image && (
                <div className="absolute inset-0 w-full h-full flex justify-center items-center overflow-clip">
                  <Image
                    src={image}
                    alt="Uploaded Image"
                    className=""
                    width={200}
                    height={200}
                  />
                </div>
              )}
            </div>

            <input
              type="file"
              ref={uploaderRef}
              accept="image/*"
              hidden
              onChange={handleImageChange}
              onInput={handleImageChange}
            />
            <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mt-8">
              <button
                type="button"
                className="w-52 relatiive z-10 cursor-pointer rounded-full text-lg font-medium h-14 bg-[#0052ff] text-white"
                onClick={() => uploaderRef.current.click()}
              >
                Upload an Image
              </button>
              <button
                type="button"
                className="w-56 relatiive z-10 cursor-pointer rounded-full text-lg font-medium h-14 bg-black text-white"
                onClick={handleDownload}
              >
                Download Final Image
              </button>
            </div>
          </div>

          <p className="text-white mt-4 text-center">
            *Depending on your device you may need to be in privacy mode in
            Chrome or Safari to download your new $WFK PFP.
          </p>
        </div>
      </main>

      <div className="bg-[#0052ff] py-4">
        <div className="container mx-auto px-4 flex md:flex-row flex-col justify-between items-center gap-2">
          <h4 className="text-white">$WFK Built on Base Chain</h4>
          <h4 className="text-white text-center break-all">
            CA: 0x40f710ebcd459f8e4cef38d1d361f81498a952d3
          </h4>
        </div>
      </div>
    </main>
  );
}
