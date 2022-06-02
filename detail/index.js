const groupABI = [{ "inputs": [{ "internalType": "address payable", "name": "owner", "type": "address" }, {"internalType": "string", "name": "name", "type": "string"}, { "internalType": "string", "name": "desc", "type": "string" }, {"internalType": "address", "name": "_GroupManager", "type": "address"}], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "groupAddress", "type": "address" }, {"indexed": false, "internalType": "address", "name": "from", "type": "address"}], "name": "alreadyJoined", "type": "event" }, { "anonymous": false, "inputs": [{"indexed": false, "internalType": "uint32", "name": "groupID", "type": "uint32"}, { "indexed": false, "internalType": "address", "name": "from", "type": "address" }], "name": "notMember", "type": "event" }, {"anonymous": false, "inputs": [], "name": "outOfLimit", "type": "event"}, { "anonymous": false, "inputs": [{"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }], "name": "transferAdmit", "type": "event" }, { "inputs": [], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "requestWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, {"inputs": [], "name": "agree", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, { "inputs": [], "name": "cancelRequest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getDetails", "outputs": [{"internalType": "address payable", "name": "owner", "type": "address"}, { "internalType": "string", "name": "name", "type": "string" }, {"internalType": "string", "name": "desc", "type": "string"}, { "internalType": "uint256", "name": "balance", "type": "uint256" }, {"internalType": "address[10]", "name": "membersResponse", "type": "address[10]"}, { "internalType": "address", "name": "currentRequester", "type": "address" }, {"internalType": "bool", "name": "isCurrentRaising", "type": "bool"}, { "internalType": "uint256", "name": "currentRequestAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "joinGroup", "outputs": [{"internalType": "bool", "name": "result", "type": "bool"}], "stateMutability": "nonpayable", "type": "function" }];
var web3;
var groupContract;
var addresses;

window.onload = load_first;

async function load_first() {
  var groupAddr = getParam('g');
  if(groupAddr == "") {
    document.getElementById('contents').innerHTML = "<h1>403 Forbidden</h1>"
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")) 
    web3.eth.net.isListening()
      .then(() => console.log('Ganache Connected'))
      .catch((e) => {
        web3 = new Web3("wss://ropsten.infura.io/ws/v3/e3fbfedc03444eb6b1491a84cf06eb02");
        web3.eth.net.isListening().then(() => console.log('Infura Connected'))
                                  .catch((e) => console.error(e));
      });

    groupContract = new web3.eth.Contract(groupABI, groupAddr);
    addresses = await web3.eth.getAccounts();
    getTBodyFromGroupMembers();
  }
}

async function getTBodyFromGroupMembers() {
  let details = await groupContract.methods.getDetails().call();
  console.log(details);

  var innerHtml = await Promise.all(
    details[4].map(async (e) => {
      if (e == 0) {
        return;
      } else {
        return '<tr>'+
                '<td>' + e +'</td>'+
                '<td><button id="btnOut" onclick="functionAlert()">추방</button></td>'+
               '</tr>';
      }
    }
  ));

  document.getElementById('tbodyMemberList').innerHTML = innerHtml.join('');
  document.getElementById('pBalance').innerText = parseInt(details[5], 16) / 10^18 + 'ETH';
  // document.getElementById('pNumReservedSeat').innerText = '';
  document.getElementById('h1Title').innerText = "그룹 디테일: " + details[1];
  document.getElementById('pDesc').innerText = details[2];
}

function getParam(sname) {
  var params = location.search.substr(location.search.indexOf("?") + 1);
  var sval = "";
  params = params.split("&");

  for (var i = 0; i < params.length; i++) {
    temp = params[i].split("=");
    if ([temp[0]] == sname) { sval = temp[1]; }
  }
  return sval;
}

async function destroyGroup(){
  
}


function functionAlert() {
  alert("추방하시겠습니까?");
}