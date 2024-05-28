'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Swal from 'sweetalert2';
import NewPassword from '@/components/popForgotNewPassword';
function Login() {
    const [email, setEmail] = useState("");
    const [data, setData] = useState({} as any);
    const [showpop, setShowpop] = useState(false);
    const [userID , setUserID] = useState(0);

    const handleClose = () => {
        setShowpop(false);
    };

    const handleClick = async (e : any) => {
        try {
            Swal.fire({
                title: 'Sending email...',
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            e.preventDefault();
            // ส่งค่าอีเมลไปยังฝั่งเซิร์ฟเวอร์
            const response = await fetch("/api/checkEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            console.log(data.data.UserID);
            if (response.status === 200) {
                setData(data);
                Swal.close();
                setShowpop(true);
                setUserID(data.data.UserID);
            } else {
                throw new Error(data.message); // โยนข้อผิดพลาดในกรณีที่เซิร์ฟเวอร์ส่งข้อความผิดพลาดกลับมา
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Email is invalid',
                text: (error as Error).message || 'Invalid email. Please enter again.',
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
                            <label htmlFor="email" className="block mb-2 text-xl font-semibold text-white dark:text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                {showpop && <NewPassword userid={userID} onclose={handleClose}/>}
            </div>
        </div>
    );
}

export default Login;
