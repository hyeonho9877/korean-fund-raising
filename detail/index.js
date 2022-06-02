const managerAddress = "0xFD9236af22039B269d51E6473a4eadeE3444bbB5";
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "projectStarter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectTitle",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectDesc",
                "type": "string"
            }
        ],
        "name": "groupCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "createGroup",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMyGroup",
        "outputs": [
            {
                "internalType": "address[10]",
                "name": "",
                "type": "address[10]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            }
        ],
        "name": "getMyGroupCount",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "groupAddress",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "seat",
                "type": "uint8"
            }
        ],
        "name": "updateMyGroup",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "member",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "group",
                "type": "address"
            }
        ],
        "name": "revertGroup",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "groupAddress",
                "type": "address"
            }
        ],
        "name": "destroyGroup",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const groupABI = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "desc",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_GroupManager",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "groupAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            }
        ],
        "name": "alreadyJoined",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "outOfLimit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "transferAdmit",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "requestWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "agree",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cancelRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMembers",
        "outputs": [
            {
                "internalType": "address[10]",
                "name": "",
                "type": "address[10]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDetails",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "desc",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "address[10]",
                "name": "membersResponse",
                "type": "address[10]"
            },
            {
                "internalType": "address",
                "name": "currentRequester",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isCurrentRaising",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "currentRequestAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "agreed",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "joinGroup",
        "outputs": [
            {
                "internalType": "bool",
                "name": "result",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "badUser",
                "type": "address"
            }
        ],
        "name": "kick",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "destroy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
let managerContract;
let creator;
let groupAddr;
var web3;
var groupContract;
let memberCount;

window.onload = load_first;

async function load_first() {
    groupAddr = getParam('g');
    if (groupAddr == "") {
        document.getElementById('contents').innerHTML = "<h1>403 Forbidden</h1>"
    } else {
        await connect();
        groupContract = new web3.eth.Contract(groupABI, groupAddr);
        return getTBodyFromGroupMembers();
    }
}

async function getTBodyFromGroupMembers() {
    document.getElementById('tbodyMemberList').innerHTML = '';
    let details = await groupContract.methods.getDetails().call();
    creator = details.owner;
    console.log(details);
    memberCount = 0;

    var innerHtml = await Promise.all(
        details.membersResponse.map(async (e) => {
                if (e == 0) {
                    return;
                } else {
                    memberCount += 1;
                    try {
                        let date = await getLastTxDate(e);
                        let month = parseInt(date.getMonth()) + 1;
                        console.log(date);
                        return '<tr>' +
                            '<td>' + e + '</td>' +
                            '<td>' + date.getFullYear() + '/' + month + '/' + date.getDate() + '</td>' + getKickableHtml(date, e) +
                            '</tr>';
                    } catch (err) {
                        return '<tr>' +
                            '<td>' + e + '</td>' +
                            '<td>' + '*' + '</td>' +
                            '<td><button id="' + address + '" onclick="kick(this.id)">추방</button></td>' +
                            '</tr>';
                    }
                }
            }
        ));

    document.getElementById('tbodyMemberList').innerHTML = innerHtml.join('');
    document.getElementById('pNumReservedSeat').innerHTML = (10 - memberCount);
    document.getElementById('pBalance').innerText = (parseInt(details.balance) / 10 ** 18) + ' ETH';
    document.getElementById('h1Title').innerHTML += details.name;
    document.getElementById('pDesc').innerText = details.desc;
    if (details.currentRequester !== '0x0000000000000000000000000000000000000000') {
        document.getElementById('requester').innerHTML = details.currentRequester;
        document.getElementById('request-amount').innerHTML = (parseInt(details.currentRequestAmount) / 10 ** 18) + ' ETH';
        document.getElementById('agree-statement').innerHTML = '동의 인수 : ' + details.agreed;
        if(!isAlreadyAgreed(details.agreedMembersList)) document.getElementById('agree-statement').innerHTML += '\t\t<button id="btn-agree" onclick="agree()">동의</button>';
        document.querySelector('#btnRequestWithdraw').disabled = true;
    }
}

function isAlreadyAgreed(agreedList) {
    for(const addr in agreedList) {
        if(addr.toUpperCase() === address.toUpperCase()) return true;
    }
    return false;
}

async function getLastTxDate(address) {
    let formattedURL = 'https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&sort=desc&apikey=PFD9BRP7ISZWUD1QEP3DII2794QXW4DJX4';
    return fetch(formattedURL)
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            for (const tx in jsonResponse.result) {
                let txInfo = jsonResponse.result[tx];
                if (txInfo.to.toUpperCase() === groupAddr.toUpperCase() && parseInt(txInfo.value) > 0) {
                    console.log(parseInt(jsonResponse.result[tx].timeStamp));
                    return new Date(parseInt(jsonResponse.result[tx].timeStamp) * 1000)
                }
            }
        });
}

function getKickableHtml(targetDate, address) {
    let now = new Date();
    if (now.getMonth() - targetDate.getMonth() > 3)
        return '<td><button id="' + address + '" onclick="kick(this.id)">추방</button></td>';
    else return '<td><p id="' + address + '">추방할 수 없습니다.</p>';
}

function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");

    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) {
            sval = temp[1];
        }
    }
    return sval;
}

async function destroyGroup() {
    if (creator.toUpperCase() !== address.toUpperCase()) alert('권한이 없습니다.');
    else {
        await managerContract.methods.destroyGroup(groupAddr).send({from: address});
    }
}

async function kick(badUser) {
    console.log(badUser)
    if (creator.toUpperCase() !== address.toUpperCase()) alert('권한이 없습니다.');
    else {
        if (confirm('추방 하시겠습니까?')) {
            await groupContract.methods.kick(badUser).send({from: address});
            return getTBodyFromGroupMembers();
        }
    }
}

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        web3 = new Web3(window.ethereum);
        const accounts = await ethereum.request({method: "eth_accounts"});
        managerContract = new web3.eth.Contract(contractABI, managerAddress);
        address = await accounts[0];
        console.log(address);
    }
}

async function deposit() {
    let ethValue = prompt('입금할 이더리움의 양을 입력해주세요');
    if (ethValue === '0') alert('0 ETH는 입금할 수 없습니다.')
    else await groupContract.methods.deposit().send({from: address, value: web3.utils.toWei(ethValue, 'ether')});
}

async function requestWithdraw() {
    let ethValue = prompt('출금할 이더리움의 양을 입력해주세요');
    console.log(ethValue)
    if (ethValue === '0') alert('0 ETH는 출금할 수 없습니다.')
    else groupContract.methods.requestWithdraw(web3.utils.toWei(ethValue, 'ether')).send({from: address});

}

async function agree() {
    await groupContract.methods.agree().send({from: address});
    document.querySelector('#btn-agree').disable = true;
}