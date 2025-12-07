// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IFTSOv2.sol";

contract MockFTSOv2 is IFTSOv2 {
    // Simple mock that returns a fixed price for FLR/USD and BTC/USD
    mapping(bytes21 => uint256) public values;
    mapping(bytes21 => int8) public decimals;
    uint64 public lastTs;

    constructor() {
        // Example: FLR/USD = 2500 with 5 decimals => 0.02500 USD
        bytes21 flr = 0x01464c522f55534400000000000000000000000000;
        values[flr] = 2500;
        decimals[flr] = 5;

        bytes21 btc = 0x014254432f55534400000000000000000000000000;
        values[btc] = 6000000; // example
        decimals[btc] = 5;

        lastTs = uint64(block.timestamp);
    }

    function getFeedById(bytes21 feedId) external payable returns (
        uint256 value,
        int8 dec,
        uint64 timestamp
    ) {
        value = values[feedId];
        dec = decimals[feedId];
        timestamp = lastTs;
        return (value, dec, timestamp);
    }

    function getFeedsById(bytes21[] calldata feedIds) external payable returns (
        uint256[] memory vals,
        int8[] memory decs,
        uint64 timestamp
    ) {
        uint len = feedIds.length;
        vals = new uint256[](len);
        decs = new int8[](len);
        for (uint i = 0; i < len; i++) {
            vals[i] = values[feedIds[i]];
            decs[i] = decimals[feedIds[i]];
        }
        timestamp = lastTs;
        return (vals, decs, timestamp);
    }

    // Helper to update mock values
    function setFeed(bytes21 feedId, uint256 val, int8 dec) external {
        values[feedId] = val;
        decimals[feedId] = dec;
        lastTs = uint64(block.timestamp);
    }
}
