
var mechaPunkx = artifacts.require("MechaPunkx");
var mechToken = artifacts.require("MechToken");
var lamboToken = artifacts.require("Lambo");

module.exports = async (deployer, network) => {

	// Deploy MECH Token and MechaPunkx NFT
	await deployer.deploy(mechaPunkx);
	let mechapunkxContract = await mechaPunkx.deployed();
	console.log("MPX addr: ", mechapunkxContract.address);

	// Deploy LAMBO
	await deployer.deploy(lamboToken, mechapunkxContract.address);
	let lamboContract = await lamboToken.deployed();
	console.log("LAMBO addr: ", lamboContract.address);


	/*
	let deployToken = await deployer.deploy(mechToken);
	let deployNFT = await deployer.deploy(mechaPunkx);

	tokenContract = await mechToken.deployed();
	nftContract = await mechaPunkx.deployed();
	
	await tokenContract.setAddress(
		mechaPunkx.address,
		{ gas: 200000 }
	);

	await nftContract.setAddress(
		mechToken.address,
		{ gas: 200000 }
	);
	*/
};


// var mechToken = artifacts.require("MechToken");
// var mechaPunkx = artifacts.require("MechaPunkx");

// module.exports = (deployer, network) => {
//   deployer.deploy(mechToken).then(function() {
//     return deployer.deploy(mechaPunkx, mechToken.address);
//   });
// };