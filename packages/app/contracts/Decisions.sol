pragma solidity ^0.5.0;

contract Decisions {
    event NewDecision(
        uint certId, 
        string pollId, 
        string topic, 
        string pollResult
    );
	
    struct Decision {
        string pollId;
        string topic;
        string pollResult;
    }

    Decision[] public decisions;

    mapping(uint => address) public decisionToOwner;
    mapping (address => uint) public ownerDecisionCount;

    function _createDecision(string memory _pollId, string memory _topic, string memory _pollResult) public {
        uint id = decisions.push(Decision(_pollId, _topic, _pollResult)) - 1;
        decisionToOwner[id] = msg.sender;
        ownerDecisionCount[msg.sender]++;
        emit NewDecision(id, _pollId, _topic, _pollResult);
    }
    
    function _getDecision(uint index) public view returns(string memory, string memory, string memory) {
        return (
            decisions[index].pollId, 
            decisions[index].topic, 
            decisions[index].pollResult
        );
    }
    
    function _getOwnerCount () public view returns (uint) {
        return ownerDecisionCount[msg.sender];
    }
}