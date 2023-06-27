

import { useEffect, useState } from 'react';
import axios from 'axios';

const Jobs = () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState({
        frequency: '',
        asset: '',
        slippage: '',
        name: '',
    });

    useEffect(() => {
        async function fetchJobs() {
            const result = await axios.get(`${BACKEND_URL}/api/jobs`);
            setJobs(result.data);
        }

        fetchJobs();
    }, []);

    const handleDelete = async (_id) => {
        await axios.delete(`${BACKEND_URL}/api/jobs/${_id}`);
        setJobs(jobs.filter(job => job._id !== _id));
    };

    const handleInputChange = (event) => {
        setInput({...input, [event.target.name]: event.target.value });
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        const result = await axios.post(`${BACKEND_URL}/api/jobs`, input);
        setJobs([...jobs, result.data]);
        setInput({ frequency: '', asset: '', slippage: '', name: '' });
        setShowModal(false);
    };

  return (
        <div className="flex flex-col w-[70%] py-1 px-10 bg-secondary border-[1px] border-darkBlue rounded-lg shadow">
            <div className='flex pb-1 justify-between border-b-[1px] border-darkBlue -mx-10 px-10 text-xl font-semibold gap-4 mb-1'>
                <div className='w-[5%]'>Job</div>
                <div className='w-[5%]'>Name</div>
                <div className='w-[35%]'>Asset</div>
                <div className='w-[15%]'>Slippage</div>
                <div className='w-[20%]'>Frequency</div>
                <div className='w-[20%]'>Actions</div>
            </div>

            {jobs.map((job, index) => (
                <div key={index} className="flex justify-between font-semibold text-lg gap-4 py-0.5">
                    <div className='w-[5%]'>{index+1}.</div>
                    <div className='w-[5%]'>{job.data.name}</div>
                    <div className='w-[35%]'>{job.data.asset}</div>
                    <div className='w-[15%]'>{job.data.slippage}%</div>
                    <div className='w-[20%]'>{job.repeatInterval}</div>
                    <div className='w-[20%]'><button onClick={() => handleDelete(job._id)} className="text-white font-semibold rounded-lg text-base px-4 py-1 bg-red hover:bg-red">Remove</button></div>
                    
                </div>
            ))}
            <button onClick={() => setShowModal(true)} className="text-white font-semibold rounded-lg text-lg px-5 py-1 bg-blue-600 hover:bg-blue-700 w-fit ml-auto mt-32 mb-2">Add</button>
            
            {showModal && (
                <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md max-h-full rounded-lg shadow bg-gray-700">
                        <button type="button" onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <h3 className="px-8 pt-5 text-xl font-semibold text-white">Add Job</h3>
                        <form className='px-8 py-6 space-y-4' onSubmit={handleAdd}>
                                <input type="text" name="frequency" value={input.frequency} onChange={handleInputChange} placeholder="Frequency" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required />
                                <input type="text" name="name" value={input.name} onChange={handleInputChange} placeholder="Name" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required />
                                <input type="text" name="asset" value={input.asset} onChange={handleInputChange} placeholder="Asset" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required />
                                <input type="number" name="slippage" value={input.slippage} onChange={handleInputChange} placeholder="Slippage" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required />
                                <div className='flex justify-between pt-2'>
                                    <button type="submit" className="text-white font-semibold rounded-lg text-lg px-5 py-1 bg-blue-600 hover:bg-blue-700">Save</button>
                                    <button onClick={() => setShowModal(false)} className="text-white font-semibold rounded-lg text-lg px-5 py-1 bg-red hover:bg-[#c02230]">Cancel</button>
                                </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
  );
}

export default Jobs;
