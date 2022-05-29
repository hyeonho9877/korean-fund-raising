// SPDX-License-Identifier: AFL-3.0
pragma solidity ^0.8.0;

import "./Group.sol";

contract GroupManager {

    mapping(address => address[10]) private joinedGroups; // 특정 address의 가입되어있거나 만든 그룹 매핑

    // 그룹이 성공적으로 생성 되었음
    event groupCreated(
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDesc
    );

    // 새로운 그룹을 생성하는 메소드
    function createGroup(string calldata title, string calldata description) external {
        uint8 index = getMyGroupCount(msg.sender);
        require(index != 10);
        Group newGroup = new Group(payable(msg.sender), title, description, address(this));
        joinedGroups[msg.sender][index] = address(newGroup);
        emit groupCreated(payable(address(newGroup)), msg.sender, title, description);
    }

    // 자신이 속해있는 그룹을 확인하는 메소드
    function getMyGroup() public view returns (address[10] memory){
        return joinedGroups[msg.sender];
    }

    // 자신이 속해있는 그룹의 개수를 확인하는 메소드
    function getMyGroupCount(address target) public view returns(uint8){
        uint8 i;
        for (i = 0; i < 10; i++) {
            if (joinedGroups[target][i] == address(0)) break;
        }
        return i;
    }

    // 자신이 속해있는 그룹의 리스트를 업데이트 하는 메소드
    function updateMyGroup(address target, address groupAddress, uint8 seat) external {
        joinedGroups[target][seat] = groupAddress;
    }
}