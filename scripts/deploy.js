
const hre = require("hardhat");

async function main() {

  const Coffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const coffee = await Coffee.deploy();

  await coffee.deployed();

  console.log("Deployed contract address: ",`${coffee.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//contract address: 0xF3F4B1Bc2466707b7C1290fB9f073369D6DE5d8B