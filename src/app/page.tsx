'use client';

import toast from 'react-hot-toast';
import { useDisconnect } from 'wagmi';

export default function Page() {
    const { disconnect } = useDisconnect();
    async function checkAuth() {
        try {
            const res = await fetch('api/auth', { credentials: 'include' });
            if (res.status === 200) {
                toast.success('Authorized');
            } else throw new Error('Not authorized');
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Unknown error');
        }
    }
    async function signout() {
        try {
            const res = await fetch('api/auth/signout', { credentials: 'include' });
            if (res.status === 200) {
                disconnect();
                toast.success('Signed out');
            } else throw new Error('Could not sign out');
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Unknown error');
        }
    }

    return (
        <div className="my-10 flex h-16 flex-col items-center justify-center gap-6 ">
            First page
            <button onClick={checkAuth} className=" rounded-lg bg-blue-500 px-6 py-3 text-white">
                Check Auth
            </button>
            <button onClick={signout} className=" rounded-lg bg-blue-500 px-6 py-3 text-white">
                Signout
            </button>
        </div>
    );
}
