// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;
import "./GroupManager.sol";

contract Group {
    // 그룹 개설자
    address payable private creator;
    // 출금 요청자
    address payable private requester;
    // 출금 요청액
    uint private requestAmount;
    // 멤버들의 address 배열
    address[10] members;
    // 현재 잔액
    uint256 private currentBalance;
    // 그룹의 이름
    string private groupName;
    // 그룹의 설명
    string private groupDesc;
    // 동의 현황
    uint8 private agreement;
    // 현재 출금 요청을 처리 중이니 나타내는 bool 변수
    bool private isRaising;
    // 그룹 매니저 컨트랙트
    GroupManager private manager;

    event transferAdmit(uint amount, address to); // 요청에 의한 출금이 완료되었음
    event outOfLimit(); // 잔고나 인원수 제한에 도달하였음
    event notMember(uint32 groupID, address from); // groupID에 해당하는 그룹에 멤버가 아님
    event alreadyJoined(address groupAddress, address from); // 이미 해당 그룹에 가입되어 있음

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

    // 그룹에 대한 입금 메소드
    function deposit() payable public {
        require(msg.value > 0);
        currentBalance += msg.value;
    }

    // 그룹에 대한 출금 요청 메소드
    function requestWithdraw(uint amount) public {
        require(!isRaising);
        require(isAlreadyJoined());
        require(amount <= currentBalance);
        requester = payable(msg.sender);
        requestAmount = amount;
        isRaising = true;
    }

    // 그룹에서 진행되고 있는 출금 요청에 대한 동의를 반영하는 메소드
    function agree() public {
        require(msg.sender != requester);
        require(requester != address(0));
        require(isAlreadyJoined());
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

    // 출금 요청을 취소하는 메소드
    function cancelRequest() public {
        require(requester == msg.sender);
        require(isRaising);
        requester = payable(address(0));
        requestAmount = 0;
        agreement = 0;
        isRaising = false;
    }

    // 현재 멤버의 절반에 해당하는 인원수를 계산하는 메소드
    function halfOfMember() private view returns (uint8 half) {
        require(members[0] != address(0));
        uint8 i;
        for (i = 0; i < 10; i++) {
            if (members[i] == address(0)) break;
        }
        half = i / 2;
    }

    // 그룹의 상태를 확인하는 메소드
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

    // 그룹에 가입하는 메소드
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

    // 이미 그룹에 가입된 계정인지 확인하는 메소드
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

    // 이미 그룹에 가입된 계정인지 확인하는 메소드
    function isAlreadyJoined(address target) private view returns (uint8){
        uint8 i;
        for (i = 0; i < 10; i++) {
            if (members[i] == address(0)) return 10;
            else if (members[i] == target) {
                break;
            }
        }
        return i;
    }

    // 현재 그룹의 여유 자리를 계산하는 메소드
    function findSeat() private view returns (uint){
        uint i;
        for (i = 0; i < 10; i++) {
            if (members[i] == address(0)) break;
        }
        return i;
    }

    // 멤버 추방 메소드
    function kick(address badUser) external {
        require(msg.sender == creator);
        uint8 seat = isAlreadyJoined(badUser);
        require(seat!=10);
        members[seat] = address(0);
        reorderMembers(seat);
    }

    function reorderMembers(uint8 index) private {
        for(uint8 i=index+1;i<10;i++){
            if(members[i]==address(0)) {
                members[i-1] = address(0);
                break;
            }
            members[i-1] = members[i];
        }
    }
}
