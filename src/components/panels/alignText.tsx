'use client';
// import React, { useState } from 'react';
import { StoreContext } from "@/store";
import clsx from 'clsx';
// alignText component to align text
import React, { useState, useContext } from 'react';
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from 'react-icons/ai';

const AlignText = () => {
    const store = useContext(StoreContext);
    const [selectedAlign, setSelectedAlign] = useState('');

    const handleAlignChange = (align:any) => {
        setSelectedAlign(align);
        store.setTextAlign(align);
    };

    return (
        <div>
            <div className="mt-1 flex items-center">
                <AiOutlineAlignLeft
                    className={clsx('cursor-pointer', 'text-4xl', 'text-white',{
                        'text-blue-500': selectedAlign === 'left',
                      })}
                    onClick={() => handleAlignChange('left')}
                />
                <AiOutlineAlignCenter
                    className={clsx('cursor-pointer', 'text-4xl', 'text-white','ml-2', {
                        'text-blue-500': selectedAlign === 'center',
                      })}
                    onClick={() => handleAlignChange('center')}
                />
                <AiOutlineAlignRight
                    className={clsx('cursor-pointer', 'text-4xl', 'text-white', 'ml-2', {
                        'text-blue-500': selectedAlign === 'right',
                      })}
                    onClick={() => handleAlignChange('right')}
                />
            </div>
        </div>
    );
};

export default AlignText;