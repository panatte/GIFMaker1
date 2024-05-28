
export default function Footer() {
    return (
        <footer className="bg-indigo-800 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">GIFMaker</span>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">GIFMaker</a>. All Rights Reserved.
                    </span>
                    <span className="text-sm text-white sm:text-center dark:text-gray-400">
                        Except where otherwise noted, content on this site is licensed under a&nbsp;
                        <b><a href="https://creativecommons.org/licenses/by/4.0/" className="hover:underline" target="_blank" rel="noopener noreferrer">Creative Commons Attribution 4.0 International License</a>.</b>
                    </span>
                </div>
            </div>
        </footer>
    )
}
