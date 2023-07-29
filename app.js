// app.js
const contractAddress = ''; 
const contractABI = []

async function connectMetamask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            return contract;
        } catch (error) {
            console.error('Error', error);
            return null;
        }
    } else {
        console.error('MetaMask error');
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
