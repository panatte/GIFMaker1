"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import Swal from 'sweetalert2';
export const ExportVideoPanel = observer(() => {
  const store = React.useContext(StoreContext);

  return (
    <>
      <div className="bg-gray-700 p-4 rounded-lg shadow-md m-2">
        <div className="font-semibold text-xl mb-4 text-white">Export</div>

        {/* Set max time from number input */}
        <div className="flex flex-row items-center my-2">
          <div className="text-xm font-semibold mr-2 text-white">Video Length</div>
          <input
            type="number"
            className="rounded text-center border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 max-w-[70px] mr-2"
            value={store.maxTime / 1000}
            min={1}
            max={10}
            onChange={(e) => {
              const value = e.target.value;
              store.setMaxTime(Number(value) * 1000);
            }}
          />
          <div className="text-xm text-white">secs</div>
        </div>

        {/* Format selection with radio button */}
        <div className="flex flex-row items-center my-2">
          <div className="text-xm font-semibold mr-2 text-white">Video Format</div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="mr-1"
              name="video-format"
              value="mp4"
              checked={store.selectedVideoFormat === "mp4"}
              onChange={(e) => {
                store.setVideoFormat("mp4");
              }}
            />
            <span className="text-xm mr-2 text-white">MP4</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="mr-1"
              name="video-format"
              value="gif"
              checked={store.selectedVideoFormat === "gif"}
              onChange={(e) => {
                store.setVideoFormat("gif");
              }}
            />
            <span className="text-xm text-white">GIF</span>
          </label>
        </div>

        <button
          className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg mt-4 text-3xl"
          onClick={() => {
            // แสดง modal สอบถามก่อนที่จะส่งออกวิดีโอ
            Swal.fire({
              title: 'Do you want to export the video?',
              text: `The length of the selected video is ${store.maxTime / 1000} seconds`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, export!',
              cancelButtonText: 'Cancel'
            }).then((result) => {
              if (result.isConfirmed) {
                // แสดงหน้ารอโหลด
                Swal.fire({
                  title: 'Exporting video...',
                  allowOutsideClick: false
                });

                // ทำการส่งออกวิดีโอ
                store.handleSeek(0);
                store.setSelectedElement(null);
                setTimeout(() => {
                  store.setPlaying(true);
                  store.saveCanvasToVideoWithAudio();
                  Swal.close();
                  Swal.fire(
                    'Success!',
                    'The video has been exported successfully',
                    'success'
                  );
                }, 1000);
              }
            });
          }}
        >
          Export Video
        </button>

      </div>
    </>
  );
});
