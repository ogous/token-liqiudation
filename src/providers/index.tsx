'use client';
import AuthHandler from './authHandler';
import Walletconnect from './walletconnect';
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Walletconnect>
            <AuthHandler />
            {children}
        </Walletconnect>
    );
}
