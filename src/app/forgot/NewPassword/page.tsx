'use client';
import React, { useState} from 'react';
import Navbar from '@/components/Navbar';
import Swal from 'sweetalert2';
export default function NewPassword() {
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const handleClick = async (e: any) => {
        try {
            e.preventDefault();
            // ส่งค่ารหัสผ่านใหม่ไปยังฝั่งเซิร์ฟเวอร์
            const response = await fetch("/api/changePasswrod", {
                method: "POST",
                body: JSON.stringify({ newpassword }),
            });
            const data = await response.json();
            if (response.status === 200) {
                // ทำสิ่งที่คุณต้องการเมื่อตอบกลับสำเร็จ
            } else {
                throw new Error(data.message); // โยนข้อผิดพลาดในกรณีที่เซิร์ฟเวอร์ส่งข้อความผิดพลาดกลับมา
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Password is invalid',
                text: (error as Error).message || 'Invalid password. Please enter again.',
            });
        }
    };

    return (
        <div className="m-0 bg-gray-900 min-h-screen">
            <Navbar />
            <div className="items-center justify-between flex flex-col p-14">
                <div className="w-full max-w-sm p-4 bg-gray-800 rounded-lg shadow sm:p-6 md:p-8 dark:bg-rose-800 dark:border-rose-700">
                    <form className="space-y-6" onSubmit={handleClick}>
                        <h5 className="text-2xl font-semibold text-white dark:text-white text-center">Enter password</h5>
                        <div>
                            <label htmlFor="newpassword" className="block mb-2 text-xl font-semibold text-white dark:text-white">New Password</label>
                            <input
                                type="password"
                                name="newpassword"
                                id="newpassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
                                value={newpassword}
                                onChange={(e) => setNewpassword(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmpassword" className="block mb-2 text-xl font-semibold text-white dark:text-white">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmpassword"
                                id="confirmpassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
                                value={confirmpassword}
                                onChange={(e) => setConfirmpassword(e.target.value)}
                                required={true}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-rose-700 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Enter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
// Compare this snippet from src/app/forgot/page.tsx: