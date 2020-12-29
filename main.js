import { ethers } from "ethers"
import { calcBalances } from "./balances.js"

const kianAddress = "0xb259adadb959ebb03cb280fba58cc3172e96dc78";
const kianABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_initial_supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"helloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const { ethereum } = window;
if (ethereum) {
    var provider = new ethers.providers.Web3Provider(ethereum);
}

const isEthereumAvailable = () => Boolean(ethereum);
const isMetaMaskConnected = async () => await provider.listAccounts()
    .then((accounts) => accounts.length > 0);

const getContract = async () => await new ethers.Contract(kianAddress, kianABI, provider);
const getUserAddress = async() => await provider.getSigner().getAddress();
const getBalanceForAddress = async (address) => await getContract()
    .then((contract) => contract.balanceOf(address))
    .then((balance) => Number(balance / 1000000000000000000))
    .then((balance) => balance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 18 }));

const connectWallet = async () => {
    // set up callback for when connection is done
    // TODO should be moved into initialize() so this callback is always available
    ethereum.on('accountsChanged', () => {
        setBalance();
    });

    // trigger connection
    await ethereum.request({
        method: 'eth_requestAccounts'
    });
};

const setBalance = async () => {
    const balance = await getUserAddress().then((addr) => getBalanceForAddress(addr));
    document.getElementById("balance").innerHTML = balance + " kiancoin";
    if (balance > 0) {
        document.getElementById("addToMetaMask").style.display = "initial";
    }
};

const addToMetaMask = () => ethereum.request({
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

const queryGraph = async () => {
    const endpoint = "http://graph.wizwar.net/subgraphs/id/QmZc1R7j7gu3DZvQ87EPUEibUh6sYTdpLq9u5xDSrsGXog";
    const query = `{
        transfers {
            from
            to
            value
        }
    }`;

    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query})
    })
    .then(r => r.json())
    .catch((error) => {
        console.error('Error while querying Graph node:', error);
    });
};

const populateTopHoldersList = async (queryResp) => {
    // This is actually a bit tricky. I want to make an ordrered list of the holders of kiancoin,
    // but the erc20 contract doesn't give us a way to reverse-lookup who the holders are.
    // So what we do is constuct the current state from the past transaction history.

    let userAddress = await getUserAddress().catch((error) => {
        console.error('Error while retrieving user address:', error);
        return "";
    });

    try {
        var transfers = queryResp.data.transfers;
        var balances = await calcBalances(queryResp.data.transfers);   

        for (const addr in balances) {
            if (addr == "0x0000000000000000000000000000000000000000")
                continue;

            let balance = Number(balances[addr] / 1000000000000000000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 18 });

            let you = "";
            if (addr.toLowerCase() == userAddress.toLowerCase())
                you = " (you)";

            var entry = addr + you + ": " + balance  + " kiancoins";
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(entry));
            document.getElementById("top-holders").appendChild(li);
        }
    } catch (error) {
        await new Promise(r => setTimeout(r, 1000));
        console.warn("Unable to parse graph query response", e);
        console.warn("Full query resp: " + JSON.stringify(queryResp));
        document.getElementById("top-holders-loading").innerHTML = "Unable to fetch list of holders.";
        document.getElementById("top-holders-loading").style.color = "salmon";
        document.getElementById("top-holders-loading").style.fontWeight = "bold";
        return;
    }

    document.getElementById("top-holders-loading").style.display = "none";
};

const initialize = async () => {
    // Asynchronously start populating the list of top kiancoin holders
    queryGraph().then((queryResp) => populateTopHoldersList(queryResp));

    // Start populating account balance
    if (!isEthereumAvailable()) {
        // prompt user to install metamask
        document.getElementById("balance").innerHTML = "<a href=\"https://metamask.io/download.html\">Install MetaMask wallet</a> to view your balance";
    } else {
        document.getElementById("addToMetaMask").addEventListener("click", addToMetaMask);
        await isMetaMaskConnected().then((connected) => {
            if (connected) {
                // metamask is connected; set balance
                setBalance();
            } else {
                // metamask is not connected; prompt to connect
                document.getElementById("balance").innerHTML = "<a href=\"#\">Connect your wallet</a> to view balance";
                document.getElementById("balance").addEventListener("click", connectWallet);
            }
        });
    }
};

window.addEventListener('DOMContentLoaded', initialize);
