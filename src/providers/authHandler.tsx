'use client';
import { useWeb3ModalEvents } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { useRouter } from 'next/navigation';
import { SiweMessage } from 'siwe';
import { SignMessageArgs } from 'wagmi/actions';
import { useEffect } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
const backend = process.env.NEXT_PUBLIC_ADMIN_BACKEND_URL;
const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
const ALLOWED_ADMINS = process.env.NEXT_PUBLIC_ALLOWED_ADMINS;

async function createSiweMessage(address: `0x${string}` | undefined, statement: string) {
    const domain = window.location.host;
    const origin = window.location.origin;
    try {
        if (!chainId || isNaN(chainId)) throw new Error('Valid Chain ID is missing current environment.');
        if (!address || !statement) throw new Error('Parameters are missing: Address and statement are required.');

        const res = await fetch(`${backend}/auth/nonce`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address }),
            credentials: 'include',
        });
        if (res.status === 200) {
            const nonce = await res.text();

            const message = new SiweMessage({
                domain,
                address,
                statement,
                uri: origin,
                version: '1',
                chainId,
                nonce,
            });
            return message.prepareMessage();
        } else throw new Error('Could not get nonce');
    } catch (e) {
        console.error(e instanceof Error ? e.message : 'Unknown error');
    }
}

async function signInWithEthereum(
    address: `0x${string}` | undefined,
    signMessage: (args?: SignMessageArgs | undefined) => void
) {
    try {
        const message = await createSiweMessage(address, 'Sign in with Ethereum to the app.');
        if (!message) throw new Error('Siwe message creation is failed');

        const signature = await signMessage({ message });

        const res = await fetch(`${backend}/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature, address }),
            credentials: 'include',
        });
        const data = await res.text();

        return !!data;
    } catch (e) {
        console.error(e instanceof Error ? e.message : 'Unknown error');
    }
}

interface onConnectProps {
    address?: `0x${string}`;
    signMessageAsync: (args?: SignMessageArgs | undefined) => Promise<`0x${string}`>;
    router: AppRouterInstance;
}
export async function onConnect({ address, signMessageAsync, router }: onConnectProps) {
    const isAdmin = ALLOWED_ADMINS?.split(',').find((_address) => _address === address);
    if (isAdmin) {
        try {
            const res = await signInWithEthereum(address, signMessageAsync);
            if (res) {
                router.push('/admin/requests');
            }
        } catch (e) {
            console.error(e instanceof Error ? e.message : 'Unknown');
            router.push('/admin/not-authorized');
        }
    } else {
        router.push('/admin/not-authorized');
    }
}
interface onDisconnectProps {
    router: AppRouterInstance;
}
async function onDisconnect({ router }: onDisconnectProps) {
    const res = await fetch(backend + '/auth/signout', {
        credentials: 'include',
    });
    const data = await res.text();
    router.push('/admin');
}

export default function AuthHandler() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { signMessageAsync, isError } = useSignMessage();
    const router = useRouter();
    const { data } = useWeb3ModalEvents();

    // useEffect(() => {
    //     async function checkAuth() {
    //         try {
    //             const res = await fetch(backend + '/auth/', {
    //                 credentials: 'include',
    //             });
    //             if (res.status !== 200) {
    //                 throw new Error('Not authorized');
    //             }
    //         } catch (e) {
    //             console.error(e instanceof Error ? e.message : 'Unknown error');
    //         }
    //     }

    //     checkAuth();
    // }, [router]);

    useEffect(() => {
        switch (data.event) {
            case 'CONNECT_SUCCESS':
                onConnect({ address, router, signMessageAsync });
                break;
            case 'DISCONNECT_SUCCESS':
                onDisconnect({ router });
                break;
            default:
                break;
        }
    }, [data.event, address, router, signMessageAsync]);

    useEffect(() => {
        if (isError) {
            disconnect();
        }
    }, [isError, disconnect]);

    return null;
}
