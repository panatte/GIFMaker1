"use client";

import { StoreContext } from "@/store";
import { formatTimeToMinSecMili } from "@/utils";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { MdPlayArrow, MdPause } from "react-icons/md";
import { ScaleRangeInput } from "./ScaleRangeInput";

const MARKINGS = [
  {
    interval: 1000,
    color: 'white',
    size: 8,
    width: 1
  },
  {
    interval: 5000,
    color: 'white',
    size: 18,
    width: 3
  },
];

const TextMarkings = [
  {
    text: "0:00",
    color: "white",
    size: 8,
  },
  {
    text: "0:05",
    color: "white",
    size: 8,
  },
  {
    text: "0:10",
    color: "black",
    size: 8,
  }
];
export type SeekPlayerProps = {};

export const SeekPlayer = observer((_props: SeekPlayerProps) => {
  const store = useContext(StoreContext);
  const Icon = store.playing ? MdPause : MdPlayArrow;
  const formattedTime = formatTimeToMinSecMili(store.currentTimeInMs);
  const formattedMaxTime = formatTimeToMinSecMili(store.maxTime);
  return (
    <div className="seek-player flex flex-col">
      <div className="flex flex-row items-center px-2">
        <button
          className="w-[80px] rounded  px-2 py-2"
          onClick={() => {
            store.setPlaying(!store.playing);
            // store.setPlaying(true);
          }}
        >
          <Icon size="40" style={{ color: "white"}}></Icon>
        </button>
        <span className="font-semibold text-white">{formattedTime}</span>
        <div className="w-[1px] h-[25px] bg-slate-300 mx-[10px]"></div>
        <span className="font-semibold text-white">{formattedMaxTime}</span>
      </div>
      <ScaleRangeInput
        max={store.maxTime}
        value={store.currentTimeInMs}
        onChange={(value) => {
          store.handleSeek(value);
        }}
        height={40}
        markings={MARKINGS}
        backgroundColor="#111827" //#111827
        textMarkings={TextMarkings}
      />
    </div>
  );
});
