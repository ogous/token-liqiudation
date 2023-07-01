
import { useEffect, useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import Web3 from 'web3';
import { ERC20_ABI } from '../config/constants';

const Assets = () => {
    const BACKEND_WALLET = process.env.NEXT_PUBLIC_BACKEND_WALLET;
    const INFURA_LINK = process.env.NEXT_PUBLIC_INFURA_LINK;
    const { sdk, safe } = useSafeAppsSDK();
    const [assets, setAssets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [allowanceInput, setAllowanceInput] = useState("");
    const [selectedAsset, setSelectedAsset] = useState(null);

    const web3 = new Web3(INFURA_LINK);

    useEffect(() => {
        fetchAssets();
    }, [sdk, safe]);

    async function fetchAssets() {
        const tokensData = await sdk.safe.experimental_getBalances({ currency: 'USD' });
        const filteredItems = tokensData.items.filter(
            item => item.tokenInfo.address !== '0x0000000000000000000000000000000000000000'
        );
        const formattedAssets = await Promise.all(
            filteredItems.map(async item => {
                try {
                    const contract = new web3.eth.Contract(ERC20_ABI, item.tokenInfo.address);
                    const decimals = await contract.methods.decimals().call();
                    const balanceBN = web3.utils.toBN(item.balance);
                    const decimalsBN = web3.utils.toBN(10).pow(web3.utils.toBN(decimals));
                    const balanceInTokens = balanceBN.div(decimalsBN).toString();
                    return {
                        symbol: item.tokenInfo.symbol,
                        balance: balanceInTokens,
                        address: item.tokenInfo.address,
                    };
                } catch (error) {
                    console.error(`Failed to process asset ${item.tokenInfo.symbol} at address ${item.tokenInfo.address}: ${error}`);
                    return null;
                }
            })
        ).then(assets => assets.filter(asset => asset !== null));
    
        if (safe.safeAddress){
            for (const asset of formattedAssets) {
                try {
                    const contract = new web3.eth.Contract(ERC20_ABI, asset.address);
                    const allowance = await contract.methods.allowance(safe.safeAddress, BACKEND_WALLET).call();
                    asset.allowance = Number(web3.utils.fromWei(allowance, 'ether'));
                } catch (error) {
                    console.error(`Failed to process allowance for asset ${asset.symbol} at address ${asset.address}: ${error}`);
                }
            }
        }
        setAssets(formattedAssets);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleAdd = async (asset) => {
        setSelectedAsset(asset);
        setShowModal(true);
    };

    const handleModalSubmit = async () => {
        const allowanceInWei = web3.utils.toWei(allowanceInput, 'ether');
        const contract = new web3.eth.Contract(ERC20_ABI, selectedAsset.address);

        const txs = [
            {
                to: selectedAsset.address,
                value: 0,
                data: contract.methods.approve(BACKEND_WALLET, allowanceInWei).encodeABI(),
            },
        ];

        const params = {
            safeTxGas: 500000,
        };

        try {
            const txsResponse = await sdk.txs.send({ txs, params });
            // console.log(txsResponse);
        } catch (err) {
            console.error(err.message);
        }
        
        setShowModal(false);
        setAllowanceInput("");
        fetchAssets();
    };

  return (
    <div className="w-[30%] py-1 px-10 bg-secondary border-[1px] border-darkBlue rounded-lg shadow">

        <div className='flex pb-1 justify-between border-b-[1px] border-darkBlue -mx-10 px-10 text-xl font-semibold gap-4 mb-1'>
            <div className='w-[20%]'>Asset</div>
            <div className='text-right w-[40%]'>Allowance</div>
            <div className='text-right w-[40%]'>Actions</div>
        </div>

        {assets.map((asset, index) => (
        <div key={index} className="flex justify-between font-semibold text-lg gap-4 py-0.5">
            <div className='w-[20%]'>{asset.symbol}</div>
            <div className='text-right w-[40%]'>{asset.allowance && numberWithCommas(asset.allowance)}</div>
            <div className='text-right w-[40%]'><button onClick={() => handleAdd(asset)} className="text-white font-semibold rounded-lg text-base px-4 py-1 bg-blue-600 hover:bg-blue-700">Edit</button></div>
            
        </div>
        ))}

        {showModal && (
            <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full max-w-md max-h-full rounded-lg shadow bg-gray-700">
                    <button type="button" onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <h3 className="px-8 pt-5 text-xl font-semibold text-white">Edit Allowance</h3>
                    <form className='px-8 py-6 space-y-4' onSubmit={handleModalSubmit}>
                            <input type="text" name="allowanceInput" value={allowanceInput} onChange={(e) => setAllowanceInput(e.target.value)} placeholder="Allowance" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required />
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

export default Assets;
