const {
  ecsign
} = require("ethereumjs-util");
const {
  getMessage
} = require("eip-712");

exports.signMessage = (verifyingContract, message, privateKey) => {
  const typeData = {
    types: {
      EIP712Domain: [{
          name: "name",
          type: "string"
        },
        {
          name: "version",
          type: "string"
        },
        {
          name: "chainId",
          type: "uint256"
        },
        {
          name: "verifyingContract",
          type: "address"
        },
      ],
      Product: [{
          name: "_productId",
          type: "string"
        },
        {
          name: "_userId",
          type: "string"
        },
        {
          name: "_name",
          type: "string"
        },
        {
          name: "_location",
          type: "string"
        },
        {
          name: "_createdTime",
          type: "string"
        }
      ],
    },
    primaryType: "Product",
    domain: {
      name: "Traceability Agriculture",
      version: "1",
      chainId: 11155111,
      verifyingContract,
    },
    message,
  };

  const messageFromData = getMessage(typeData, true);
  const {
    r,
    s,
    v
  } = ecsign(messageFromData, Buffer.from(privateKey, "hex")); // return ecdsa signature include r, s, v

  return `0x${r.toString("hex")}${s.toString("hex")}${v.toString(16)}`; // combine into message
};