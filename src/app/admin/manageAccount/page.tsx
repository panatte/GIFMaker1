'use client';
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar-admin";
import Footer from "@/components/Footer";
import PopEdit from "@/components/popupEdit";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Admin = () => {
    const [table, setTable] = useState<any[]>([]);
    const [showPopUp, setShowPopUp] = useState('');
    const [datauser, setDatauser] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            MySwal.fire({
                title: 'Loading...',
                showConfirmButton: false,
                willOpen: () => {
                    MySwal.showLoading()
                },
            });
            try {
                const response = await fetch("/api/showUser", {
                    method: "POST",
                });
                const data = await response.json();

                if (data.status === 200) {
                    setTable(data.tableUser);
                    MySwal.fire({
                        icon: 'success',
                        title: 'Success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error show user status 500',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        };

        fetchData();
    }, []);

    const handleEdit = (item: any) => {
        setShowPopUp('true');
        setDatauser([item]);
    }

    const handleClose = () => {
        setShowPopUp('');
    };

    return (
        <div>
            <Navbar />
            <main className="flex-col items-center justify-between p-10 bg-gray-900 ">
                <div className="flex flex-col bg-gray-800 m-[20px] p-14 w-[80rem] rounded-md">
                    <div className="p-6">
                        <div className="flex justify-center">
                            <h1 className="text-5xl font-semibold text-white m-5">Manage Account</h1>
                        </div>
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Username
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Password
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Change
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.Username}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.Password}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.status}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a onClick={() => handleEdit(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showPopUp === 'true' ? <PopEdit item={datauser} onclose={handleClose} /> : null}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Admin;
