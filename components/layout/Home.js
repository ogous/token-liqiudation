import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

const Home = () => {

    return (
        <div className='font-SSP relative text-white bg-primary'>
            <Head>
                <title>Token Liquidation Tool</title>
            </Head>

            <div className="flex flex-col py-2 px-4">
                
                <header className="flex justify-between items-center text-2xl font-semibold">
                    <h1>Faculty Group</h1>
                    <button className="bg-secondary py-1 px-4 border-[1px] border-darkBlue rounded-lg">{"Connect Wallet"}</button>
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


function Assets() {
    //   const [assets, setAssets] = useState([]);
    //   const endpoint = 'https://www.quicknode.com/token-api';

    //   useEffect(() => {
    //     async function fetchAssets() {
    //       const result = await axios.get(endpoint);
    //       setAssets(result.data);
    //     }
        
    //     fetchAssets();
    //   }, []);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const assets = [
        {
            symbol: 'DAI',
            allowance: 10000
        },
        {
            symbol: 'USDC',
            allowance: 100000
        },
        {
            symbol: 'USDT',
            allowance: 1000000
        },
    ]

  return (
    <div className="w-[30%] py-1 px-10 bg-secondary border-[1px] border-darkBlue">

      <div className='flex pb-1 justify-between border-b-[1px] border-darkBlue -mx-10 px-10 text-xl font-semibold gap-4 mb-1'>
          <div className='w-[20%]'>Asset</div>
          <div className='text-right w-[40%]'>Allowance</div>
          <div className='text-right w-[40%]'>Actions</div>
      </div>

      {assets.map((asset, index) => (
        <div key={index} className="flex justify-between font-semibold text-lg gap-4 py-0.5">
          <div className='w-[20%]'>{asset.symbol}</div>
          <div className='text-right w-[40%]'>{numberWithCommas(asset.allowance)}</div>
          <div className='text-right w-[40%]'><button onClick={() => null} className="bg-yellow border-[1px] border-yellow2 px-3 rounded text-base">Add</button></div>
        </div>
      ))}
    </div>
  );
}

function Jobs() {
    //   const [jobs, setJobs] = useState([]);
    //   const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    //   useEffect(() => {
    //     async function fetchJobs() {
    //       const result = await axios.get(`${BACKEND_URL}/api/jobs`);
    //       setJobs(result.data);
    //     }
        
    //     fetchJobs();
    //   }, []);

    //   const handleDelete = async (id) => {
    //     await axios.delete(`${BACKEND_URL}/api/jobs/${id}`);
    //     setJobs(jobs.filter(job => job.id !== id));
    //   };

    //   const handleAdd = async (job) => {
    //   };

    const jobs = [
        {
            id: 1,
            asset: 'DAI',
            slippage: 2,
            frequency: 'Every 4 hours'
        },
        {
            id: 2,
            asset: 'USDC',
            slippage: 0.5,
            frequency: 'Every 15 minutes'
        },
        {
            id: 3,
            asset: 'USDT',
            slippage: 1,
            frequency: 'Every 8 hours'
        },
    ]

  return (
        <div className="flex flex-col w-[70%] py-1 px-10 bg-secondary border-[1px] border-darkBlue">
            <div className='flex pb-1 justify-between border-b-[1px] border-darkBlue -mx-10 px-10 text-xl font-semibold gap-4 mb-1 [&>*]:w-1/5'>
                <div>Job</div>
                <div>Asset</div>
                <div>Slippage</div>
                <div>Frequency</div>
                <div>Actions</div>
            </div>

            {jobs.map((job, index) => (
                <div key={index} className="flex justify-between font-semibold text-lg gap-4 py-0.5 [&>*]:w-1/5">
                    <div>{job.id}.</div>
                    <div>{job.asset}</div>
                    <div>{job.slippage}%</div>
                    <div>{job.frequency}</div>
                    <div><button onClick={() => null} className="bg-red px-3 rounded text-base">Remove</button></div>
                </div>
            ))}
            <button onClick={() => null} className="bg-yellow border-[1px] border-yellow2 px-5 rounded text-base font-semibold w-fit ml-auto mt-32 mb-2">Add</button>
        </div>
  );
}