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
        Group newGroup = new Group(payable(msg.sender), title, description, address(this));
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

    function getMyGroupCount(address target) external view returns(uint8){
        uint8 i;
        for (i = 0; i < 10; i++) {
            if (joinedGroups[target][i] == address(0)) break;
        }
        return i;
    }
    function updateMyGroup(address target, address groupAddress, uint8 seat) external {
        joinedGroups[target][seat] = groupAddress;
    }
}