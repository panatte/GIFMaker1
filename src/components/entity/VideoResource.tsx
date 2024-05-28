"use client";
import React from "react";
import { StoreContext } from "@/store";
import { formatTimeToMinSec } from "@/utils";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";

type VideoResourceProps = {
  video: string;
  index: number;
};
export const VideoResource = observer(
  ({ video, index }: VideoResourceProps) => {
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLVideoElement>(null);
    const [formatedVideoLength, setFormatedVideoLength] =
      React.useState("00:00");

    return (
      <div className="rounded-lg overflow-hidden items-center m-[15px] flex flex-col relative cursor-pointer bg-gray-700 p-4" onClick={() => store.addVideo(index)}>
        <div className="bg-[rgba(0,0,0,.25)] text-white py-1 absolute text-base top-2 right-2">
          {formatedVideoLength}
        </div>
        <video
          onLoadedData={() => {
            const videoLength = ref.current?.duration ?? 0;
            setFormatedVideoLength(formatTimeToMinSec(videoLength));
          }}
          ref={ref}
          className="max-h-[100px] max-w-[150px]"
          src={video}
          height={200}
          width={200}
          id={`video-${index}`}
        ></video>
      </div>
    );
  }
);
