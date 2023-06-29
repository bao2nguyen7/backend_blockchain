// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "../node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract Api is Ownable, EIP712 {
    using ECDSA for bytes32;
    enum ProductStatus {
        CREATED,
        UPDATED,
        DELETED,
        DELIVERIED
    }

    struct Tracking {
        address admin;
        string productId;
        string id;
        string name;
        string[] images;
        string description;
        string[] notes;
        string trackedTime;
    }

    struct Product {
        address admin;
        string id;
        string userId;
        string name;
        string location;
        string createdTime;
        ProductStatus status;
        Tracking[] trackingList;
    }

    struct AllProducts {
        string id;
        string userId;
        string name;
        string location;
        string createdTime;
        ProductStatus status;
    }

    AllProducts[] getAllProducts;

    event productCreated(string productId);
    event productUpdated(string productId);
    event productDeleted(string productId);
    event productDeliveried(string productId);

    mapping(string => Product) productList;
    mapping(string => Tracking[]) allTracking;

    address public signer;

    constructor(string memory _name, string memory _version)
        EIP712(_name, _version)
    {
        signer = msg.sender;
    }

    function showOwner() public view returns (address) {
        return Ownable.owner();
    }

    function checkProductExists(string memory _productId)
        public
        view
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(productList[_productId].id)) ==
            keccak256(abi.encodePacked(_productId));
    }

    function checkTrackingExists(string memory _productId, string memory _id)
        public
        view
        returns (bool)
    {
        if (productList[_productId].trackingList.length < 0) return false;

        for (
            uint256 i = 0;
            i < productList[_productId].trackingList.length;
            i++
        )
            if (
                keccak256(
                    abi.encodePacked(productList[_productId].trackingList[i].id)
                ) == keccak256(abi.encodePacked(_id))
            ) return true;
    }

    function getStatusProduct(string memory _productId)
        public
        view
        returns (ProductStatus)
    {
        return productList[_productId].status;
    }

    function validateAmountFunction(
        string calldata _productId,
        string calldata _userId,
         string calldata _name,
        string calldata _location,
        string calldata _createdTime,
        bytes memory _signature
    ) internal view returns (address) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("Product(string _productId, string _userId, string _name, string _location, string _createdTime)"),
                    keccak256(bytes(_productId)),
                    keccak256(bytes(_userId)),
                    keccak256(bytes(_name)),
                    keccak256(bytes(_location)),
                    keccak256(bytes(_createdTime))
                )
            )
        );
        address signer = ECDSA.recover(digest, _signature);
        // require(signer == msg.sender, "MessageVerifier: invalid signature");
        // require(signer != address(0), "ECDSAUpgradeable: invalid signature");
        return signer;
    }

    // function generateSignature(string memory _productId, string memory _userId) public pure returns (bytes memory) {
    //     bytes32 messageHash = keccak256(abi.encodePacked(_productId, _userId));
    //     bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
    //     (bytes32 r, bytes32 s, uint256 v) = ecrecover(prefixedHash, 0, 0, 0);
    //     return abi.encodePacked(r, s, v);
    // }

    function testValidation(
        string calldata _productId,
        string calldata _userId,
         string calldata _name,
        string calldata _location,
        string calldata _createdTime,
        bytes memory _signature
    ) public view returns (address) {
        return validateAmountFunction(_productId, _userId, _name, _location, _createdTime, _signature);
    }

     function verify(
        address _signer,
        bytes32 _ethSignedMessageHash,
        bytes32 r,
        bytes32 s,
        uint8 v
    ) public pure returns (bool) {
        address expectedSigner = ecrecover(_ethSignedMessageHash, v, r, s);
        return expectedSigner == _signer;
    }

    function createProduct(
        address admin,
        string calldata _productId,
        string calldata _userId,
        string calldata _name,
        string calldata _location,
        string calldata _createdTime
    ) external onlyOwner {
        // require(verify(msg.sender, digest, r, s, v), "Invalid signature");
        require(
            checkProductExists(_productId) == false,
            "Product is already existed"
        );
        require(bytes(_productId).length > 0, "Product id cannot be empty");
        
        productList[_productId].id = _productId;
        productList[_productId].userId = _userId;
        productList[_productId].name = _name;
        productList[_productId].location = _location;
        productList[_productId].createdTime = _createdTime;
        productList[_productId].status = ProductStatus.CREATED;

        getAllProducts.push(
            AllProducts(
                _productId,
                _userId,
                _name,
                _location,
                _createdTime,
                ProductStatus.CREATED
            )
        );

        emit productCreated(_productId);
    }


    function updateProduct(address _admin, string memory _productId)
        external
        onlyOwner
    {
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        require(
            productList[_productId].status != ProductStatus.DELETED,
            "Product is deleted, You can not update information"
        );
        require(
            productList[_productId].status != ProductStatus.DELIVERIED,
            "Product is deliveried, You can not update information"
        );

        productList[_productId].status = ProductStatus.UPDATED;

        for (uint256 i = 0; i < getAllProducts.length; i++) {
            if (
                keccak256(abi.encodePacked(getAllProducts[i].id)) ==
                keccak256(abi.encodePacked(_productId))
            ) getAllProducts[i].status = ProductStatus.UPDATED;
        }

        emit productUpdated(_productId);
    }

    function deliveryProduct(
        address _admin,
        string memory _productId,
        string calldata _id,
        string calldata _name,
        string[] memory _images,
        string calldata _description,
        string[] memory _notes,
        string memory _deliveryTime
    ) external onlyOwner {
        require(checkProductExists(_productId), "Create product first");
        require(
            checkTrackingExists(_productId, _id) == false,
            "Tracking is existed"
        );
        require(
            productList[_productId].status != ProductStatus.DELETED,
            "Product is deleted, You can not delivery!!!"
        );
        require(
            productList[_productId].status != ProductStatus.DELIVERIED,
            "Product is deliveried, You can not delivery again!!!"
        );
        // require(checkTrackingExisted(_productId, _userId, _id), "Tracking is existed");
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        // _addTracking(msg.sender, productId, id, name);
        _addTracking(
            _admin,
            productList[_productId].id,
            _id,
            _name,
            _images,
            _description,
            _notes,
            _deliveryTime
        );

        productList[_productId].status = ProductStatus.DELIVERIED;

        for (uint256 i = 0; i < getAllProducts.length; i++) {
            if (
                keccak256(abi.encodePacked(getAllProducts[i].id)) ==
                keccak256(abi.encodePacked(_productId))
            ) getAllProducts[i].status = ProductStatus.DELIVERIED;
        }
        emit productDeliveried(_productId);
    }

    function deleteProduct(address _admin, string memory _productId)
        external
        onlyOwner
    {
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        require(
            productList[_productId].status != ProductStatus.DELETED,
            "Product is deleted, You can not delete again!!!"
        );
        require(
            productList[_productId].status != ProductStatus.DELIVERIED,
            "Product is deliveried, You can not delete product!!!"
        );

        productList[_productId].status = ProductStatus.DELETED;

        for (uint256 i = 0; i < getAllProducts.length; i++) {
            if (
                keccak256(abi.encodePacked(getAllProducts[i].id)) ==
                keccak256(abi.encodePacked(_productId))
            ) getAllProducts[i].status = ProductStatus.DELETED;
        }

        emit productDeleted(_productId);
    }

    function getProduct(
        // string memory _addressContract,
        string memory _productId
    ) external view returns (Product memory) {
        require(
            checkProductExists(_productId) == true,
            "Product is not created"
        );
        // require(verify(_addressContract, _productId, ));

        return productList[_productId];
    }

    function addTracking(
        address _admin,
        string memory _productId,
        string calldata _id,
        string calldata _name,
        string[] memory _images,
        string calldata _description,
        string[] memory _notes,
        string memory _trackedTime
    ) external onlyOwner {
        require(checkProductExists(_productId), "Create product first");
        require(
            checkTrackingExists(_productId, _id) == false,
            "Tracking is existed"
        );
        // require(checkTrackingExisted(_productId, _userId, _id), "Tracking is existed");
        require(
            _admin == Ownable.owner(),
            "You need to be provided administration!"
        );
        // _addTracking(msg.sender, productId, id, name);
        _addTracking(
            _admin,
            productList[_productId].id,
            _id,
            _name,
            _images,
            _description,
            _notes,
            _trackedTime
        );
    }

    function _addTracking(
        address _admin,
        string memory _productId,
        string memory _id,
        string memory _name,
        string[] memory _images,
        string memory _description,
        string[] memory _notes,
        string memory _trackedTime
    ) internal onlyOwner {
        Tracking memory newTracking = Tracking(
            _admin,
            _productId,
            _id,
            _name,
            _images,
            _description,
            _notes,
            _trackedTime
        );
        productList[_productId].trackingList.push(newTracking);
    }

    function getTrackingList(string calldata _productId)
        external
        view
        returns (Tracking[] memory)
    {
        return productList[_productId].trackingList;
    }

    function getAllListProducts() public view returns (AllProducts[] memory) {
        return getAllProducts;
    }
}

