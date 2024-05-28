'use client';
import React, { useState } from "react";
import Swal from 'sweetalert2';
const PopEdit = ({ item, onclose }: { item: any, onclose: () => void }) => {
    const [userid_, setUserid] = useState(item[0].UserID);
    const [username_, setUsername] = useState(item[0].Username);
    const [password_, setPassword] = useState(item[0].Password);
    const [role_, setRole] = useState(item[0].role);
    const [email_, setEmail] = useState(item[0].email);
    const [name_, setName] = useState(item[0].name);
    const [status_, setStatus] = useState(item[0].status);

    const handelSave = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to save this data?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            Swal.fire({
                title: 'loading...',
                willOpen: () => {
                    Swal.showLoading();
                },
                showConfirmButton: false, // Remove the "OK" button
            });
            const response = await fetch("/api/editData", {
                method: "POST",
                body: JSON.stringify({ userid_, username_, password_, role_, email_, name_, status_}),
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        Swal.fire(
                            'Saved!',
                            'Data has been saved.',
                            'success'
                        );
                        onclose();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Data failed to save.',
                            'error'
                        );
                    }
    
                })
                .catch((error) => {
                    Swal.fire(
                        'Error!',
                        'Data failed to save.',
                        'error'
                    )
                });
        }); 
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg w-[500px] shadow-lg">
          <h1 className="text-2xl font-bold mb-4">User Information</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                className="mt-1 block w-full h-10 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Username" 
                value={username_} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                className="mt-1 block w-full h-10 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Password" 
                value={password_} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input 
                type="text" 
                className="mt-1 block w-full h-10 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Role" 
                value={role_} 
                onChange={(e) => setRole(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                className="mt-1 block w-full h-10 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Email" 
                value={email_} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                className="mt-1 block w-full h-10 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Name" 
                value={name_} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input 
                type="text" 
                className="mt-1 block w-full h-10 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                placeholder="Status" 
                value={status_} 
                onChange={(e) => setStatus(e.target.value)} 
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button 
              onClick={handelSave} 
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
              Save
            </button>
            <button 
              onClick={onclose} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition">
              Close
            </button>
          </div>
        </div>
      </div>
      

    );
}

export default PopEdit;
