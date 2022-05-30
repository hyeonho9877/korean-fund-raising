const contractAddress = "0x425180500861c9f117d493aFD237488aEaa65fca";
const contractABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "contractAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "projectStarter", "type": "address" }, { "indexed": false, "internalType": "string", "name": "projectTitle", "type": "string" }, { "indexed": false, "internalType": "string", "name": "projectDesc", "type": "string" }], "name": "groupCreated", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "description", "type": "string" }], "name": "createGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getMyGroup", "outputs": [{ "internalType": "address[10]", "name": "", "type": "address[10]" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "getMyGroupCount", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "address", "name": "groupAddress", "type": "address" }, { "internalType": "uint8", "name": "seat", "type": "uint8" }], "name": "updateMyGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
var web3;

window.onload = load_first;
async function load_first() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  var managerContract = new web3.eth.Contract(contractABI, contractAddress);

  var addresses = await web3.eth.getAccounts();
  // var createGroupGas = await managerContract.methods.createGroup('a', 'b').estimateGas();
  // var tx = await managerContract.methods.createGroup('a', 'b').send({from: addresses[0], gas: createGroupGas});

  // console.log(tx.transactionHash);
  
  
  managerContract.methods.getMyGroup().call((err, res) => {
    document.getElementById('dashBoardBody').innerHTML = res.map((e) => {
      if (e == 0) {
        return;
      }
      return "<tr>" + 
          "<th scope=\"row\">"+e+"</th>"+
          "<td>Ipsum</td><td>2000</td>" + 
          "<td><div id=\"btnDetail\" onclick=\"location.href='../detail/index.html'\" style=\"cursor: pointer;\">그룹 세부정보</div></td>"+
        "</tr>";
    });
  })
}

async function manager() {
  managerContract.methods.createGroup('a', 'b').call();
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