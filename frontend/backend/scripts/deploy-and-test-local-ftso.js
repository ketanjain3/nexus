const hre = require("hardhat");

async function main() {
  console.log("Starting local deploy+test for FTSOPriceReader with mock FTSO\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Deploy mock FTSO
  const Mock = await hre.ethers.getContractFactory("MockFTSOv2");
  const mock = await Mock.deploy();
  await mock.waitForDeployment();
  console.log("MockFTSOv2 deployed at", await mock.getAddress());

  // Deploy reader
  const Reader = await hre.ethers.getContractFactory("FTSOPriceReader");
  const reader = await Reader.deploy();
  await reader.waitForDeployment();
  const readerAddr = await reader.getAddress();
  console.log("FTSOPriceReader deployed at", readerAddr);

  // Set ftso address to mock
  console.log("Setting FTSO v2 address on reader to mock address...");
  const tx = await reader.setFtsoV2Address(await mock.getAddress());
  await tx.wait();

  // Call getContractInfo
  const info = await reader.getContractInfo();
  console.log("Owner:", info[0]);
  console.log("FTSOv2 address:", info[1]);

  // Query FLR/USD price
  console.log('\nQuerying FLR/USD price via reader...');
  const price = await reader.getFlrUsdPrice();
  console.log('getFlrUsdPrice returned:', price);

  // Formatted price
  const formatted = await reader.getFlrUsdPriceFormatted();
  console.log('getFlrUsdPriceFormatted returned:', formatted);

  // Convert 100 FLR
  const flrAmount = hre.ethers.parseEther('100');
  const conversion = await reader.convertFlrToUsd(flrAmount);
  console.log('convertFlrToUsd tx result object:', conversion);

  console.log('\nLocal deploy+test complete');
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
