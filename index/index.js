const contractAddress = "0x425180500861c9f117d493aFD237488aEaa65fca";
const contractABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "contractAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "projectStarter", "type": "address" }, { "indexed": false, "internalType": "string", "name": "projectTitle", "type": "string" }, { "indexed": false, "internalType": "string", "name": "projectDesc", "type": "string" }], "name": "groupCreated", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "description", "type": "string" }], "name": "createGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getMyGroup", "outputs": [{ "internalType": "address[10]", "name": "", "type": "address[10]" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "getMyGroupCount", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "address", "name": "groupAddress", "type": "address" }, { "internalType": "uint8", "name": "seat", "type": "uint8" }], "name": "updateMyGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
var web3;

window.onload = load_first;
async function load_first() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  var managerContract = new web3.eth.Contract(contractABI, contractAddress);
  managerContract.methods.createGroup('a', 'b').call();

  var addresses = await web3.eth.getAccounts();
  console.log(addresses);

  // manager(web3);
}

async function manager() {
  // window.web
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

function showMyGroup(){
  var groyoAddress = managerContract.methods.etMyGroup(getAccounts).call();
  let count = 0;
  for (let i =0;i<10;i++){
    if(groupAddress[i] != '0x00000000000000'){
      count++;
    }
  }
  document.write('<table>');
  for(let i=0;i<count;i++){
    document.write('<tr>');
    for(let j=0;j<3;j++){
      document.write('<td>');
      document.write(groupAddress[i], getgroupbalance, address); /
      document.write('</td>');
    }
    document.write('</tr>')
  }
  document.write(</table>);
}