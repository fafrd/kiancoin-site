import { ethers } from "ethers"
import { calcBalances } from "./balances.js"

const kianAddress = "0xb259adadb959ebb03cb280fba58cc3172e96dc78";
const kianAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_initial_supply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"helloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const uniswapKiancoinAddress = "0x636483cb4e3e09e4a8e9d7f618a7f544579cc38c";
const uniswapUsdcAddress = "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc";
const uniswapAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const { ethereum } = window;
if (ethereum) {
    var provider = new ethers.providers.Web3Provider(ethereum);
}

const isEthereumAvailable = () => Boolean(ethereum);
const isMetaMaskConnected = async () => await provider.listAccounts()
    .then(accounts => accounts.length > 0);

const getKiancoinContract = async () => await new ethers.Contract(kianAddress, kianAbi, provider);
const getUserAddress = async() => await provider.getSigner().getAddress();
const getBalanceForAddress = async address => await getKiancoinContract()
    .then(contract => contract.balanceOf(address))
    .then(balance => Number(balance / 1000000000000000000))
    .then(balance => balance.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 18 }));

const getUniswapContract = async address => await new ethers.Contract(address, uniswapAbi, provider);
const getKiancoinEthPrice = async () => await getUniswapContract(uniswapKiancoinAddress)
    .then(contract => contract.getReserves())
    .then(reserves => Number(reserves._reserve0) / Number(reserves._reserve1));
const getEthUsdPrice = async () => await getUniswapContract(uniswapUsdcAddress)
    .then(contract => contract.getReserves())
    .then(reserves => Number(reserves._reserve0) / Number(reserves._reserve1) * 1e12); // times 10^12 because usdc only has 6 decimals

// returns price as { eth: kiancoin/eth price, usd: kiancoin/usd price }
const getPricesFromUniswap = async () => Promise.all([getKiancoinEthPrice(), getEthUsdPrice()])
    .then(res => {
        return {"eth": res[0], "usd": res[1] / res[0]};
    });


const connectWallet = async () => {
    await ethereum.request({
        method: 'eth_requestAccounts'
    });
};

const getBalance = async () => {
    return await getUserAddress().then(addr => getBalanceForAddress(addr));
};

const setBalance = async (kiancoinBalance, kiancoinPrice) => {
    let amountInUSD = (kiancoinBalance * kiancoinPrice.usd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("balance").innerHTML = kiancoinBalance + " kiancoin ($" + amountInUSD + ")";
};

const setPrice = async kiancoinPrice => {
    document.getElementById("price").style.display = "initial";

    let price = kiancoinPrice.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("price").innerHTML = "The current market cap of kiancoin is $" + price + "<br />";
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

const queryKiancoinSubgraph = async () => {
    // return format looks like
    // {"data":{"transfers":[{"from":"0x0000000000000000000000000000000000000000","to":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","value":"1000000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0xbdb6eb461e9602ab64ca5e805a3906dbc1095250","value":"100000000000000000"},{"from":"0x5295b474f3a0bb39418456c96d6fcf13901a4aa1","to":"0x73bd1162e9da1b551d4601acf83158f3ac2247a9","value":"100000000000000000"}]}};
    const endpoint = "https://graph.wizwar.net/subgraphs/id/QmZc1R7j7gu3DZvQ87EPUEibUh6sYTdpLq9u5xDSrsGXog";
    const query = `{
        transfers {
            id
            from
            to
            value
        }
    }`;

    return queryGraph(endpoint, query);
};

const queryEnsSubgraph = async addresses => {
    // return format looks like
    // {"data":{"addr_0x08b4249c79215fdd6a048af43e9ff86b9ee6be2e":[],"addr_0x122fed718c784ad25e2a5ab351f034fc57512a48":[],"addr_0x4c71526d3f7b112aaa4c0af173a6a47ab69d54cd":[],"addr_0x5295b474f3a0bb39418456c96d6fcf13901a4aa1":[{"name":"kian.eth"}],"addr_0x73bd1162e9da1b551d4601acf83158f3ac2247a9":[],"addr_0x969b81bba3a3eae0fccc78f8b64f012fd823a912":[],"addr_0xbc31fda98ed7cf6daaf50327d922b78cbc486d23":[],"addr_0xbdb6eb461e9602ab64ca5e805a3906dbc1095250":[],"addr_0xe3a2b4da15130c7830862e945a2383f0a29b8bc8":[{"name":"isnowglobal.eth"}],"addr_0xfc6f9a3c0fe29423ca6b974109817a323998f762":[{"name":"travisformayor.eth"}],"addr_0xff82289231128fc6f185137f445d34e30d036c98":[]}}

    //const endpoint = "https://graph.wizwar.net/subgraphs/id/Qmb5arRTXt2DJCPakb8iptE5mhVwNVZR5ZZR5Sm3QhvZa8";
    // while i wait for ^ to finish syncing...
    const endpoint = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";
    const query = `{
        ${addresses.map(addr => {
            return `
                addr_${addr}: domains(where:{owner:"${addr.toLowerCase()}"}) {
                    name
                }
            `;
        })}
    }`;

    return queryGraph(endpoint, query);
};

const queryGraph = async (endpoint, query) => {
    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query})
    })
    .then(r => r.json())
    .catch(error => {
        console.error('Error while querying Graph node:', error);
    });
};

