const hre = require("hardhat")

const main = async () => {
  const library = await hre.ethers.getContractFactory("libraryModules")
  const libraryModules = await library.deploy();
  await libraryModules.deployed();

  console.log(
    `Library Contract Deployed => ${libraryModules.address}`
  )
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
