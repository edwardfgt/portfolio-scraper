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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/evm/portfolio')
            .then(response => response.json())
            .then(data => {
                setWallets(Object.values(data));
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            {wallets.map((wallet, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <h2 className="text-lg font-bold mb-2">Address: {wallet.address}</h2>
                    <p>Balance: {wallet.balance}</p>
                    <p>Change: {wallet.change}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold">Chains:</h3>
                        <ul>
                            {wallet.chains.map((chain, chainIndex) => (
                                <li key={chainIndex} className="ml-4 list-disc">
                                    {chain.name}: {chain.value} (Allocation: {chain.allocation})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WalletsDisplay;
