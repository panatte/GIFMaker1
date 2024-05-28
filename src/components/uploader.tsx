'use client';

import { useState } from 'react';
import axios from 'axios';
import ShowTags from './tags';
import Swal from 'sweetalert2';

interface CheckedItems {
    [key: string]: boolean;
}

export default function UploadFile() {

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event : any) => {
        setIsChecked(event.target.checked);
    };
    const handleChangeCheckedItems = (updateFunction: (prevState: CheckedItems) => CheckedItems) => {
        setCheckedItems((prevState) => updateFunction(prevState));
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setName(event.target.value);
    }

    const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleImageUpload = async () => {
        setUploading(true);
        const selectedKeys: string[] = Object.keys(checkedItems).filter(key => checkedItems[key]);
        if (!isChecked) {
            Swal.fire({
                title: "Error",
                text: "Please agree to the terms and conditions",
                icon: "error",
                confirmButtonText: "OK",
            });
            setUploading(false);
            return;
        }
        if (selectedImage)
            if (selectedImage && selectedFile) {
                try {
                    const formData = new FormData();
                    formData.set('image', selectedFile);
                    formData.set('name', name);
                    formData.set('description', description);
                    formData.set('tag', selectedKeys.toString());

                    Swal.fire({
                        title: "Uploading",
                        text: "Please wait...",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });

                    const { data } = await axios.post('/api/upload', formData);

                    if (data.status === 200) {
                        Swal.fire({
                            title: "Success!",
                            text: "File uploaded successfully",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        });
                        setSelectedImage("");
                        setSelectedFile(undefined);
                        setName("");
                        setDescription("");
                        setCheckedItems({});
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Failed to upload file",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to upload file",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                } finally {
                    setUploading(false);
                }
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No image selected",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                setUploading(false);
            }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        const maxSizeInMB = 4;
        if (file && file.size > maxSizeInMB * 1048576) { // คำนวณขนาดไฟล์ในเมกะไบต์และตรวจสอบว่ามีขนาดเกิน 4 MB หรือไม่
            Swal.fire({
                title: "Error",
                text: "File size limit is 4.00MB",
                icon: "error",
                confirmButtonText: "OK",
            });
            // แสดงแจ้งเตือนถ้าขนาดไฟล์เกิน 4 MB
            event.target.value = ''; // เคลียร์ค่าไฟล์ที่เลือกเพื่อให้ผู้ใช้สามารถเลือกไฟล์ใหม่ได้
            return;
        }
        setSelectedImage(file ? URL.createObjectURL(file) : "");
        setSelectedFile(file || undefined);
    };

    return (
        <div className="flex">
            <div className="flex flex-col items-center justify-center bg-gray-800 p-5" style={{ flex: "0.3" }}>
                <div className="flex flex-col items-center justify-center row-1 col-1 bg-gray-800 p-5">
                    <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-[52rem] h-[42rem] border-2 border-gray-800 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {selectedImage && (
                                <img src={selectedImage} alt="Selected Image" className="object-contain object-center w-full h-full" />
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-2xl text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xl text-gray-500 dark:text-gray-400">GIF file ( File size limit: 4.00MB  )</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept=".gif" onChange={handleImageChange} />
                    </label>
                </div>
            </div>
            <div className="flex flex-col bg-gray-800 p-5" style={{ flex: "1" }}>
                <div className="row-start-1 col-start-2 bg-gray-800 p-5">
                    <div className="mb-6 m-2">
                        <label htmlFor="default-input" className="block mb-2 text-white text-2xl font-semibold dark:text-white">Name</label>
                        <input value={name} onChange={handleNameChange} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-6 m-2">
                        <ShowTags setCheckedItems={handleChangeCheckedItems} />
                    </div>
                    <div className="mb-6 m-2">
                        <label htmlFor="message" className="block mb-2 text-white text-2xl font-semibold dark:text-white">Description</label>
                        <textarea value={description} onChange={handleDescChange} id="message" rows={4} className="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 h-[205px] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                </div>
                <div className="flex justify-start row-start-2 col-start-2 bg-gray-800 p-5 text-xl">
                    <input
                        type="checkbox"
                        className="mr-2 text-rose-500 dark:text-rose-500 focus:ring-rose-500 dark:focus:ring-rose-500"
                        checked={isChecked} // กำหนดค่า checked ของ checkbox ด้วยค่าของ state isChecked
                        onChange={handleCheckboxChange} // เมื่อมีการเปลี่ยนแปลงค่าของ checkbox ให้เรียกใช้ฟังก์ชั่น handleCheckboxChange
                    />
                    <span className="text-white">I agree that I have read, understood and agree to the <a href="https://creativecommons.org/licenses/by/4.0/" className="text-white dark:text-rose-500 hover:underline hover:text-rose-500"> Creative Commons Attribution 4.0 International License (CC BY 4.0) terms and conditions.</a></span>
                </div>
                <div className="flex items-center justify-center row-start-2 col-start-2 bg-gray-800 p-5">
                    <button onClick={handleImageUpload} disabled={uploading} className="bg-rose-500 hover:bg-rose-700 text-white font-semibold text-3xl py-2 px-4 rounded mt-3 mr-4 w-[250px]">
                        {uploading ? 'Uploading.. ' : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
}
