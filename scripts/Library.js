const hre = require("hardhat");


//Helper Function to get Balance
const getBalance = async (address) => {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}

//Logs the ether balance from a list of address
const printBalances = async (addresses) => {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance => `, await getBalance(address));
    idx++;
  }
}

//Logs the memo stored on chain of the module purchase 
const printMemos = async (memos) => {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const DappUser = memo.name;
    const userAddress = memo.from;
    const module = memo.module;
    console.log(`At ${timestamp}, ${DappUser} (${userAddress}) bought ${module} Module`);
  }
}

const main = async () => {
  //Get some Example Accounts 
  const [owner, user1, user2, user3] = await hre.ethers.getSigners();

  //Get the Contract to be Deployed
  const purchaseModules = await hre.ethers.getContractFactory("libraryModules");
  const libraryModules = await purchaseModules.deploy();
  await libraryModules.deployed();
  console.log(`Contract was deployed to => ${libraryModules.address}`)


  //Check Balances before Module Purchase
  const addresses = [owner.address, user1.address, libraryModules.address];
  console.log("== START ==")
  await printBalances(addresses);


  //Buy a few Modules 
  const purchase = {value: hre.ethers.utils.parseEther("3")};
  await libraryModules.connect(user1).buyModule("Chike", "Solidity ", purchase);
  await libraryModules.connect(user2).buyModule("Nafkem", "Ethers ", purchase);
  await libraryModules.connect(user3).buyModule("Wheezy", "Blockchain For Beginners ", purchase);

  //check the balance after the modules have been purchased 
  console.log("== BOUGHT MODULES ==");
  await printBalances(addresses)

  //WithDraw module purchases 
  const WithDrawPurchases = await libraryModules.connect(owner).withdrawPurchases();
  await WithDrawPurchases.wait()
  console.log("== AFTER WITHDRAWS ==");
  await printBalances(addresses)

  //Read all the Memos
  console.log("== MEMOS ==")
  const memos = await libraryModules.getMemos();
  await printMemos(memos);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});