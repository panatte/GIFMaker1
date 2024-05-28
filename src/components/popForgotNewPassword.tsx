'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function NewPassword({ userid, onclose }: { userid: any, onclose: () => void }) {
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");


    const handleClick = async (e: any) => {
        e.preventDefault();

        if (newpassword !== confirmpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords do not match',
                text: 'Please make sure both passwords match.',
            });
            return;
        }

        try {
            // ส่งค่ารหัสผ่านใหม่ไปยังฝั่งเซิร์ฟเวอร์
            Swal.fire({
                title: 'Changing password...',
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            const response = await fetch("/api/changePassword", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newpassword, userid }),
            });

            // ตรวจสอบว่า response เป็น JSON หรือไม่
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData);
            }

            const data = await response.json();
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Changed',
                    text: 'Your password has been successfully changed.',
                });
                onclose();
            } else {
                throw new Error(data.message || 'Failed to change password.');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 p-4 rounded-lg shadow-lg dark:bg-gray-800 dark:border-rose-700">
                <form className="space-y-6" onSubmit={handleClick}>
                    <h5 className="text-2xl font-semibold text-center">New password</h5>
                    <div>
                        <label htmlFor="newpassword" className="block mb-2 text-xl font-semibold">New password</label>
                        <input
                            type="password"
                            name="newpassword"
                            id="newpassword"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            value={newpassword}
                            onChange={(e) => setNewpassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmpassword" className="block mb-2 text-xl font-semibold">Confirm password</label>
                        <input
                            type="password"
                            name="confirmpassword"
                            id="confirmpassword"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
