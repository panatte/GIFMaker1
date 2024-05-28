import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { on } from "events";
const Popchangeimg = ({ onClose }: { onClose: () => void }) => {
    function changeimg(event: React.ChangeEvent<HTMLInputElement>) {
        const fileInput = event.target.files ? event.target.files[0] : null;
        const previewImg = document.getElementById('preview') as HTMLImageElement;

        if (fileInput) {
            const formData = new FormData();
            formData.append('image', fileInput);
            Swal.fire({
                title: 'กำลังประมวลผล',
                html: 'กรุณารอสักครู่...',
                allowOutsideClick: false,
                showConfirmButton: false,
            });
            Swal.showLoading();
            axios.post("/api/changeimg", formData)
                .then((res) => {
                    function delay(arg0: number): Promise<void> {
                        return new Promise(resolve => setTimeout(resolve, arg0));
                    }
                    if (res.data.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "เปลี่ยนรูปภาพสำเร็จ",
                            
                        });
                        delay(1000).then(() => onClose());
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "เปลี่ยนรูปภาพไม่สำเร็จ",
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",
                        title: "เปลี่ยนรูปภาพไม่สำเร็จ",
                    });
                });
            
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target && e.target.result) {
                    previewImg.src = e.target.result.toString();
                }
            };
            reader.readAsDataURL(fileInput);
        }
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-md w-1/4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Change Image</h1>
                </div>
                <div className="flex justify-center items-center m-5">
                    <img
                        src="/images/profile.png"
                        alt="profile"
                        className="w-1/2 h-1/2"
                        id="preview"
                    />
                </div>
                <div className="flex justify-center items-center m-5">
                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        onChange={changeimg}
                    />
                </div>
                <div className="flex justify-end items-end m-5">
                    <button
                        className="bg-green-500 text-white font-semibold p-4 rounded-md m-2"
                    >
                        Save
                    </button>
                    <button
                        className="bg-red-500 text-white font-semibold p-4 rounded-md m-2"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};



export default Popchangeimg;