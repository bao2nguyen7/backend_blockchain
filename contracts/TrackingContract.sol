// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Api is Ownable {
    struct Tracking {
        address admin;
        string pid;
        string uid;
        string id;
        string name;
        string location;
        uint256 trackedTime;
        // string description;
        // string[] images;
    }

    struct Product {
        string pid;
        string uid;
        Tracking[] trackingList;
    }

    struct AllProducts {
        string id;
        string uid;
    }

    AllProducts[] getAllProducts;

    // address owner;

    mapping(string => Product) productList;
    mapping(string => Tracking[]) allTracking;

    constructor() {
        // owner = msg.sender;
    }

    function showOwner() public view returns (address) {
        return Ownable.owner();
    }

    function checkProductExists(string memory _pid, string memory _uid)
        public
        view
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(productList[_uid].pid)) ==
            keccak256(abi.encodePacked(_pid));
    }

    function createProduct(string calldata _pid, string calldata _uid)
        external
    {
        require(
            checkProductExists(_pid, _uid) == false,
            "Product is already existed"
        );
        require(bytes(_pid).length > 0, "Product id cannot be empty");
        productList[_uid].pid = _pid;
        productList[_uid].uid = _uid;

        getAllProducts.push(AllProducts(_pid, _uid));
    }

    function getProductID(string calldata _uid, string memory _pid)
        external
        view
        returns (Product memory)
    {
        require(
            checkProductExists(_pid, _uid) == true,
            "Product is not created"
        );
        return productList[_uid];
    }

    function addTracking(
        address _admin,
        string memory _pid,
        string calldata _uid,
        string calldata _id,
        string calldata _name,
        string calldata _location,
        uint256 _trackedTime
        // string[] calldata _images
    ) external onlyOwner {
        require(checkProductExists(_pid, _uid), "Create product first");
        // require(checkTrackingExisted(_pid, _uid, _id), "Tracking is existed");
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        // _addTracking(msg.sender, productId, id, name);
        _addTracking(
            _admin,
            productList[_uid].pid,
            _uid,
            _id,
            _name,
            _location,
            _trackedTime
        );
    }

    function _addTracking(
        address _admin,
        string memory _pid,
        string memory _uid,
        string memory _id,
        string memory _name,
        string memory _location,
        uint256 _trackedTime
    ) internal onlyOwner {
        Tracking memory newTracking = Tracking(
            _admin,
            _pid,
            _uid,
            _id,
            _name,
            _location,
            _trackedTime
        );
        productList[_uid].trackingList.push(newTracking);
    }

    function getTrackingList(string calldata _uid)
        external
        view
        returns (Tracking[] memory)
    {
        return productList[_uid].trackingList;
    }

    function getAllListProducts() public view returns (AllProducts[] memory) {
        return getAllProducts;
    }
    // function checkTrackingExists(address id1, address id2) internal view returns (bool){
    //     if(productList[id1].trackingList.length > productList[id2].trackingList.length)
    //     {
    //         address tmp = id1;
    //         id1 = id2;
    //         id2 = tmp;
    //     }

    //     for(uint i = 0; i < productList[id1].trackingList.length; i++)
    //         if(productList[id1].trackingList.id = id2) return true

    //     return false;
    // }
}
