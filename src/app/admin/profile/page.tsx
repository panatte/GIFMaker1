import Navbar from "@/components/Navbar-admin";
import Footer from "@/components/Footer";
import Logout from "@/components/logout";

export default function Admin() {
    return (
        <div>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-gray-200">
                <div className="grid bg-gray-500 m-[20px] p-14 w-[100rem] min-h-screen">
                    <div className="grid p-6">
                        <div className="flex row-span-1 justify-center m-auto">
                            <h1 className="text-5xl text-center"> Profile </h1>
                        </div>
                        <div className="flex flwx-col float-right mr-5 relative row-span-3">

                        </div>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Log out
                            </span>
                        </button>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};