// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract my {
    address public partyA;
    address public partyB;
    uint256 public dt;
    bool public isFunds;

    constructor(address _partyB) payable {
        partyA = msg.sender;
        partyB = _partyB;
        dt = msg.value;
    }

    modifier onlyPartyB() {
        require(msg.sender == partyB, "Only Party B can call this function");
        _;
    }

    modifier fundsNotReleased() {
        require(!isFunds, "Funds have already been released");
        _;
    }

    function releaseFunds() public onlyPartyB fundsNotReleased {
        isFunds = true;
        (bool success, ) = payable(partyB).call{value: dt}("");
        require(success, "Failed to transfer funds to Party B");
    }

    function getDepositedAmount() public view returns (uint256) {
        return dt;
    }
}