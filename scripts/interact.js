require("dotenv").config();
const { ethers, network } = require("hardhat");
const hre = require("hardhat");
const {API, CONTRACT_ADDRESS, PRIVATE_KEY} = process.env;


//Get the contratc ABI 
const contract = require("../artifacts/contracts/Educ8.sol/Educat8.json");
const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${API}`)

//Create a wallet & an ethers instance of the contract 
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const Educ8Contract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);


const uri = "ipfs://QmYAB1SmAFEp71zTSXYSv7ptehD76vsjmQSqC89QBhkFzi";
const address = "0x1aBb983Ab5602885dFFB23BCDCbf3dC83e858AB9";

const main = async () => {
  const contractName = await Educ8Contract.name()
  console.log(`Contract Name => ${contractName}`)

  const symbol = await Educ8Contract.symbol()
  console.log(`\nContract symbol => ${symbol}`)
  
  const mint = await Educ8Contract.safeMint(address, uri )
  await mint.wait()
  console.log(`Successfully Minted to Educ8 => ${address}`)

  const balance = await Educ8Contract.balanceOf(address)
  console.log(`Address Balance => ${balance}`)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
