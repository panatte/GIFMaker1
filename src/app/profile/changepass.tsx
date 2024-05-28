/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import Swal from "sweetalert2";

function changepass() {
  const newpassword = document.getElementById(
    "newpassword"
  ) as HTMLInputElement;
  const confirmpassword = document.getElementById(
    "confirmpassword"
  ) as HTMLInputElement;

  if (newpassword.value === "" || confirmpassword.value === "") {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกข้อมูลให้ครบ",
    });
    return;
  }

  if (newpassword.value !== confirmpassword.value) {
    Swal.fire({
      icon: "error",
      title: "รหัสผ่านใหม่ไม่ตรงกัน",
    });
    return;
  }

  axios
    .post("/api/changepass", {
      newpassword: newpassword.value,
    })
    .then((res) => {
      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "เปลียนรหัสผ่านสำเร็จ",
        });
        newpassword.value = "";
        confirmpassword.value = "";
      } else {
        Swal.fire({
          icon: "error",
          title: "เปลียนรหัสผ่านไม่สำเร็จ",
        });
      }
    });
}

const Changepass: React.FC = () => {
  return (
    <div className="flex flex-col items-center  bg-indigo-900 rounded-md min-h-screen">
      <div className="mt-10 text-3xl font-bold text-center text-gray-800">Change Password</div>
      <div className="flex flex-col w-full max-w-md mt-10 space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col">
          <label htmlFor="newpassword" className="text-lg font-medium text-gray-700 m-1">
            New Password
          </label>
          <input
            type="password"
            id="newpassword"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmpassword" className="text-lg font-medium text-gray-700 m-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmpassword"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={changepass}
          >
            Save
          </button>
        </div>
      </div>
    </div>



  );
};

export default Changepass;
