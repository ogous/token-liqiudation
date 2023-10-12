'use client';
import Walletconnect from './walletconnect';
export default function Providers({ children }: { children: React.ReactNode }) {
    return <Walletconnect>{children}</Walletconnect>;
}
