import { observer } from 'mobx-react';
import React, { useState, useEffect, useRef } from 'react';
import { StoreContext } from '@/store';
import { Stickerentity } from '../entity/stickerEntity';
export const StickerPanel = observer(() => {
    const store = React.useContext(StoreContext);
    // const stickerImages = ['giphy6.gif'];

    const [stickers, setstickers] = useState<string[]>([]);

    useEffect(() => {
        const fetchStickers = async () => {
            const res = await fetch('/api/stickers',{
                method: "POST",
            });
            const data = await res.json();
            console.log('data.stickers >>>>>>>>>>>>>>>>>>>> : ', data.stickers);
            setstickers(data.stickers);
        };
        fetchStickers();
    } , []);

    if(store.sticker.length === 0) {
        stickers.forEach((image, index) => {
            console.log(' img ----------------------------- ',image);
            store.addStickerResource('/stickers/'+image);
        });
    }

    return (
        <div>
            <div className="px-[16px] pt-[16px] pb-[8px] font-semibold text-xl text-white bg-gray-900">
                Stickers
            </div>
            <div>
                {store.sticker && store.sticker.map((sticker: any, index: any) => {
                    return <Stickerentity key={sticker} sticker={sticker} index={index} />;
                })}
            </div>
        </div>
    );
});