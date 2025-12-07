// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ROSCAPool {
    struct Pool {
        uint256 id;
        uint256 contributionAmount;
        address[] members;
        uint256 currentRound;
        bool isActive;
        mapping(address => bool) isMember;
        mapping(address => uint256) collateralBalances;
        mapping(uint256 => mapping(address => bool)) hasContributed;
        mapping(address => bool) hasPaid;
    }

    uint256 public poolCount;
    mapping(uint256 => Pool) public pools;
    uint256 public constant MAX_MEMBERS = 6;
    uint256 public constant COLLATERAL_PERCENTAGE = 10;

    event PoolCreated(uint256 indexed poolId, address creator, uint256 contributionAmount);
    event MemberJoined(uint256 indexed poolId, address member);
    event CollateralDeposited(uint256 indexed poolId, address member, uint256 amount);
    event ContributionMade(uint256 indexed poolId, address member, uint256 round, uint256 amount);
    event PayoutExecuted(uint256 indexed poolId, address recipient, uint256 amount, uint256 round);
    event CollateralReturned(uint256 indexed poolId, address member, uint256 amount);
    event PoolCompleted(uint256 indexed poolId);

    function createPool(uint256 _contributionAmount) external {
        require(_contributionAmount > 0, "Contribution must be greater than 0");

        uint256 poolId = poolCount++;
        Pool storage pool = pools[poolId];
        
        pool.id = poolId;
        pool.contributionAmount = _contributionAmount;
        pool.currentRound = 0;
        pool.isActive = true;
        
        pool.members.push(msg.sender);
        pool.isMember[msg.sender] = true;

        emit PoolCreated(poolId, msg.sender, _contributionAmount);
        emit MemberJoined(poolId, msg.sender);
    }

    function joinPool(uint256 _poolId) external payable {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool is not active");
        require(!pool.isMember[msg.sender], "Already a member");
        require(pool.members.length < MAX_MEMBERS, "Pool is full");

        uint256 collateral = (pool.contributionAmount * COLLATERAL_PERCENTAGE) / 100;
        require(msg.value == collateral, "Incorrect collateral amount");

        pool.members.push(msg.sender);
        pool.isMember[msg.sender] = true;
        pool.collateralBalances[msg.sender] = collateral;

        emit MemberJoined(_poolId, msg.sender);
        emit CollateralDeposited(_poolId, msg.sender, collateral);
    }

    function contribute(uint256 _poolId) external payable {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool is not active");
        require(pool.isMember[msg.sender], "Not a member");
        require(pool.members.length == MAX_MEMBERS, "Pool not full yet");
        require(!pool.hasContributed[pool.currentRound][msg.sender], "Already contributed this round");
        require(msg.value == pool.contributionAmount, "Incorrect contribution amount");

        pool.hasContributed[pool.currentRound][msg.sender] = true;

        emit ContributionMade(_poolId, msg.sender, pool.currentRound, msg.value);
    }

    function executePayout(uint256 _poolId) external {
        Pool storage pool = pools[_poolId];
        require(pool.isActive, "Pool is not active");
        require(pool.members.length == MAX_MEMBERS, "Pool not full");

        // Check all members contributed
        for (uint256 i = 0; i < pool.members.length; i++) {
            require(pool.hasContributed[pool.currentRound][pool.members[i]], "Not all members contributed");
        }

        // Get recipient (round-robin)
        address recipient = pool.members[pool.currentRound];
        require(!pool.hasPaid[recipient], "Recipient already paid");

        uint256 payoutAmount = pool.contributionAmount * MAX_MEMBERS;
        pool.hasPaid[recipient] = true;

        // Transfer payout
        payable(recipient).transfer(payoutAmount);

        emit PayoutExecuted(_poolId, recipient, payoutAmount, pool.currentRound);

        // Move to next round
        pool.currentRound++;

        // Check if pool completed
        if (pool.currentRound >= MAX_MEMBERS) {
            pool.isActive = false;
            emit PoolCompleted(_poolId);
        }
    }

    function returnCollateral(uint256 _poolId) external {
        Pool storage pool = pools[_poolId];
        require(!pool.isActive, "Pool still active");
        require(pool.currentRound >= MAX_MEMBERS, "Pool not completed");

        for (uint256 i = 0; i < pool.members.length; i++) {
            address member = pool.members[i];
            uint256 collateral = pool.collateralBalances[member];
            
            if (collateral > 0) {
                pool.collateralBalances[member] = 0;
                payable(member).transfer(collateral);
                emit CollateralReturned(_poolId, member, collateral);
            }
        }
    }

    function getPoolMembers(uint256 _poolId) external view returns (address[] memory) {
        return pools[_poolId].members;
    }

    function hasContributed(uint256 _poolId, uint256 _round, address _member) external view returns (bool) {
        return pools[_poolId].hasContributed[_round][_member];
    }

    function getPoolInfo(uint256 _poolId) external view returns (
        uint256 id,
        uint256 contributionAmount,
        uint256 memberCount,
        uint256 currentRound,
        bool isActive
    ) {
        Pool storage pool = pools[_poolId];
        return (
            pool.id,
            pool.contributionAmount,
            pool.members.length,
            pool.currentRound,
            pool.isActive
        );
    }
}
