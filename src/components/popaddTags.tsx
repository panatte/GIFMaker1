'use client';
import exp from "constants";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
const PopTag_ = ({ item, onclose }: { item: any, onclose: () => void }) => {
    const [tagid_, setTagid] = useState(item);
    const [tags, setTags] = useState('');

    const handleconfirm = async (statusconfirm: string) => {
        console.log('tagid_ : ', tagid_);

        try {
            // Show Swal while data is being sent
            Swal.fire({
                title: "Adding tag",
                text: "Please wait...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await fetch("/api/addTags", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tagid_, tags, statusconfirm }),
            });

            const data = await response.json();
            console.log(data);

            if (data.status === 200) {
                // Show Swal when tag addition is successful
                Swal.fire({
                    title: "Success!",
                    text: "Tag added successfully",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                }).then(() => {
                    onclose();
                });
            } else {
                // Show Swal when tag addition fails
                Swal.fire({
                    title: "Error",
                    text: data.message || "An error occurred",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error('Error:', error);
            // Show Swal when there is an error sending data
            Swal.fire({
                title: "Error",
                text: "Failed to add tag",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Add Tag</h1>
                {/* <label className="text-sm text-gray-600">Example add Tag ( tag-test1,tag-test2,... )</label> */}
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tag..."
                />

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onclose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg m-2 cursor-pointer hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => { handleconfirm('waiting') }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>

    )
}


export default PopTag_;