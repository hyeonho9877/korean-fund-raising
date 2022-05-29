// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;
import "./GroupManager.sol";

contract Group {
    // State variables
    address payable private creator;
    address payable private requester;
    uint private requestAmount;
    address[10] members;
    uint256 private currentBalance;
    string private groupName;
    string private groupDesc;
    uint8 private agreement;
    bool private isRaising;
    GroupManager private manager;

    // event fundingReceived(address contributor, uint amount, uint currentTotal);
    event transferAdmit(uint amount, address to);
    event outOfLimit(); // 잔고나 인원수 제한에 도달했을 때 이벤트
    event notMember(uint32 groupID, address from); // groupID에 해당하는 그룹에 멤버가 아닐 경우의 이벤트
    event alreadyJoined(address groupAddress, address from); // 이미 해당 그룹에 가입돼있는 경우의 이벤트

    constructor(address payable owner, string memory name, string memory desc, address _GroupManager) {
        creator = owner;
        members[0] = creator;
        groupName = name;
        groupDesc = desc;
        currentBalance = 0;
        agreement = 0;
        requestAmount = 0;
        isRaising = false;
        manager = GroupManager(_GroupManager);
    }

    function deposit() payable public {
        require(msg.value > 0);
        currentBalance += msg.value;
    }

    function requestWithdraw(uint amount) public {
        require(!isRaising);
        require(isAlreadyJoined());
        require(amount <= currentBalance);
        requester = payable(msg.sender);
        requestAmount = amount;
        isRaising = true;
    }

    function agree() public {
        require(msg.sender != requester);
        require(requester != address(0));
        agreement += 1;
        if (agreement >= halfOfMember()) {
            address payable targetAddress = requester;
            uint amount = requestAmount;
            agreement = 0;
            isRaising = false;
            requestAmount = 0;
            requester = payable(address(0));
            currentBalance -= amount;
            targetAddress.transfer(amount);
            emit transferAdmit(amount, targetAddress);
        }
    }

    function cancelRequest() public {
        require(requester == msg.sender);
        require(isRaising);
        requester = payable(address(0));
        requestAmount = 0;
        agreement = 0;
        isRaising = false;
    }

    function halfOfMember() private view returns (uint8 half) {
        require(members[0] != address(0));
        uint8 i;
        for (i = 0; i < 10; i++) {
            if (members[i] == address(0)) break;
        }
        half = i / 2;
    }

    function getDetails() public view returns (address payable owner, string memory name, string memory desc, uint256 balance, address[10] memory membersResponse, address currentRequester, bool isCurrentRaising, uint currentRequestAmount) {
        owner = creator;
        name = groupName;
        desc = groupDesc;
        balance = currentBalance;
        membersResponse = members;
        isCurrentRaising = isRaising;
        currentRequester = requester;
        currentRequestAmount = requestAmount;
    }

    function joinGroup() external returns (bool result){
        if (isAlreadyJoined()) {
            emit alreadyJoined(address(this), msg.sender);
            return false;
        }
        uint seat = findSeat();
        if (seat == 10) {
            emit outOfLimit();
            return false;
        }
        uint8 remainingSeat = manager.getMyGroupCount(msg.sender);
        if(remainingSeat==10){
            emit outOfLimit();
            return false;
        }
        members[seat] = msg.sender;
        manager.updateMyGroup(msg.sender, address(this), remainingSeat);
        return true;
    }

    function isAlreadyJoined() private view returns (bool){
        bool result = false;
        uint8 i;
        for (i = 0; i < 10; i++) {
            if (members[i] == address(0)) break;
            else if (members[i] == msg.sender) {
                result = true;
                break;
            }
        }
        return result;
    }

    function findSeat() private view returns (uint){
        uint i;
        for (i = 0; i < 10; i++) {
            if (members[i] == address(0)) break;
        }
        return i;
    }
}
