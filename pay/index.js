const contractAddress = "0x39A1C58d238ec465f56fB81AD1f1cfd27F6c000F";
const contractABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "contractAddress", "type": "address" }, { "indexed": false, "internalType": "address", "name": "projectStarter", "type": "address" }, { "indexed": false, "internalType": "string", "name": "projectTitle", "type": "string" }, { "indexed": false, "internalType": "string", "name": "projectDesc", "type": "string" }], "name": "groupCreated", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "description", "type": "string" }], "name": "createGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getMyGroup", "outputs": [{ "internalType": "address[10]", "name": "", "type": "address[10]" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "getMyGroupCount", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }, { "internalType": "address", "name": "groupAddress", "type": "address" }, { "internalType": "uint8", "name": "seat", "type": "uint8" }], "name": "updateMyGroup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const groupABI = [{"inputs": [{"internalType": "address payable","name": "owner","type": "address"},{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "desc","type": "string"},{"internalType": "address","name": "_GroupManager","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "groupAddress","type": "address"},{"indexed": false,"internalType": "address","name": "from","type": "address"}],"name": "alreadyJoined","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint32","name": "groupID","type": "uint32"},{"indexed": false,"internalType": "address","name": "from","type": "address"}],"name": "notMember","type": "event"},{"anonymous": false,"inputs": [],"name": "outOfLimit","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "address","name": "to","type": "address"}],"name": "transferAdmit","type": "event"},{"inputs": [],"name": "deposit","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "requestWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "agree","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "cancelRequest","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getDetails","outputs": [{"internalType": "address payable","name": "owner","type": "address"},{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "desc","type": "string"},{"internalType": "uint256","name": "balance","type": "uint256"},{"internalType": "address[10]","name": "membersResponse","type": "address[10]"},{"internalType": "address","name": "currentRequester","type": "address"},{"internalType": "bool","name": "isCurrentRaising","type": "bool"},{"internalType": "uint256","name": "currentRequestAmount","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "joinGroup","outputs": [{"internalType": "bool","name": "result","type": "bool"}],"stateMutability": "nonpayable","type": "function"}];
var web3;
var managerContract;
var addresses;

window.onload = load_first;
async function load_first() {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  managerContract = new web3.eth.Contract(contractABI, contractAddress);
  addresses = await web3.eth.getAccounts();
  getSelectGroups();
}

async function getSelectGroups(){
  let myGroups = await managerContract.methods.getMyGroup().call();
  console.log(paygroups);

  var count = 0;
  for(let group of myGroups){
    count++;
    document.getElementById('accounts').innerHTML = '<option value=count>'+ group + '</option>'
  }
}

// get
let select = document.getElementsByClassName("accounts")[0];
select.addEventListener("change", showBalance);
let log = document.getElementById("log");
log.innerHTML = "";

// // 선택된 계정의 balance 표시
// async function showBalance() {
//   let selectTags = document.getElementsByClassName("accounts");
//   let balanceTag = document.getElementById("balance");
//   console.log("show balance");

//   let address = selectTags[0].options[selectTags[0].selectedIndex].value;
//   console.log(address);
//   let balance = await web3.eth.getBalance(address);
//   console.log(balance);
//   balanceTag.innerHTML = web3.utils.fromWei(balance, "ether");
// }

// sendBtn을 클릭하면 이더 전송
let sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", () => {
  // 데이터 가져오기
  let fromAddr = addresses[0];
  fromAddr = fromAddr.options[fromAddr.selectedIndex].value;
  let toAddr = contractAddress;
  toAddr = toAddr.options[toAddr.selectedIndex].value;
  
  let value = document.getElementById("value").value;
  value = web3.utils.toWei(value, "ether");

  // 계정 언락
  // web3.eth.personal.unlockAccount(fromAddr, password).then(async (unlocked) => {
  //   if (unlocked) {
  //     outputLog(log, `unlocked ? ${unlocked}, sending Transaction...`);
  //     // sned a transaction
  //     let receipt = await web3.eth.sendTransaction({
  //       from: fromAddr,
  //       to: toAddr,
  //       value: value,
  //     });
  //     outputLog(log, "Transaction Successfully sended");
  //     outputLog(log, "Transaction Receipt: ");
  //     outputLog(log, JSON.stringify(receipt, undefined, 2));
  //   }
  // });
});

function outputLog(log, result) {
  log.innerHTML += "\n";
  log.innerHTML += result;
}