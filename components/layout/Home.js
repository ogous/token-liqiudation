import Head from 'next/head';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import Assets from '../layout/Assets';
import Jobs from '../layout/Jobs';

const Home = () => {
    const { safe } = useSafeAppsSDK();

    return (
            <div className='font-SSP relative text-white bg-primary min-h-screen'>
                <Head>
                    <title>Token Liquidation Tool</title>
                </Head>

                <div className="flex flex-col py-2 px-4">
                    
                    <header className="flex justify-between items-center text-2xl font-semibold">
                        <h1>Faculty Group</h1>
                        <button type="button" className="font-semibold rounded-lg px-6 py-1.5 text-lg text-center inline-flex items-center bg-gray-800 border border-gray-700 text-white hover:bg-gray-700">
                            {safe.safeAddress ? `${safe.safeAddress.slice(0,6)}...${safe.safeAddress.slice(-5)}` : "Connect Wallet"}
                        </button>
                    </header>

                    <hr className='border-darkBlue mt-2 -mx-4' />

                    <div className="flex my-4 gap-5">
                        <Assets />
                        <Jobs />
                    </div>
                </div>

            </div>
    );
};

export default Home;
