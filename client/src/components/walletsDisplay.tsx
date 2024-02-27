import React, { useState, useEffect } from 'react';

type Chain = {
    name: string;
    value: string;
    allocation: string;
};

type Wallet = {
    address: string;
    balance: string;
    change: string;
    chains: Chain[];
};

const WalletsDisplay: React.FC = () => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [totalBalance, setTotalBalance] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showAllChains, setShowAllChains] = useState<boolean>(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/evm/portfolio')
            .then(response => response.json())
            .then(data => {
                setTotalBalance(data.totalBalance);
                delete data.totalBalance;
                setWallets(Object.values(data));
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    const toggleChainsDisplay = () => {
        setShowAllChains(!showAllChains);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold">Total Balance: {totalBalance}</h2>
            </div>
            {wallets.map((wallet, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <h2 className="text-lg font-bold mb-2">Address: {wallet.address}</h2>
                    <p>Balance: {wallet.balance}</p>
                    <p>Change: {wallet.change}</p>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {(showAllChains ? wallet.chains : wallet.chains.slice(0, 8)).map((chain, chainIndex) => (
                            <div key={chainIndex} className="border border-gray-300 rounded p-2">
                                <p className="font-semibold">{chain.name}</p>
                                <p>{chain.value}</p>
                            </div>
                        ))}
                    </div>
                    {wallet.chains.length > 8 && (
                        <button onClick={toggleChainsDisplay} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                            {showAllChains ? 'View Less' : 'View More'}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WalletsDisplay;