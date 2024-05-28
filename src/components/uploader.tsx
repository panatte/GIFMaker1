//app/components/uploader.tsx
'use '
import { useState, useEffect } from 'react';
import axios from 'axios';
import fetch from 'node-fetch';
import { set } from 'animejs';
import ShowTags from './tags';
import { cookies } from 'next/headers'
import Swal from 'sweetalert2';
interface CheckedItems {
    [key: string]: boolean;
}


export default function UploadFile() {

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSetSelectedFile] = useState<File>();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState<string[]>([]);
    // const [userID, setUserID] = useState<getUserid>({ UserID: 0});
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    const handleChangeCheckedItems = (items: CheckedItems) => {
        setCheckedItems(items);
    };

    const handleNamechange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log('name : ', name);
    }

    const handleDescchange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        console.log('description : ', description);
    };



    const handleImageUpload = async () => {
        const checkedItemsText = JSON.stringify(checkedItems);
        const selectedKeys: string[] = [];
        for (const key in checkedItems) {
            if (checkedItems.hasOwnProperty(key)) {
                const value = checkedItems[key];
                if (value) {
                    selectedKeys.push(key); // เพิ่ม tag ใหม่เข้าไปใน array
                    console.log(`Key: ${key}, Value: ${value}`);
                }
            }
        }

        // อัปเดต state ด้วยการรวม array เดิมและ array ใหม่
        setUploading(true);
        if (selectedImage && selectedFile) {
            try {
                const formData = new FormData();
                formData.set('image', selectedFile);
                formData.set('name', name);
                formData.set('description', description);
                formData.set('tag', selectedKeys.toString());
                if (!formData.has('image')) {
                    console.log('No image selected');
                    setUploading(false);
                    Swal.fire({
                        title: "Error",
                        text: "No image selected",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                } else {
                    console.log('image for formData : ', formData.get('image'));
                }
                console.log('formData client : ', formData);
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
                console.log('data : ', data);
                if (data.status === 200) {
                    console.log('File uploaded successfully');
                    Swal.fire({
                        title: "Success!",
                        text: "File uploaded successfully",
                        icon: "success",
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    setSelectedImage("");
                    setSetSelectedFile(undefined);
                    setName("");
                    setDescription("");
                    setCheckedItems({});
                } else {
                    console.log('Error uploading file');
                    Swal.fire({
                        title: "Error",
                        text: "Failed to upload file",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
                setUploading(false);
                // Handle success
            } catch (error) {
                console.error('Error uploading file:', error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to upload file",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                setUploading(false);
                // Handle error
            }
        } else {
            console.log('No image selected');
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
        const file = event.target.files?.[0] || null; // Ensure file is either File or null
        console.log('file : ', file);
        setSelectedImage(file ? URL.createObjectURL(file) : ""); // Add type assertion to ensure file is not null
        setSetSelectedFile(file || undefined); // Update to handle null case
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
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">GIF file (MAX. 200x200px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept=".gif" onChange={handleImageChange} />
                    </label>

                </div>
            </div>
            <div className="flex flex-col bg-gray-800 p-5" style={{ flex: "1" }}>
                <div className=" row-start-1 col-start-2 bg-gray-800 p-5">
                    <div className="mb-6 m-2">
                        <label htmlFor="default-input" className="block mb-2 text-white text-2xl font-semibold dark:text-white">Name</label>
                        <input value={name} onChange={handleNamechange} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-6 m-2">
                        <ShowTags setCheckedItems={handleChangeCheckedItems} />
                    </div>
                    <div className="mb-6 m-2">

                        <label htmlFor="message" className="block mb-2 text-white text-2xl font-semibold dark:text-white dark:text-white">Description</label>
                        <textarea value={description} onChange={handleDescchange} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 h-[205px] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                    </div>

                </div>
                <div className="flex items-center justify-center row-start-2 col-start-2 bg-gray-800 p-5">
                    <button onClick={handleImageUpload} disabled={uploading} className="bg-rose-500 hover:bg-rose-700 text-white font-semibold text-3xl py-2 px-4 rounded mt-3 mr-4 w-[250px]">
                        {uploading ? 'Uploading.. ' : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
} // Add closing parenthesis here

