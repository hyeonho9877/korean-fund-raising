pragma solidity ^0.8.0;

contract GroupManager {
    mapping(address=>uint32[10]) private addressToGroup; // 자신이 생성한 그릅 매핑
    mapping(uint32=>address[10]) private groupToMembers; // 그룹에 속한 멤버 매핑
    mapping(uint32=>uint) private groupToBalance; // 그룹(계)의 잔고
    address private owner; // 컨트랙트 소유자
    uint32 private groupCount = 1; // 그룹 아이디 인덱스

    event outOfLimit(); // 잔고나 인원수 제한에 도달했을 때 이벤트
    event notMember(uint32 groupID, address from); // groupID에 해당하는 그룹에 멤버가 아닐 경우의 이벤트
    event alreadyJoined(uint32 groupID, address from); // 이미 해당 그룹에 가입돼있는 경우의 이벤트

    constructor() {
        owner = msg.sender;
    }

    modifier ownerOnly {
        require(msg.sender == owner);
        _;
    }

    function createGroup() public returns (uint32) {
        uint8 i;

        // 자신이 만들거나 가입한 그룹의 수 확인
        for (i=0; i<10; i++){
            if (addressToGroup[msg.sender][i] == 0) break;
        }

        // 최대 개수 (10개)에 도달했는지 점검하고 도달했다면 outOfLimit 이벤트 발생
        if(i==10) {
            emit outOfLimit();
            return 0;
        }

        // 생성한 그룹에 그룹 아이디를 할당 (그룹을 생성한 것과 동일)
        addressToGroup[msg.sender][i] = groupCount;
        // 생성한 그룹의 첫 번째 멤버로 msg.sender 할당
        groupToMembers[groupCount][0] = msg.sender;
        return groupCount++;
    }

    function deposit(uint32 groupID) payable public {
        require(msg.value > 0);
        groupToBalance[groupID] += msg.value;
    }

    function withdraw(uint32 groupID) payable public returns(uint balance){
        // 그룹의 잔액 확인
        require(groupToBalance[groupID] >= msg.value);
        // 다른 컨트랙트가 대신 호출 불가능
        require(tx.origin == msg.sender);
        // msg.sender가 그룹의 회원인지 확인
        uint8 i;
        for (i=0; i<10; i++){
            if(addressToGroup[msg.sender][i] == groupID) break;
        }
        // 아닐 경우 이벤트 발생후, 트랜잭션 revert
        if (i==10){
            emit notMember(groupID, msg.sender);
            return 0;
        }
        // 그룹의 잔고를 msg.value 만큼 감소
        groupToBalance[groupID] -= msg.value;
        // msg.sender에게 msv.value만큼 이더 전송
        payable(msg.sender).transfer(msg.value);
        return groupToBalance[groupID];
    }

    function joinGroup(uint32 groupID) public returns(bool) {
        // 가입을 신청하는 사람의 남은 가용 그룹수 확인
        uint8 senderGroupCount = canJoinOtherGroup();

        // 더 이상 그룹을 생성하거나 가입 할 수 없는 경우, 이벤트 발생
        if(senderGroupCount == 10) {
            emit outOfLimit();
            return false;
        }
        // 이미 가입된 그룹의 경우 해당하는 이벤트 발생
        if(isAlreadyJoined(groupID)){
            emit alreadyJoined(groupID, msg.sender);
            return false;
        }

        // 가입하려는 그룹의 남은 자리수 확인
        uint i;
        for(i=0; i<10; i++){
            if(groupToMembers[groupID][i] == address(0)) break;
        }

        // 자리가 없으면 이벤트 발생
        if(i==10) {
            emit outOfLimit();
            return false;
        }

        // 가입하려는 그룹에 msg.sender 할당 및 msg.sender의 그룹 현황 갱신
        groupToMembers[groupID][i] = msg.sender;
        addressToGroup[msg.sender][senderGroupCount] = groupID;
        return true;
    }

    function canJoinOtherGroup() private returns(uint8){
        uint8 i;

        // 자신이 만들거나 속해 있는 그룹의 수를 확인
        for (i=0; i<10; i++){
            if (addressToGroup[msg.sender][i] == 0) break;
        }

        return i;
    }

    function isAlreadyJoined(uint32 groupID) private returns(bool){
        uint8 i;

        // 자신이 만들거나 속해 있는 그룹의 수를 확인
        for (i=0; i<10; i++){
            if (groupToMembers[groupID][i] == msg.sender) return true;
            else if (groupToMembers[groupID][i] == address(0)) return false;
        }
        return false;
    }

    function getGroupID() public view returns(uint32[10] memory groups) {
        return addressToGroup[msg.sender];
    }

    function getGroupMembers(uint32 groupID) public view returns(address[10] memory members){
        require(groupToMembers[groupID][0] != address(0));
        return groupToMembers[groupID];
    }

    function getGroupBalance(uint32 groupID) public view returns(uint balance){
        return groupToBalance[groupID];
    }
}