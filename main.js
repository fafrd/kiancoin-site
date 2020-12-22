import { ethers } from "ethers"

const kianAddress = "0xb259adadb959ebb03cb280fba58cc3172e96dc78";
const kianABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_initial_supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"helloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const { ethereum } = window;
if (ethereum) {
    var provider = new ethers.providers.Web3Provider(ethereum);
}

const connectWallet = async () => {
    console.log("connect()");

    // set up callback for when connection is done
    ethereum.on('accountsChanged', () => {
        console.log("account changed detected");
        setBalance();
    });

    // trigger connection
    await ethereum.request({
        method: 'eth_requestAccounts'
    });

    console.log("done")
}

const setBalance = async () => {
    console.log("setBalance()")
    //await provider.getBlockNumber().then((blockNum) => { console.log(blockNum) })

    const getBalance = async () => {
        const userAddress = await provider.getSigner().getAddress()
        const contract = await new ethers.Contract(kianAddress, kianABI, provider);
        const balance = await contract.balanceOf(userAddress);
        return balance.toString();
    }

    await getBalance().then((balance) => {
        let numKians = Number(balance / 1000000000000000000);
        document.getElementById("balance").innerHTML = numKians.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 18 }) + " kiancoin";
        if (balance > 0) {
            document.getElementById("addToMetaMask").style.display = "initial";
        }
    });
}

const addToMetaMask = () => {
    ethereum.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20',
            options: {
                address: '0xb259adadb959ebb03cb280fba58cc3172e96dc78',
                symbol: 'KIAN',
                decimals: 18,
            },
        }
    });
}

const initialize = async () => {
    console.log("initialize()");

    const isEthereumAvailable = () => {
        return Boolean(ethereum);
    };

    const isMetaMaskConnected = async () => {
        const accounts = await provider.listAccounts();
        return accounts.length > 0;
    }

    if(!isEthereumAvailable()) {
        document.getElementById("balance").innerHTML = "<a href=\"https://metamask.io/download.html\">Install MetaMask wallet</a> to view your balance";
    } else {
        document.getElementById("addToMetaMask").addEventListener("click", addToMetaMask);
        await isMetaMaskConnected().then((connected) => {
            if (connected) {
                setBalance();
            } else {
                document.getElementById("balance").innerHTML = "<a href=\"#\">Connect your wallet</a> to view balance";
                document.getElementById("balance").addEventListener("click", connectWallet);
            }
        });
    }
};

window.addEventListener('DOMContentLoaded', initialize);