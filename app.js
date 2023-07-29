// app.js
const contractAddress = '0x27c9cCF9824f1930363e75c944FBDA58Be3F8818'; // Replace this with your smart contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "storedData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace this with your smart contract ABI

async function connectMetamask() {
    // Modern browsers with MetaMask installed
    if (window.ethereum) {
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            return contract;
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            return null;
        }
    } else {
        console.error('MetaMask extension not detected.');
        return null;
    }
}

async function setStoredData(value) {
    const contract = await connectMetamask();
    if (contract) {
        try {
            await contract.set(value);
            console.log('Stored data set successfully.');
        } catch (error) {
            console.error('Error setting stored data:', error);
        }
    }
}

async function getStoredData() {
    const contract = await connectMetamask();
    if (contract) {
        try {
            const data = await contract.get();
            console.log('Stored data:', data.toString());
            return data.toString();
        } catch (error) {
            console.error('Error getting stored data:', error);
            return 'Error';
        }
    }
}
