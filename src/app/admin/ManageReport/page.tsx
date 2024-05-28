'use client';
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar-admin";
import Footer from "@/components/Footer";
import PManageReport from "@/components/popManageReport";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Admin = () => {
    const [table, setTable] = useState<any[]>([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [datauser, setDatauser] = useState<any[]>([]);
    const [getCompID, setCompID] = useState("");
    useEffect(() => {
        MySwal.fire({
            title: 'Loading...',
            showConfirmButton: false,
            willOpen: () => {
                MySwal.showLoading()
            },
        });
        const fetchData = async () => {
            try {
                const response = await fetch("/api/showReport", {
                    method: "POST",
                });
                const data = await response.json();

                if (data.status === 200) {     
                    setTable(data.tablecomp);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error show report status 500',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 1500
                });    
            }
        };

        fetchData();
    }, []);

    const handlecheck = (item: any) => {
        setShowPopUp(true);
        setDatauser([item]);
    }

    const handleClose = () => {
        setShowPopUp(false);
    };

    return (
        <div className="bg-gray-900 h-screen">
            <Navbar />
            <main className="flex flex-col items-center justify-between p-14">
                <div className="flex flex-col bg-gray-800 m-[20px] p-14 w-full rounded-lg">
                    <div className="p-6">
                        <div className="flex justify-center">
                            <h1 className="text-5xl text-center text-white font-semibold m-5">Manage Report</h1>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                        
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Complain ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Image ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            User ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            TimeStamp
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Detail
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-2xl">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.map((item, index) => (
                                        <tr key={index} className="bg-gray-100 dark:bg-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">{item.compID}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">{item.img_ID}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">{item.UserID}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">{item.Timestamp}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-xl text-gray-900 dark:text-gray-100">
                                                    {item.detail.length > 20 ? `${item.detail.substring(0, 20)}...` : item.detail}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a onClick={() => handlecheck(item)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer text-xl">examine</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showPopUp && <PManageReport item={datauser} handleClose={handleClose} />}
                </div>
            </main>
        </div>
    );
};

export default Admin;
