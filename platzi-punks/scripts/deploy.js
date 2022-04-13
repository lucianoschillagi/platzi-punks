const deploy = async () => {
  const [deployer] = await ethers.getSigners();

  // Indicate which is the account that is deployed the contract
  console.log("Deploying contract with the account", deployer.address);

  // Creates an instance that the deployed contract
  const PlatziPunks = await ethers.getContractFactory("PlatziPunks");
  const deployed = await PlatziPunks.deploy(10000);
  console.log("Platzi Punks is deployed at:", deployed.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
  console.log(error);
  process.exit(1);
});