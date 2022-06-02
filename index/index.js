const contractAddress = "0xFD9236af22039B269d51E6473a4eadeE3444bbB5";
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
];
var web3;
var managerContract;
var address;

async function createGroup() {
    var groupTitle = document.getElementById('title').value;
    var groupDescription = document.getElementById('description').value;

    var createGroupGas = await managerContract.methods.createGroup(groupTitle, groupDescription).estimateGas();
    var tx = await managerContract.methods.createGroup(groupTitle, groupDescription).send({from: address});

    console.log(tx.transactionHash);
    return getTBodyFromGetMyGroup();
}

async function joinGroup() {
    let group_address = document.getElementById('group-address').value;
    let group = new web3.eth.Contract(groupABI, group_address);

    let tx_hash = await group.methods.joinGroup().send({from: address});
    let result = await group.methods.getDetails().call({from: address});
    let myGroup = await managerContract.methods.getMyGroup().call({from: address});
    return getTBodyFromGetMyGroup();
}

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        var metamaskAddr;
        try {
            web3 = new Web3(window.ethereum);
            metamaskAddr = await ethereum.request({method: "eth_requestAccounts"});
        } catch (error) {
            console.log(error);
        }
        const accounts = await ethereum.request({method: "eth_accounts"});
        document.getElementById("btnConnect").innerHTML = "연결됨";


        //   dash board 보이기
        document.getElementById("dashBoard").style.display = "block";
        document.getElementById("myAddress").innerText = "내 주소: " + metamaskAddr;

        managerContract = new web3.eth.Contract(contractABI, contractAddress);
        address = await metamaskAddr[0];
        console.log(address);
        return getTBodyFromGetMyGroup();
    } else {
        document.getElementById("btnConnect").innerHTML =
            "MetaMask를 설치해주세요";
    }
}

async function getTBodyFromGetMyGroup() {
    console.log('entered')
    document.getElementById('dashBoardBody').innerHTML = "";
    let myGroup = await managerContract.methods.getMyGroup().call({from:address});
    for (const groupAddress of myGroup) {
        if(groupAddress !== "0x0000000000000000000000000000000000000000") {
            let balance = await web3.eth.getBalance(groupAddress);
            let group = new web3.eth.Contract(groupABI, groupAddress);
            let details = await group.methods.getDetails().call({from:address});

            let tr =  "<tr>" +
                "<th scope=\"row\">" + details.name + "</th>" +   // 이름
                "<td>" + details.desc + "</td>" +
                "<td>" + balance + "</td>" +                 // 금액
                "<td><div id=\"btnDetail\" onclick=\"location.href='/detail?g=" + groupAddress + "'\" style=\"cursor: pointer;\">그룹 세부정보</div></td>" +
                "</tr>";
            document.getElementById('dashBoardBody').innerHTML += tr;
        }
    }
}