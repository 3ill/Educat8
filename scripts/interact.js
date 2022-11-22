require("dotenv").config();
const { ethers, network } = require("hardhat");
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");
const {API, CONTRACT_ADDRESS, PRIVATE_KEY} = process.env;

const contract = require("../artifacts/contracts/Educ8.sol/Educat8.json");

const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${API}`)
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const Educ8Contract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

const main = async () => {
  const contractName = await Educ8Contract.name()
  console.log(`Contract Name => ${contractName}`)

  const symbol = await Educ8Contract.symbol()
  console.log(`\nContract symbol => ${symbol}`)
}
main();