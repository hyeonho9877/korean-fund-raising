// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;

import "./Group.sol";

contract GroupManager {

    Group[] private groups;
    mapping(address => address[10]) private joinedGroups;

    event groupCreated(
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDesc
    );

    function createGroup(string calldata title, string calldata description) external {
        uint8 index = isOverLimit();
        require(index != 10);
        Group newGroup = new Group(payable(msg.sender), title, description);
        groups.push(newGroup);
        joinedGroups[msg.sender][index] = address(newGroup);
        emit groupCreated(payable(address(newGroup)), msg.sender, title, description);
    }

    function returnAllGroups() external view returns (Group[] memory){
        return groups;
    }

    function isOverLimit() private view returns (uint8){
        uint8 i;
        for (i = 0; i < 10; i++) {
            if (joinedGroups[msg.sender][i] == address(0)) break;
        }
        return i;
    }

    function getMyGroup() public view returns (address[10] memory){
        return joinedGroups[msg.sender];
    }
    /*struct Group {
        uint32 groupID;
        uint balance;
        address[10] members;
    }
    mapping(address=>uint32[10]) private joinedGroup; // 자신이 생성한 그릅 매핑
    mapping(uint=>Group) groups;
    address private owner; // 컨트랙트 소유자
    uint32 private groupCount = 1; // 그룹 아이디 인덱스



    constructor() {
        owner = msg.sender;
    }

    modifier ownerOnly {

        require(msg.sender == owner);
        _;
    }

    function createGroup() public returns (uint32[10] memory) {
        uint8 i;

        // 자신이 만들거나 가입한 그룹의 수 확인
        for (i=0; i<10; i++){
            if (joinedGroup[msg.sender][i] == 0) break;
        }

        // 최대 개수 (10개)에 도달했는지 점검하고 도달했다면 outOfLimit 이벤트 발생
        if(i==10) {
            emit outOfLimit();
        }

        Group storage group = groups[groupCount];
        // 생성한 그룹에 그룹 아이디를 할당 (그룹을 생성한 것과 동일)
        joinedGroup[msg.sender][i] = groupCount;
        // 생성한 그룹의 첫 번째 멤버로 msg.sender 할당
        group.members[0] = msg.sender;
        groupCount++;

        return joinedGroup[msg.sender];
    }

    function deposit(uint32 groupID) payable public returns(uint value) {
        require(msg.value > 0);
        Group storage group = groups[groupID];
        require(isAlreadyJoined(groupID, group));
        group.balance += msg.value;
        return group.balance;
    }

    function withdraw(uint32 groupID) payable public returns(uint balance){
        Group storage group = groups[groupID];
        // 그룹의 잔액 확인
        require(group.balance >= msg.value);
        // 다른 컨트랙트가 대신 호출 불가능
        require(tx.origin == msg.sender);
        // msg.sender가 그룹의 회원인지 확인
        uint8 i;
        for (i=0; i<10; i++){
            if(joinedGroup[msg.sender][i] == groupID) break;
        }
        // 아닐 경우 이벤트 발생후, 트랜잭션 revert
        if (i==10){
            emit notMember(groupID, msg.sender);
            return 0;
        }
        // 그룹의 잔고를 msg.value 만큼 감소
        group.balance -= msg.value;
        // msg.sender에게 msv.value만큼 이더 전송
        payable(msg.sender).transfer(msg.value);
        return group.balance;
    }

    function joinGroup(uint32 groupID) public returns(bool) {
        Group storage group = groups[groupID];
        // 가입을 신청하는 사람의 남은 가용 그룹수 확인
        uint8 senderGroupCount = canJoinOtherGroup();

        // 더 이상 그룹을 생성하거나 가입 할 수 없는 경우, 이벤트 발생
        if(senderGroupCount == 10) {
            emit outOfLimit();
            return false;
        }
        // 이미 가입된 그룹의 경우 해당하는 이벤트 발생
        if(isAlreadyJoined(groupID, group)){
            emit alreadyJoined(groupID, msg.sender);
            return false;
        }

        // 가입하려는 그룹의 남은 자리수 확인
        uint i;
        for(i=0; i<10; i++){
            if(group.members[i] == address(0)) break;
        }

        // 자리가 없으면 이벤트 발생
        if(i==10) {
            emit outOfLimit();
            return false;
        }

        // 가입하려는 그룹에 msg.sender 할당 및 msg.sender의 그룹 현황 갱신
        group.members[i] = msg.sender;
        joinedGroup[msg.sender][senderGroupCount] = groupID;
        return true;
    }

    function canJoinOtherGroup() private returns(uint8){
        uint8 i;

        // 자신이 만들거나 속해 있는 그룹의 수를 확인
        for (i=0; i<10; i++){
            if (joinedGroup[msg.sender][i] == 0) break;
        }

        return i;
    }

    function isAlreadyJoined(uint32 groupID, Group memory group) private returns(bool){

        uint8 i;

        // 자신이 만들거나 속해 있는 그룹의 수를 확인
        for (i=0; i<10; i++){
            if (group.members[i] == msg.sender) return true;
            else if (group.members[i] == address(0)) return false;
        }
        return false;
    }

    function getGroupID() public view returns(uint32[10] memory groupIds) {
        return joinedGroup[msg.sender];
    }

    function getGroupMembers(uint32 groupID) public view returns(address[10] memory members){
        Group storage group = groups[groupID];
        require(group.members[0] != address(0));
        return group.members;
    }

    function getGroupBalance(uint32 groupID) public view returns(uint balance){
        Group storage group = groups[groupID];
        return group.balance;
    }*/
}