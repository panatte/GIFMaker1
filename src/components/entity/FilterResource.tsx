'use client';
import React, { FunctionComponent, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import { VideoEditorElement, ImageEditorElement, EditorElement } from "@/types";

export type FillResourceProps = {
    editorElement: EditorElement;
};
export const FillResource: FunctionComponent<FillResourceProps> = observer(({ editorElement }) => {
    const [brightness, setBrightness] = useState<number>(0);
    const [contrast, setContrast] = useState<number>(0);
    const [hue, setHue] = useState<number>(0);
    const [pixelate, setPixelate] = useState<number>(0);
    const store = React.useContext(StoreContext);

    useEffect(() => {
        setBrightness(store.brightness);
        setContrast(store.contrast);
        setHue(store.hue);
    }, [store.brightness, store.contrast, store.hue]);

    const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setBrightness(value);
        store.setBrightness(value);
    };

    const handleContrastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setContrast(value);
        store.setContrast(value);
    };

    const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setHue(value);
        store.setHue(value);
    };

    const handlePixelateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setPixelate(value);
        store.setPixelate(value);
    };

    return (
        <>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md mr-4 w-full">
                <div className="text-xl mb-2 font-semibold text-white">Brightness</div>
                <div className="flex items-center mb-6">
                    <input
                        id="small-range"
                        type="range"
                        min="-100"
                        max="100"
                        value={brightness}
                        onChange={handleBrightnessChange}
                        className="rang w-full h-1 rounded-lg appearance-none cursor-pointer range-sm "
                    />

                    <style jsx>{`
                        input[type="range"]::-webkit-slider-thumb {
                            background-color: #f43f5e; /* สีของปุ่มที่ใช้เพื่อลากและปล่อย */
                            cursor: pointer;
                            border: none;
                            border-radius: 50%;
                            width: 16px; /* ขนาดของปุ่ม */
                            height: 16px;
                            }
                    `}</style>

                    <span className="ml-2 text-white font-semibold">{brightness}</span>
                </div>

                <div className="text-xl mb-2 font-semibold text-white">Contrast</div>
                <div className="flex items-center">
                    <input
                        id="small-range"
                        type="range"
                        min="0"
                        max="100"
                        value={contrast}
                        onChange={handleContrastChange}
                        className="range w-full h-1 bg-white-500 rounded-lg appearance-none cursor-pointer range-sm text-rose-500"
                    />
                    <style jsx>{`
                        input[type="range"]::-webkit-slider-thumb {
                            background-color: #f43f5e; /* สีของปุ่มที่ใช้เพื่อลากและปล่อย */
                            cursor: pointer;
                            border: none;
                            border-radius: 50%;
                            width: 16px; /* ขนาดของปุ่ม */
                            height: 16px;
                            }
                    `}</style>
                    <span className="ml-2 text-white font-semibold">{store.contrast}</span>
                </div>
                <div className="text-xl mb-2 font-semibold text-white">Hue</div>
                <div className="flex items-center">
                    <input
                        id="small-range"
                        type="range"
                        min="-100"
                        max="100"
                        value={hue}
                        onChange={handleHueChange}
                        className="range w-full h-1 bg-white-500 rounded-lg appearance-none cursor-pointer range-sm"
                    />
                    <style jsx>{`
                        input[type="range"]::-webkit-slider-thumb {
                            background-color: #f43f5e; /* สีของปุ่มที่ใช้เพื่อลากและปล่อย */
                            cursor: pointer;
                            border: none;
                            border-radius: 50%;
                            width: 16px; /* ขนาดของปุ่ม */
                            height: 16px;
                            }
                    `}</style>
                    <span className="ml-2 text-white font-semibold">{store.hue}</span>
                </div>
                <div className="text-xl mb-2 font-semibold text-white">Pixelate</div>
                <div className="flex items-center">
                    <input
                        id="small-range"
                        type="range"
                        min="0"
                        max="10"
                        value={pixelate}
                        onChange={handlePixelateChange}
                        className="range w-full h-1 bg-white-500 rounded-lg appearance-none cursor-pointer range-sm"
                    />
                    <style jsx>{`
                        input[type="range"]::-webkit-slider-thumb {
                            background-color: #f43f5e; /* สีของปุ่มที่ใช้เพื่อลากและปล่อย */
                            cursor: pointer;
                            border: none;
                            border-radius: 50%;
                            width: 16px; /* ขนาดของปุ่ม */
                            height: 16px;
                            }
                    `}</style>
                    <span className="ml-2 text-white font-semibold">{store.pixelate}</span>
                </div>
            </div>

        </>
    );
});