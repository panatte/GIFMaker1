'use client';
import React, { useState } from 'react';
import { StoreContext } from "@/store";

// strokeText component to add stroke to text
const StrokeText = () => {
    const store = React.useContext(StoreContext);
    const [selectedStroke, setSelectedStroke] = useState('');
    const handleStrokeChange = (event: any) => {
        const selectedStroke = event.target.value;
        setSelectedStroke(selectedStroke);
        store.setStrokeSize(selectedStroke);
    };

    return (
        <select value={selectedStroke} onChange={handleStrokeChange}>
            <option value="">Select Stroke</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    );
};

export default StrokeText;
