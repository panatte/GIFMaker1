import { cookies } from 'next/headers'

export default function Logout() {
    const cookieStorage = cookies();
    const cookie = cookieStorage.get('token');
    const clearCookie = () => {
        // ตั้งค่าค่าของ cookie 'token' ให้หมดอายุ
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = "/";
    }
    if (cookie) {
        clearCookie();
    } else {
        window.location.href = "/";
    }
}
