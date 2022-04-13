const { expect } = require("chai");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Platzi Punks Contract", () => {
  const setup = async ({ maxSupply = 1000 }) => {
    const [owner] = await ethers.getSigners();xY
    const PlatziPunks = await ethers.getContractFactory("PlatziPunks");

    // NOTE: el 'deploy' es equivalente al constructor del sc
    const deployed = await PlatziPunks.deploy(maxSupply);

    return {
      owner,
      deployed,
    };
  };

  describe("Deployment", () => {
    it("Set max supply to passed param", async () => {
      const maxSupply = 4000;

      const { deployed } = await setup({ maxSupply });

      const returnedMaxSupply = await deployed.maxSupply();

      expect(maxSupply).to.equal(returnedMaxSupply);
    });
  });

  describe("Minting", () => {
    it("Mints a new token and assings it to owner", async () => {
      const { owner, deployed } = await setup({});

      await deployed.mint();

      const ownerOfMinted = await deployed.ownerOf(0);

      expect(ownerOfMinted).to.equal(owner.address);
    });
  });

  it("Has a minting limit", async () => {
    const maxSupply = 2;
    const { deployed } = await setup({ maxSupply });

    // Mint all
    await Promise.all([deployed.mint(), deployed.mint()]);

    // Assert the last minting

    await expect(deployed.mint()).to.be.revertedWith("No PlatziPunks left :(");
  });

  describe("tokenURI", () => {
    it("returns valid metadata", async () => {
      const { deployed } = await setup({});

      await deployed.mint();

      const tokenURI = await deployed.tokenURI(0);

      const stringifiedTokenURI = await tokenURI.toString();

      const [prefix, base64JSON] = stringifiedTokenURI.split(
        "data:application/json;base64"
      );

      const stringifiedMetadata = await Buffer.from(
        base64JSON,
        "base64"
      ).toString("ascii");

      const metadata = JSON.parse(stringifiedMetadata);

      expect(metadata).to.have.all.keys("name", "description", "image");
    });
  });
});
