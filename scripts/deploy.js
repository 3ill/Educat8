const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("Educat8");
  const contract = await Contract.deploy()
  await contract.deployed()

  console.log(`Contract Deployed To => ${contract.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
