
'use client';
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar-admin";
import Footer from "@/components/Footer";
import PopTag from "@/components/popupTag";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Admin = () => {
    const [table, setTable] = useState<any[]>([]);
    const [showPopUp, setShowPopUp] = useState('');
    const [tagdata, setTagData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                MySwal.fire({
                    title: "Loading...",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    },
                  });

                const response = await fetch("/api/showTag", {
                    method: "POST",
                });
                const data = await response.json();

                if (data.status === 200) {
                    Swal.fire({
                        title: "Success!",
                        text: "Data loaded successfully",
                        icon: "success",
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    setTable(data.tableTag);

                } else {
                    Swal.fire({
                        title: "Error",
                        text: data.message || "An error occurred",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        };

        fetchData();
    }, []);

    const usetagState = () => {
        return { showPopUp, setShowPopUp, tagdata, setTagData };
    }

    const handleConfirm = (item: any) => {
        const { showPopUp, setShowPopUp, tagdata, setTagData } = usetagState();
        setShowPopUp('true');
        setTagData([item]);
    }

    const handleClose = () => {
        setShowPopUp('');
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <main className="flex flex-col items-center justify-between p-14">
                <div className="flex flex-col bg-gray-800 m-[20px] p-14 w-full rounded-mg">
                    <div className="p-6">
                        <div className="flex justify-center">
                            <h1 className="text-5xl text-center text-white font-semibold m-5">Tag Edit</h1>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Tag ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Tag Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            User ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {table.map((item: any) => (
                                        <tr key={item.tagID} className="bg-gray-100 dark:bg-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100 ">{item.tagID}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">{item.tagName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">{item.status}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">{item.UserID}</div>
                                            </td>
                                            <td className="whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">
                                                    <button onClick={() => handleConfirm(item)} className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded">Confirm</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showPopUp && <PopTag item={tagdata} onclose={handleClose} />}
                </div>
            </main>
        </div>
    );
};

export default Admin;