import './global.css';
import Providers from '@/providers';
import { Toaster } from 'react-hot-toast';

function Button() {
    return <w3m-button />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Button />
                    {children}
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