const populateTopHoldersList = async queryResp => {
    // This is actually a bit tricky. I want to make an ordrered list of the holders of kiancoin,
    // but the erc20 contract doesn't give us a way to reverse-lookup who the holders are.
    // So what we do is constuct the current state from the past transaction history.

    let userAddress = await getUserAddress().catch(error => {
        console.error('Error while retrieving user address:', error);
        return "";
    });

    try {
        const transfers = queryResp.data.transfers;
        const balances = await calcBalances(queryResp.data.transfers);
        const sortedBalances = Object.entries(balances).sort(([,a],[,b]) => (a > b) ? -1 : ((a < b) ? 1 : 0));

        for (const i in sortedBalances) {
            //await new Promise(r => setTimeout(r, Math.random() * 10));

            if (sortedBalances[i][0] == "0x0000000000000000000000000000000000000000")
                continue;
            if (sortedBalances[i][0] == "0x636483cb4e3e09e4a8e9d7f618a7f544579cc38c") // uniswap contract
                continue;

            const addrDiv = document.createElement('div');
            addrDiv.className = "address";
            addrDiv.id = "addr_" + sortedBalances[i][0];
            addrDiv.appendChild(document.createTextNode(sortedBalances[i][0]));

            const balance = ethers.utils.formatEther(sortedBalances[i][1]);
            const balDiv = document.createElement('div');
            balDiv.className = "balance bal_" + sortedBalances[i][0];
            balDiv.appendChild(document.createTextNode(balance));

            document.getElementById("top-holders").appendChild(addrDiv);
            document.getElementById("top-holders").appendChild(balDiv);
        }
    } catch (error) {
        // wait before printing 'error' so it feels like the webpage actually tried lol
        await new Promise(r => setTimeout(r, 1000));
        console.warn("Unable to parse kiancoin subgraph query response", error);
        console.warn("Full query resp: " + JSON.stringify(queryResp));
        document.getElementById("top-holders-loading").innerHTML = "Unable to fetch list of holders.";
        document.getElementById("top-holders-loading").style.color = "salmon";
        document.getElementById("top-holders-loading").style.fontWeight = "bold";
        return;
    }

    document.getElementById("top-holders-loading").style.display = "none";
    document.getElementById("top-holders-loading-blank").style.display = "none";

};

const replaceAddrWithENS = async () => {
    try {
        const addrs = [...document.getElementsByClassName("address")].map(addr => addr.innerText);
        const ensResult = await queryEnsSubgraph(addrs);
        //console.log("ensResult: " + JSON.stringify(ensResult));

        // given ens, replace address w ENS
        [...document.getElementsByClassName("address")].forEach(async addrNode => {
            var addr_ = "addr_" + addrNode.innerText;
            if (ensResult.data[addr_].length > 0) {
                document.getElementById(addr_).innerHTML = ensResult.data[addr_][0].name;

            }
        });
    } catch (error) {
        console.warn("Unable to parse ENS subgraph query response", error);
    }
};

// called when we're connected and ready to query metamask
const _initialize = async () => {
    // async get balance
    // async get price (in both eth and usd)
    // when both balance+price are retrieved, populate balance and price info
    Promise.all([getBalance(), getPricesFromUniswap()]).then(res => {
        setBalance(...res);
        setPrice(res[1]);
    });
}

const initialize = async () => {
    // Asynchronously start populating the list of top kiancoin holders
    queryKiancoinSubgraph().then(queryResp => populateTopHoldersList(queryResp)).then(replaceAddrWithENS);

    // Start populating account balance
    if (!isEthereumAvailable()) {
        // prompt user to install metamask
        document.getElementById("balance").innerHTML = "<a href=\"https://metamask.io/download.html\">Install MetaMask wallet</a> to view your balance";
    } else {
        document.getElementById("addToMetamask_link").addEventListener("click", addToMetaMask);
        document.getElementById("addToMetaMask").style.display = "initial";
        await isMetaMaskConnected().then(connected => {
            if (connected) {
                _initialize();
            } else {
                // metamask is not connected; prompt to connect
                document.getElementById("balance").innerHTML = "<a href=\"#\">Connect your wallet</a> to view balance";
                document.getElementById("balance").addEventListener("click", connectWallet);
            }
        });

        // set up accountsChanged callback
        ethereum.on('accountsChanged', _initialize);
    }
};

window.addEventListener('DOMContentLoaded', initialize);
