// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Api is Ownable {
    enum ProductStatus {
        CREATED,
        UPDATED,
        DELETED,
        DELIVERIED
    }

    struct Tracking {
        address admin;
        string pid;
        string uid;
        string id;
        string name;
        string location;
        uint256 trackedTime;
    }

    struct Product {
        address admin;
        string id;
        string uid;
        string name;
        string location;
        uint256 createdTime;
        ProductStatus status;
        Tracking[] trackingList;
    }

    struct AllProducts {
        string id;
        string uid;
    }

    AllProducts[] getAllProducts;
    Tracking public removeMe;

    event productCreated(string uid, string pid);
    event productUpdated(string uid, string pid);
    event productDeleted(string uid, string pid);
    event productDeliveried(string uid, string pid);

    mapping(string => Product) productList;
    mapping(string => Tracking[]) allTracking;

    constructor() {
        // owner = msg.sender;
    }

    function showOwner() public view returns (address) {
        return Ownable.owner();
    }

    function checkProductExists(string memory _pid) public view returns (bool) {
        return
            keccak256(abi.encodePacked(productList[_pid].id)) ==
            keccak256(abi.encodePacked(_pid));
    }

    function checkTrackingExists(string memory _pid, string memory _id)
        public
        view
        returns (bool)
    {
        if (productList[_pid].trackingList.length < 0) return false;

        for (uint256 i = 0; i < productList[_pid].trackingList.length; i++)
            if (
                keccak256(
                    abi.encodePacked(productList[_pid].trackingList[i].id)
                ) == keccak256(abi.encodePacked(_id))
            ) return true;
    }

    function getStatusProduct(string memory _pid)
        public
        view
        returns (ProductStatus)
    {
        return productList[_pid].status;
    }

    function createProduct(
        address _admin,
        string calldata _pid,
        string calldata _uid,
        string calldata _name,
        string calldata _location
    ) external onlyOwner {
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        require(
            checkProductExists(_pid) == false,
            "Product is already existed"
        );
        require(bytes(_pid).length > 0, "Product id cannot be empty");
        // productList[_pid]. = _pid;
        productList[_pid].id = _pid;
        productList[_pid].uid = _uid;
        productList[_pid].name = _name;
        productList[_pid].location = _location;
        productList[_pid].createdTime = block.timestamp;
        productList[_pid].status = ProductStatus.CREATED;

        getAllProducts.push(AllProducts(_pid, _uid));

        emit productCreated(_uid, _pid);
    }

    function updateProduct(address _admin, string memory _pid, string memory _uid)
        external onlyOwner
        // returns (ProductStatus)
    {
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        // require(
        //     checkProductExists(_pid) == true,
        //     "Product is already existed"
        // );
        // require(bytes(_pid).length > 0, "Product id cannot be empty");
        productList[_pid].status = ProductStatus.UPDATED;

        emit productUpdated(_pid, _uid);

        // return productList[_pid].status;
    }

    function deliveryProduct(address _admin, string memory _pid, string memory _uid)
        external
        // returns (ProductStatus)
    {
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        // require(
        //     checkProductExists(_pid) == true,
        //     "Product is already existed"
        // );
        // require(bytes(_pid).length > 0, "Product id cannot be empty");

        productList[_pid].status = ProductStatus.DELIVERIED;
        emit productUpdated(_pid, _uid);

        // return productList[_pid].status;
    }

    function deleteProduct(address _admin, string memory _pid, string memory _uid)
        external
        // returns (ProductStatus)
    {
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        // require(
        //     checkProductExists(_pid) == true,
        //     "Product is already existed"
        // );
        // require(bytes(_pid).length > 0, "Product id cannot be empty");

        productList[_pid].status = ProductStatus.DELETED;
        emit productUpdated(_pid, _uid);

        // return productList[_pid].status;
    }

    function getProduct(string memory _pid)
        external
        view
        returns (Product memory)
    {
        require(checkProductExists(_pid) == true, "Product is not created");
        return productList[_pid];
    }

    function addTracking(
        address _admin,
        string memory _pid,
        string calldata _uid,
        string calldata _id,
        string calldata _name,
        string calldata _location
    )
        external
        // string[] calldata _images
        onlyOwner
    {
        require(checkProductExists(_pid), "Create product first");
        require(checkTrackingExists(_pid, _id) == false, "Tracking is existed");
        // require(checkTrackingExisted(_pid, _uid, _id), "Tracking is existed");
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        // _addTracking(msg.sender, productId, id, name);
        _addTracking(
            _admin,
            productList[_pid].id,
            _uid,
            _id,
            _name,
            _location,
            block.timestamp
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
            block.timestamp
        );
        productList[_pid].trackingList.push(newTracking);
    }

    function getTrackingList(string calldata _pid)
        external
        view
        returns (Tracking[] memory)
    {
        return productList[_pid].trackingList;
    }

    function getAllListProducts() public view returns (AllProducts[] memory) {
        return getAllProducts;
    }
}
