// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract BuyMeACoffee {
    //Event to emit when Memo is created
    event newMemo(address, uint256, string, string);

    //Memo struct
    struct Memo {
        address from;
        uint256 time;
        string name;
        string message;
    }

    //List of all memos receive from friends
    Memo[] public memoList;

    //Address of contract deployer
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev buy a coffe for contract owner
     * @param _name name of the coffee buyer
     * @param _message a message from the coffee buyer
     */
    function buyCoffee(
        string memory _name,
        string memory _message
    ) external payable {
        require(msg.value > 0, "Can't buy coffee with 0 eth");
        //transfer to owner
        owner.transfer(msg.value);
        //add the memo to storage
        memoList.push(Memo(msg.sender, block.timestamp, _name, _message));
        //emit log event when memo is created
        emit newMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev retrieve all the memos received and stored in the blockchain
     */
    function getMemos() public view returns (Memo[] memory) {
        return memoList;
    }
}
