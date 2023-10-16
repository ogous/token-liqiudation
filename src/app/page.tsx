'use client';

import toast from 'react-hot-toast';

export default function Page() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

    async function checkAuth() {
        try {
            const res = await fetch(backend + '/auth');
            if (res.status === 200) {
                toast.success('Authorized');
            } else toast.error('Not authorized');
        } catch (e) {}
    }

    return (
        <div className="flex h-16 flex-col items-center justify-center gap-6">
            First page
            <button onClick={checkAuth} className=" rounded-lg bg-blue-500 px-6 py-3 text-white">
                Check Auth
            </button>
        </div>
    );
}
