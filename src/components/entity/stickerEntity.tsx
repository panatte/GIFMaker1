'use client';
import { observer } from 'mobx-react';
import React, { useState, useRef, useContext } from 'react';
import { StoreContext } from '@/store';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';

type StickerPanelProps = {
    sticker: string;
    index: number;
};

const formatTimeToMinSec = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toFixed(3)}`;  // Format seconds to three decimal places
};

export const Stickerentity = observer(
    ({ sticker, index }: StickerPanelProps) => {
        const store = useContext(StoreContext);
        const ref = useRef<HTMLVideoElement>(null);
        const [formattedVideoLength, setFormattedVideoLength] = useState("00:00");

        console.log('sticker stickerentiy >>>>>>>>>>>>>>>>>>>> : ', sticker, index);

        return (
            <div 
                className="rounded-lg overflow-hidden items-center m-[15px] flex flex-col relative cursor-pointer bg-gray-700 p-4" 
                onClick={() => store.addStickers(index)}
            >
                <div className="bg-[rgba(0,0,0,.25)] text-white py-1 absolute text-base top-2 right-2">
                    {formattedVideoLength}
                </div>
                <video
                    onLoadedData={() => {
                        const videoLength = ref.current?.duration ?? 0;
                        setFormattedVideoLength(formatTimeToMinSec(videoLength));
                    }}
                    autoPlay
                    loop
                    ref={ref}
                    className="max-h-[100px] max-w-[150px]"
                    src={sticker}
                    height={200}
                    width={200}
                    id={`sticker-${index}`}
                ></video>
            </div>
        );
    }
);
