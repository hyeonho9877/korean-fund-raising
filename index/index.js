window.onload = load_first;
function load_first() {
  initial();
}

async function initial() {
  // var Web3 = require('web3');
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  const contractAddress = "0x97FDe74B9d75980112c23710eA10b44432E05FaA";
  const contractABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "contractAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "projectStarter", "type": "address" }, { "indexed": false, "internalType": "string", "name": "projectTitle", "type": "string" }, { "indexed": false, "internalType": "string", "name": "projectDesc", "type": "string" }], "name": "groupCreated", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "description", "type": "string" }], "name": "createGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getMyGroup", "outputs": [{ "internalType": "address[10]", "name": "", "type": "address[10]" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "getMyGroupCount", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "address", "name": "groupAddress", "type": "address" }, { "internalType": "uint8", "name": "seat", "type": "uint8" }], "name": "updateMyGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  var managerContract = new web3.eth.Contract(contractABI, contractAddress);
  managerContract.methods.createGroup('a', 'b').call();
  console.log("account", web3.eth.getAccounts());
}

async function manager() {
  window.web
  // managerContract.methods.createGroup('a', 'b').call();
}

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    document.getElementById("btnConnect").innerHTML = "연결됨";

    //   dash board 보이기
    document.getElementById("dashBoard").style.display = "block";

  } else {
    document.getElementById("btnConnect").innerHTML =
      "MetaMask를 설치해주세요";
  }
}