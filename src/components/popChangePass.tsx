import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { on } from "events";

function changepass(onClose: () => void) {
    const newpassword = document.getElementById("newpassword") as HTMLInputElement;
    const confirmpassword = document.getElementById("confirmpassword") as HTMLInputElement;

    if (newpassword.value === "" || confirmpassword.value === "") {
        Swal.fire({
            icon: "error",
            title: "กรุณากรอกข้อมูลให้ครบ",
        });
        return;
    }

    if (newpassword.value !== confirmpassword.value) {
        Swal.fire({
            icon: "error",
            title: "รหัสผ่านใหม่ไม่ตรงกัน",
        });
        return;
    }

    Swal.fire({
        title: 'กำลังประมวลผล',
        html: 'กรุณารอสักครู่...',
        allowOutsideClick: false,
        showConfirmButton: false,
    });

    Swal.showLoading();
    axios.post("/api/changepass", {
        newpassword: newpassword.value,
    })
    .then((res) => {
        function delay(arg0: number): Promise<void> {
            return new Promise(resolve => setTimeout(resolve, arg0));
        }

        if (res.data.status === 200) {
            Swal.fire({
                icon: "success",
                title: "เปลี่ยนรหัสผ่านสำเร็จ",
            });
            newpassword.value = "";
            confirmpassword.value = "";
            delay(1000).then(() => onClose());
            
        } else {
            Swal.fire({
                icon: "error",
                title: "เปลี่ยนรหัสผ่านไม่สำเร็จ",
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "กรุณาลองใหม่อีกครั้ง",
        });
    })
    // .finally(() => {
    //     Swal.close();
    // });
}


const PopChangePass = ({ onClose }: { onClose: () => void; }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-8 rounded-lg w-1/3">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Change Password</h1>
                    <button onClick={onClose}>
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>
                <div className="mt-4">
                    <label htmlFor="newpassword">New Password</label>
                    <input
                        type="password"
                        id="newpassword"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => changepass(onClose)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Save
                    </button>
                    <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-3">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopChangePass;

function delay(arg0: number) {
    throw new Error("Function not implemented.");
}
