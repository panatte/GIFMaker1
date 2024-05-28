'use client';
import React from 'react';
import Swal from "sweetalert2";

const PManageReport = ({ item, handleClose }: { item: any, handleClose: () => void }) => {
    console.log('------------------------------------- imgggg',item);
    const handleApprove = () => {
        Swal.fire({
            title: 'Approve',
            text: 'Are you sure to approve this report?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'loading...',
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading()
                    },
                });
    
                fetch("/api/ApproveReport", {
                    method: "POST",
                    body: JSON.stringify({
                        img_id: item[0].img_ID,
                        comp_id: item[0].compID,
                    }),
                }).then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        handleClose();
                        window.location.reload();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error approve report status 500',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            }
        });
    }
    

    const handleNotApprove = () => {
        Swal.fire({
            title: 'Delete report',
            text: 'Are you sure to delete this report?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'loading...',
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading()
                    },
                });
    
                fetch("/api/NotApproveReport", {
                    method: "POST",
                    body: JSON.stringify({
                        comp_id: item[0].compID,
                    }),
                }).then((res) => res.json())
                .then((data) => {
                    if (data.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        handleClose();
                        window.location.reload();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error approve report status 500',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            }
        });

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <div className="text-4xl font-semibold mb-4 text-center">
                    Report
                </div>
                <div className="mb-4 text-xl text-center">
                    <div className="flex justify-center mb-4">
                        <img src={item[0].path_img} alt="img" className="w-1/2 h-1/2 object-contain" />
                    </div>
                    <div className="text-2xl font-semibold mb-2">
                        Details
                    </div>
                    <p>
                        {item ? item[0].detail : "No data available"}
                    </p>
                </div>
                <div className="flex justify-end mt-10 mr-4">
                    <button
                        onClick={handleApprove}
                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer mr-4"
                    >
                        Approve
                    </button>
                    <button
                        onClick={handleNotApprove}
                        className="bg-rose-500 hover:bg-rose-700 text-white px-4 py-2 rounded-lg cursor-pointer mr-4 "
                    >
                        Not approved
                    </button>
                    <button
                        onClick={handleClose}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
            
        </div>

    );
}

export default PManageReport;
