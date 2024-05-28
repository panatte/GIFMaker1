'use client';
import React,{useState} from 'react';
import Swal from 'sweetalert2';

const Popreport = ({ item }: { item: any }) => {
    const [Details, setDetails] = useState(''); // ปรับเพิ่ม useState('') และ setDetails('')

    const handleOnClose = () => {
        console.log('onclose called');
        Swal.close();
    };

    const handleSave = () => {
        Swal.fire({
            title: 'Saving report...',
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });
        fetch('/api/addComplain', {
            method: 'POST',
            body: JSON.stringify({ img_ID: item.img_ID, details: Details, path_img: item.path_Img}),
        }).then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Report saved successfully',
                        icon: 'success',
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to save report',
                        icon: 'error',
                    });
                }
            })
            .catch((error) => {
                console.error('Error saving report:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to save report',
                    icon: 'error',
                });
            });
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(e.target.value);
    }

    // Check if item and item.img_ID exist before usage
    if (!item || !item.img_ID) {
        return (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg">
                    <div className="text-2xl font-bold mb-[10px] flex items-center justify-center">
                        Report
                    </div>
                    <p>No data available</p>
                    <button
                        onClick={handleOnClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ">
            <div className="bg-white p-8 rounded-lg w-[500px]">
                <div className="text-3xl font-bold mb-6 flex items-center justify-center"> {/* ปรับ text-3xl และ mb-6 */}
                    Report
                </div>
                <div className="text-lg mb-4 flex items-start">
                    Name : {item.imgName}
                </div>
                <div className="mb-4 flex items-start">
                    <div className="text-lg mb-2 mr-2">Details</div>
                </div>
                <div className="rounded-lg w-full">
                    <textarea value={Details} onChange={handleOnChange} className="w-full p-2 outline-none h-48" placeholder="Details"></textarea> {/* ปรับ h-32 เป็น h-48 */}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleOnClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Popreport;
