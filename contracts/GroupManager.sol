pragma solidity ^0.8.0;

contract GroupManager {
    mapping(address=>uint32[10]) private addressToGroup; // 자신이 생성한 그릅 매핑
    mapping(uint32=>address[10]) private groupToMembers; // 그룹에 속한 멤버 매핑
    mapping(uint32=>uint) private groupToBalance; // 그룹(계)의 잔고
    address private owner; // 컨트랙트 소유자
    uint32 private groupCount = 1; // 그룹 아이디 인덱스

    event outOfLimit(); // 잔고나 인원수 제한에 도달했을 때 이벤트

    constructor() {
        owner = msg.sender;
    }

    modifier ownerOnly {
        require(msg.sender == owner);
        _;
    }

    function createGroup() public returns (uint32 groupID) {
        uint8 index = 0;

        // 자신이 만든 그룹의 개수를 파악
        for (uint8 i=0; i<10; i++){
            if (addressToGroup[msg.sender][i] == 0) break;
            index++;
        }

        // 최대 개수 (10개)에 도달했는지 점검하고 도달했다면 outOfLimit 이벤트 발생
        if(index==10) {
            emit outOfLimit();
            return 0;
        }

        // 생성한 그룹에 그룹 아이디를 할당 (그룹을 생성한 것과 동일)
        addressToGroup[msg.sender][index] = groupCount;
        return groupCount++;
    }

    function deposit(uint32 groupID, uint amount) payable public {
        require(amount > 0);
        groupToBalance[groupID] += amount;
    }

    function withdraw(uint32 groupID, uint amount) payable public returns(uint balance){
        require(groupToBalance[groupID] >= amount);
        require(tx.origin == msg.sender);
        groupToBalance[groupID] -= amount;
        payable(msg.sender).transfer(amount);
        return groupToBalance[groupID];
    }

    function joinGroup(uint32 groupID) public returns(bool) {
        uint8 seat = 0;
        for(uint i=0; i<10; i++){
            if(groupToMembers[groupID] == "0x0000000000000000000000000000000000000000") break;
            seat++;
        }
        if(seat==10) {
            emit outOfLimit();
            return false;
        }
        groupToMembers[seat] = msg.sender;
        return true;
    }

    function getGroupID() public view returns(uint32[10] memory groups) {
        return addressToGroup[msg.sender];
    }

    function getGroupMembers(uint32 groupID) public view returns(address[10] memory members){
        return groupToMembers[groupID];
    }
}