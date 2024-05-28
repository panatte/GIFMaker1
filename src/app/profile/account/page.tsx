"use client"
import Navbar from "@/components/Navbar-login";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { FaImage, FaCloudUploadAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";
import PopChangePass from "@/components/popChangePass";
import Popchangeimg from "@/components/popChangeimg";
import { set } from "animejs";
const AccountUser: React.FC = () => {
    const [profile, setProfile] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [activeButton, setActiveButton] = useState("portfolio");
    const [userid, setUserid] = useState("");
    const [data_, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [showimg, setShowimg] = useState(false);

    const handleClose = () => {
        setShow(false);
        setShowimg(false);
        window.location.reload();
        
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleShowimg = () => {
        setShowimg(true);
    }   

    useEffect(() => {
        const getProfile = async () => {
            fetch("/api/Checkcookies", {
                method: "POST",
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        if (data.data.path_profile !== 'null') {
                            setUserid(data.data.UserID);
                        } else {
                            setProfile("/images/profile.png");
                            setUserid(data.data.UserID);
                        }

                    }
                });
        }
        getProfile();
       
    }, [])

    useEffect(() => {
        const getDataprofile = async () => {
            Swal.fire({
                title: 'Loading...',
                allowOutsideClick: false,
                showConfirmButton: false,
            });
            fetch("/api/gDataprofile", {
                method: "POST",
                body: JSON.stringify({ userid: userid }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    if (data.data[0] !== undefined && data.data[0] !== '') {
                        const dataUsr = (data.data[0] as string).split("?");
                        setUsername(dataUsr[0]);
                        setPassword(dataUsr[1]);
                        setName(dataUsr[2]);
                        setEmail(dataUsr[3]);
                        setProfile(dataUsr[4]);
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                }
                Swal.close(); // ปิด Swal หลังจากโหลดข้อมูลเสร็จสมบูรณ์
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                Swal.close(); // ปิด Swal หากเกิด error
            });
        }
        getDataprofile();
    }, [userid])
    return (
        <div className="bg-gray-900 h-screen">
            <Navbar />
            <main className="flex flex-col items-center justify-between p-14">
                <div className="flex flex-col m-[20px] p-14 w-full rounded-md">
                    <div className="flex justify-center w-full ">
                        <div className="items-center bg-white rounded-lg shadow-lg w-8/12 h-full justify-center">
                            <h1 className="text-3xl font-semibold text-center text-white dark:text-gray-200 mb-8 bg-gray-800 w-full rounded-t-md p-4">
                                Account
                            </h1>
                            <div className="grid grid-cols-2 items-center p-6 mx-auto">
                                <div className="flex flex-col items-center justify-start">
                                    <img src={profile.split('=')[1]} alt="profile" className="w-[20rem] h-[20rem] rounded-md mb-4" />
                                    <button className="bg-rose-500 hover:bg-rose-700 font-semibold text-white py-4 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleShowimg}>Change Profile image</button>
                                </div>
                                <div className="ml-6 ">
                                    <div className="flex flex-col justify-start items-start">
                                        <h1 className="text-2xl font-semibold text-gray-800">Name: {name.split('=')[1]}</h1>
                                        <p className="text-gray-600 mt-2 text-gray-800">Username: {username}</p>
                                        <p className="text-gray-600 mt-1 text-gray-800">Password: {password.split('=')[1]}</p>
                                        <p className="text-gray-600 mt-1 text-gray-800">Email: {email.split('=')[1]}</p>
                                        <button className="mt-4 bg-rose-500 hover:bg-rose-700 font-semibold text-white py-4 px-4 rounded focus:outline-none focus:shadow-outline w-[15rem] justify-center item-center" onClick={handleShow}>Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {show && <PopChangePass onClose={handleClose} />}
                {showimg && <Popchangeimg onClose={handleClose} />}
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default AccountUser;