import React, { useState } from 'react';

type AddressType = 'Solana' | 'EVM';

interface AddressInput {
  type: AddressType;
  address: string;
  isLocked: boolean;
}

const AddressForm: React.FC = () => {
  const [inputs, setInputs] = useState<AddressInput[]>([{ type: 'EVM', address: '', isLocked: false }]);
  const [addresses, setAddresses] = useState({ EVM: [], Solana: [] });

  const handleLockInput = (index: number) => {
    const newInputs = [...inputs];
    const input = newInputs[index];

    if (input.address && input.address.length > 0) {
      input.isLocked = true;
    } else {
      alert("Address cannot be empty.");
    }

    setInputs(newInputs);
  };

  const handleDeleteInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { type: 'EVM', address: '', isLocked: false }]);
  };

  const handleInputChange = (index: number, value: string, type: AddressType) => {
    const newInputs = [...inputs];
    newInputs[index] = { type, address: value, isLocked: newInputs[index].isLocked };
    setInputs(newInputs);
  };

  const handleSubmit = async () => {
    const newAddresses = { EVM: [], Solana: [] };
    inputs.forEach(input => {
      if (input.isLocked) {
        newAddresses[input.type].push(input.address);
      }
    });
    
    const testUsername = "tester";

    try {
      const response = await fetch('http://localhost:3000/user/wallets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: testUsername, wallets: newAddresses }),
      });
  
      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        console.log('Updated user data:', data);
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
      }
    } catch (error) {
      console.error('Error updating wallets:', error);
    }
  

    setAddresses(newAddresses);
    console.log(newAddresses);
  }


  return (
    <div className="space-y-4">
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center space-x-2">
          <select
            className="border rounded p-2"
            value={input.type}
            onChange={(e) => handleInputChange(index, input.address, e.target.value as AddressType)}
            disabled={input.isLocked}
          >
            <option value="EVM">EVM</option>
            <option value="Solana">Solana</option>
          </select>
          <input
            className="border rounded p-2 flex-1"
            type="text"
            value={input.address}
            onChange={(e) => handleInputChange(index, e.target.value, input.type)}
            disabled={input.isLocked}
          />
          {!input.isLocked && (
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={() => handleLockInput(index)}
            >
              Lock
            </button>
          )}
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={() => handleDeleteInput(index)}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddInput}
        className="py-2 px-4 bg-blue-500 text-white rounded"
      >
        Add Address
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        className="py-2 ml-2 px-4 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default AddressForm;
