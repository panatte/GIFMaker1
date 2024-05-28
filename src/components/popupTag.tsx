'use client';
import { set } from "animejs";
import exp from "constants";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const PopTag = ({ item, onclose }: { item: any, onclose: () => void }) => {

    const [tagid_, setTagid] = useState(item[0].tagID); 

    const handleconfirm = async (statusconfirm: string) => {
        Swal.fire({
            title: "Adding tag",
            text: "Please wait...",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        await fetch("/api/manageTag", {
            method: "POST",
            body: JSON.stringify({tagid_, statusconfirm}),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === 200) {
                    Swal.fire({
                        title: "Success!",
                        text: "Tag added successfully",
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    }).then(() => {
                        onclose();
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Tag already exists",
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    }).then(() => {
                        onclose();
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const handleDelete = async (statusdelete: string) => {
        Swal.fire({
            title: "Deleting tag",
            text: "Please wait...",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        await fetch("/api/deleteTag", {
            method: "POST",
            body: JSON.stringify({tagid_, statusdelete}),
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === 200) {
                    Swal.fire({
                        title: "Success!",
                        text: "Tag deleted successfully",
                        icon: "success",
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    }).then(() => {
                        onclose();
                    });
                } else {
                    console.log('data.message : ', data.message);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <div className="text-2xl font-semibold">
                    Tag : {item[0].tagName}
                </div>
                <button onClick={onclose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer">Close</button>
                <button onClick={() => {handleDelete('inactive')}} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer">Delete</button>
                <button onClick={() => {handleconfirm('active')}} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg m-2 cursor-pointer">Confirm</button>
            </div>
        </div>
    )
}

export default PopTag;