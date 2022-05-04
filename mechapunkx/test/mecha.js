const MechaPunkx = artifacts.require('./MechaPunkx.sol');
const MechToken = artifacts.require('./MechToken.sol');
const Lambo = artifacts.require('./Lambo.sol');

//const truffleAssert = require('truffle-assertions');

require('chai')
	.use(require('chai-as-promised'))
	.should()

// https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts
/*
contract('MechaPunkx', (accounts) => {
	
	let contract

	before(async () => {
		contract = await MechaPunkx.deployed();
		accounts = await web3.eth.getAccounts();
	})

	describe('deployment', async () => {
		it('deploys successfully', async () => {
			const address = contract.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		// Check privacy
		it('has ok privacy', async () => {
			await contract.startEarning(0, {from: accounts[1]}).should.be.rejected;
		})

		it('pending is 0 for unminted', async () => {
			let pending = await contract.pendingBalance(0).should.be.rejected;
			// console.log("Pending: ", pending.toNumber());
			pending = await contract.pendingBalance(1).should.be.rejected;
			// console.log("Pending: ", pending.toNumber());
		});

		it('maxEarned counts as days progress', async () => {

			let startTime = await contract.startTime();
			console.log("Start time: ", startTime.toNumber()); // 1649745568
			let maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned, 0);

			await contract.setStartTime(startTime - 100000);
			startTime = await contract.startTime();
			console.log("Start time: ", startTime.toNumber());
			maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());

			await contract.setStartTime(startTime - 200000);
			startTime = await contract.startTime();
			console.log("Start time: ", startTime.toNumber());
			maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());

			await contract.setStartTime(startTime - 300000);
			startTime = await contract.startTime();
			console.log("Start time: ", startTime.toNumber());
			maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());

			await contract.setStartTime(startTime - 400000);
			startTime = await contract.startTime();
			console.log("Start time: ", startTime.toNumber());
			maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.isAbove(maxEarned.toNumber(), 1);

			// Pending should be 0 with no NFT's minted, after a few days
			let pending = await contract.pendingBalance(0).should.be.rejected;
			// console.log("Pending: ", pending.toNumber());
			// assert.equal(pending.toNumber(), 0);
			pending = await contract.pendingBalance(1).should.be.rejected;
			// console.log("Pending: ", pending.toNumber());
			// assert.equal(pending.toNumber(), 0);

			// s per day 86400
			//uint nDays = (block.timestamp - startTime) / 1 days;

			// maxEarned = await contract.maxEarned();
			// // assert.equal(totalSupply.toNumber(), 0);
			// console.log("maxEarned: ", maxEarned.toNumber());
			// await new Promise(r => setTimeout(r, 5000));

			// maxEarned = await contract.maxEarned();
			// // assert.equal(totalSupply.toNumber(), 0);
			// console.log("maxEarned2: ", maxEarned.toNumber());
			//const itemPrice = await contract.itemPrice();
			//console.log("itemPrice: ", itemPrice);
		})

		it('mintingTokens works', async () => {

			let tokExists = await contract.tokenExists(0);
			// console.log("Tok exists: ", tokExists);
			assert.equal(tokExists, false);

			tokExists = await contract.tokenExists(1);
			// console.log("Tok exists: ", tokExists);
			assert.equal(tokExists, false);

			await contract.mintToken(1);
			tokExists = await contract.tokenExists(0);
			assert.equal(tokExists, false);
			tokExists = await contract.tokenExists(1);
			assert.equal(tokExists, true);

			await contract.mintToken(0);
			tokExists = await contract.tokenExists(0);
			assert.equal(tokExists, true);
			tokExists = await contract.tokenExists(1);
			assert.equal(tokExists, true);
			tokExists = await contract.tokenExists(2);
			assert.equal(tokExists, false);
		});


		it('doesn\'t cost crazy amounts to deploy', async () => {
			const amountOfGas = await MechaPunkx.new.estimateGas(); // contract.somefunction.estimateGas(params)
			console.log("Gas cost to deply, estimated: ", amountOfGas);
			// 3945161
			// cost is gas * gas price
			//console.log("Estimate in eth: ", web3.utils.fromWei(something "ether"));
			assert.isBelow(amountOfGas, 2500000);
		})
	});
});


contract('MechaPunkx', (accounts) => {
	
	let contract

	before(async () => {
		contract = await MechaPunkx.deployed();
		accounts = await web3.eth.getAccounts();
	})

	describe('deployment', async () => {
		it('deploys successfully', async () => {
			const address = contract.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it('earning works', async () => {

			let startTime = await contract.startTime();
			console.log("Start time: ", startTime.toNumber());
			let maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned.toNumber(), 0);
			let day = 0;

			async function passDays(n, tStart, dayStart) {
				let t = tStart;
				for (let i=0; i < n; i++) {
					t -= 86400
					await contract.setStartTime(t);
					maxEarned = await contract.maxEarned();
					console.log("Day: ", dayStart + i + 1);
					console.log("\tmaxEarned: ", maxEarned.toNumber());
					// pending = await contract.pendingBalance(0);
					// console.log("\tpending: ", pending.toNumber());
					// claimableBalance = await contract.claimableBalance(0);
					// console.log("\tclaimableBal: ", claimableBalance.toNumber());
					// console.log("\n");
				}
			}

			await contract.mintToken(0);
			// Reset the claimed to maxEarned
			await contract.startEarning(0)
			//await contract.mintToken(1);
			
			maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned, 0);

			// Step forward 8 days (by lowering start time)
			let t = startTime;
			let claimableBalance;
			let pending;
			for (let i=0; i < 8; i++) {
				t -= 86400
				day += 1;
				await contract.setStartTime(t);
				
				// startTime = await contract.startTime();
				// console.log("Start time: ", startTime.toNumber());
				maxEarned = await contract.maxEarned();
				console.log("Day: ", day);
				console.log("\tmaxEarned: ", maxEarned.toNumber());
				pending = await contract.pendingBalance(0);
				console.log("\tpending: ", pending.toNumber());
				claimableBalance = await contract.claimableBalance(0);
				console.log("\tclaimableBal: ", claimableBalance.toNumber());
				console.log("\n");
			}

			// Try claim
			await contract.claim(0);
			let bal = await contract.balanceOf(accounts[0]);
			console.log("Attempted claim, current bal: ", bal.toNumber());
			assert.equal(bal.toNumber(), 8);
			pending = await contract.pendingBalance(0);
			console.log("pending: ", pending.toNumber())
			assert.equal(pending.toNumber(), 0);

			// Advance forward two days
			for (let i=8; i < 10; i++) {
				t -= 86400
				day += 1;
				await contract.setStartTime(t);
				
				// startTime = await contract.startTime();
				// console.log("Start time: ", startTime.toNumber());
				maxEarned = await contract.maxEarned();
				console.log("Day: ", day);
				console.log("\tmaxEarned: ", maxEarned.toNumber());
				pending = await contract.pendingBalance(0);
				console.log("\tpending: ", pending.toNumber());
				claimableBalance = await contract.claimableBalance(0);
				console.log("\tclaimableBal: ", claimableBalance.toNumber());
				console.log("\n");
			}

			await contract.claim(0);
			bal = await contract.balanceOf(accounts[0]);
			console.log("Attempted claim, current bal: ", bal.toNumber());
			pending = await contract.pendingBalance(0);
			console.log("pending: ", pending.toNumber())
			// assert.equal(pending.toNumber(), 0);

			await passDays(10, t, day);
			day += 10;
			t = await contract.startTime();

			// Day 20
			bal = await contract.balanceOf(accounts[0]);
			console.log("\tcurrent bal: ", bal.toNumber());
			assert.equal(bal.toNumber(), 9);
			pending = await contract.pendingBalance(0);
			console.log("\tpending: ", pending.toNumber());
			assert.equal(pending.toNumber(), 11);
			claimableBalance = await contract.claimableBalance(0);
			console.log("\tclaimableBal: ", claimableBalance.toNumber());

			await contract.claim(0);
			bal = await contract.balanceOf(accounts[0]);
			console.log("\tAttempted claim, current bal: ", bal.toNumber());
			assert.equal(bal.toNumber(), 20);
			pending = await contract.pendingBalance(0);
			console.log("\tpending: ", pending.toNumber());
			assert.equal(pending.toNumber(), 0);
			claimableBalance = await contract.claimableBalance(0);
			console.log("\tclaimableBal: ", claimableBalance.toNumber());
			
			// Here should be able to claim up to 27 total, already claimed 9
			// Day 20, so has 11 pending
			// claimed, 20 total now
			// randomly claim again just to test
			await contract.claim(0);
			bal = await contract.balanceOf(accounts[0]);
			assert.equal(bal.toNumber(), 20);
			pending = await contract.pendingBalance(0);
			assert.equal(pending.toNumber(), 0);

			// Mint another token, make sure it has right balances
			await contract.mintToken(1);
			await contract.startEarning(1);
			bal = await contract.balanceOf(accounts[1]);
			assert.equal(bal.toNumber(), 0);
			pending = await contract.pendingBalance(1);
			// console.log("\tpending: ", pending.toNumber());
			assert.equal(pending.toNumber(), 0);
			// claimableBalance = await contract.claimableBalance(1);
			// console.log("\tclaimableBal: ", claimableBalance.toNumber());
			// assert.equal(claimableBalance.toNumber(), 0);
			// Test claim for token1, and balance should still be only 20
			await contract.claim(1);
			bal = await contract.balanceOf(accounts[0]);
			assert.equal(bal.toNumber(), 20);

			console.log("Second token start is ok");

			await passDays(7, t, day);
			day += 7;
			t = await contract.startTime();
			pending = await contract.pendingBalance(1);
			claimableBalance = await contract.claimableBalance(1);
			console.log("\tpending: ", pending.toNumber());
			console.log("\tclaimableBal: ", claimableBalance.toNumber());
			await contract.claim(1);
			bal = await contract.balanceOf(accounts[0]);
			console.log("\tbal after claim for 2nd token: ", bal.toNumber());
			assert.equal(bal.toNumber(), 27);

			pending = await contract.pendingBalance(1);
			claimableBalance = await contract.claimableBalance(1);
			assert.equal(pending.toNumber(), 0);
			
			// Reset 0 token
			await contract.startEarning(0);
			// Pending should be 0, and balance should be unchanged
			pending = await contract.pendingBalance(0);
			assert.equal(pending.toNumber(), 0);
			bal = await contract.balanceOf(accounts[0]);
			assert.equal(bal.toNumber(), 27);

			// Pass 10 more days
			await passDays(10, t, day);
			day += 10;
			t = await contract.startTime();

			pending = await contract.pendingBalance(0);
			console.log("\tpending: ", pending.toNumber());
			assert.equal(pending.toNumber(), 10);

			await contract.claim(0);
			await contract.claim(1);
			bal = await contract.balanceOf(accounts[0]);
			console.log("\tfinal bal: ", bal.toNumber());
			assert.equal(bal.toNumber(), 47);

			pending = await contract.pendingBalance(0);
			assert.equal(pending.toNumber(), 0);
			pending = await contract.pendingBalance(1);
			assert.equal(pending.toNumber(), 0);

			// Test transfer of both
			await contract.startEarning(0);
			await contract.startEarning(1);
			let balBefore = bal;
			bal = await contract.balanceOf(accounts[0]);
			assert.equal(bal.toNumber(), balBefore.toNumber());

			pending = await contract.pendingBalance(0);
			assert.equal(pending.toNumber(), 0);
			pending = await contract.pendingBalance(1);
			assert.equal(pending.toNumber(), 0);
		});
	});
});


// Try starting, letting a few days pass, then running

contract('MechaPunkx', (accounts) => {
	
	let contract

	before(async () => {
		contract = await MechaPunkx.deployed();
		accounts = await web3.eth.getAccounts();
	})

	describe('deployment', async () => {
		
		it('earning works after initial days pass', async () => {

			let startTime = await contract.startTime();
			console.log("Start time: ", startTime.toNumber());
			let maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned.toNumber(), 0);
			let day = 0;
			let claimableBalance;
			let pending;
			let t = startTime;
			
			async function passDays(n, tStart, dayStart) {
				let t = tStart;
				for (let i=0; i < n; i++) {
					t -= 86400;
					await contract.setStartTime(t);
					maxEarned = await contract.maxEarned();
					console.log("Day: ", dayStart + i + 1);
					console.log("\tmaxEarned: ", maxEarned.toNumber());
				}
			}

			await passDays(13, t, day);
			day += 13;
			t = await contract.startTime();

			await contract.mintToken(0);
			await contract.startEarning(0)
			
			maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			// assert.equal(maxEarned, 0);

			// Step forward 8 days (by lowering start time)
			await passDays(8, t, day);
			day += 8;
			t = await contract.startTime();

			// See pending after 8 days, but 21 days total
			pending = await contract.pendingBalance(0);
			console.log("pending: ", pending.toNumber());
			// Try claim
			await contract.claim(0);
			let bal = await contract.balanceOf(accounts[0]);
			console.log("Attempted claim, current bal: ", bal.toNumber());
			assert.equal(bal.toNumber(), 8);
			pending = await contract.pendingBalance(0);
			console.log("pending: ", pending.toNumber());
			assert.equal(pending.toNumber(), 0);

			let totalSup = await contract.totalSupply();
			console.log("Total supply: ", totalSup.toNumber());
			assert.equal(totalSup.toNumber(), 8);
		});
	});
});


// Test that max claimable follows guideline after 200 days

contract('MechaPunkx', (accounts) => {
	
	let contract

	before(async () => {
		contract = await MechaPunkx.deployed();
		accounts = await web3.eth.getAccounts();
	})

	describe('deployment', async () => {
		
		it('max claimable follows guideline', async () => {

			let startTime = await contract.startTime();
			console.log("Start time: ", startTime.toNumber());
			let maxEarned = await contract.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned.toNumber(), 0);
			let day = 0;
			let claimableBalance;
			let pending;
			let t = startTime;
			await contract.mintToken(0);
			await contract.startEarning(0);
			
			async function passDays(n, tStart, dayStart) {
				let t = tStart;
				for (let i=0; i < n; i++) {
					t -= 86400;
					await contract.setStartTime(t);
					maxEarned = await contract.maxEarned();
					// console.log("Day: ", dayStart + i + 1);
					// console.log("\tmaxEarned: ", maxEarned.toNumber());
				}
			}

			for (let i=0; i < 10; i++) {
				await passDays(20, t, day);
				day += 20;
				t = await contract.startTime();
				claimableBalance = await contract.claimableBalance(0);
				console.log("Day: ", day, ", claimableBalance: ", claimableBalance.toNumber());

				if (day === 20) {
					assert.equal(claimableBalance, 27);
				}
				else if (day === 40) {
					assert.equal(claimableBalance, 90);
				}
				else if (day === 60) {
					assert.equal(claimableBalance, 189);
				}
				else if (day === 80) {
					assert.equal(claimableBalance, 405);
				}
				else if (day === 160) {
					assert.equal(claimableBalance, 1408);
				}

				
				//Day:  20 , claimableBalance:  27
				//Day:  40 , claimableBalance:  90
				//Day:  60 , claimableBalance:  189
				//Day:  80 , claimableBalance:  405
				//Day:  100 , claimableBalance:  594
				//Day:  120 , claimableBalance:  806
				//Day:  140 , claimableBalance:  1106
				//Day:  160 , claimableBalance:  1408
				//Day:  180 , claimableBalance:  1708
				//Day:  200 , claimableBalance:  2008
			}
		});
	});
});
*/

// Test NFT 

contract('MechaPunkx', (accounts) => {
	
	let contract;
	let lamboContract;
	let mechTokenAddress;

	before(async () => {
		contract = await MechaPunkx.deployed();
		lamboContract = await Lambo.deployed();
		accounts = await web3.eth.getAccounts();
	})

	beforeEach(function() {
		return MechaPunkx.new()
			.then(function(instance) {
				Lambo.new(instance.address).then(function(lamboInstance) {
					lamboContract = lamboInstance;
				});
				contract = instance;
		});
	});

	describe('NFT functions', async () => {
		
		it('deploys successfully', async () => {
			const address = contract.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it('basic tests', async () => {
			mechTokenAddress = await contract.mechTokenAddress();
			console.log("Mech token address: ", mechTokenAddress);

			let initialSupply = await contract.totalSupply();
			assert.equal(initialSupply.toNumber(), 0, "Supply is zero");

			let initialMintCost = await contract.mintCost();
			assert.equal(initialMintCost.toNumber(), 9);

			await contract.seedAllowlist([accounts[0], accounts[1]], 3);

			let mintResult = await contract.mintAllowlist();
			// console.log(mintResult);
			// Mints account[0] 3 tokens
			
			// for (let i=0; i < mintResult.logs.length; i++) {
			// 	console.log("Log ", i, mintResult.logs[i]);
			// 	console.log("\n");
			// }
			
			let ownerBal = await contract.balanceOf(accounts[0]);
			assert.equal(ownerBal.toNumber(), 3, "Owner whitelist 3, and minted 3");
		});
		/*
		it('Can use allowlist', async () => {

			mechTokenAddress = await contract.mechTokenAddress();
			console.log("Mech token address: ", mechTokenAddress);
			let mechToken = new MechToken(mechTokenAddress);

			let startTime = await mechToken.startTime();
			console.log("Start time: ", startTime.toNumber());
			let maxEarned = await mechToken.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned.toNumber(), 0);
			let day = 0;
			let claimableBalance;
			let pending;
			let t = startTime;
			
			async function passDays(n, tStart, dayStart) {
				let t = tStart;
				for (let i=0; i < n; i++) {
					t -= 86400;
					await mechToken.setStartTime(t);
					console.log("Day: ", day + i + 1);
				}
			}

			await contract.seedAllowlist([accounts[0], accounts[1], accounts[2], accounts[3]], 3);
			await contract.seedAllowlist([accounts[0]], 1);
			let mintResult = await contract.mintAllowlist();
			let ownerBal = await contract.balanceOf(accounts[0]);
			assert.equal(ownerBal.toNumber(), 1, "Owner whitelist 1, and minted 1");

			mintResult = await contract.mintAllowlist({from: accounts[1]});
			ownerBal = await contract.balanceOf(accounts[1]);
			assert.equal(ownerBal.toNumber(), 3, "Acct1 whitelist 3, and minted 3");

			// Only owner can update allowlist
			await contract.seedAllowlist([], 1, {from: accounts[1]}).should.be.rejected;
			await contract.seedAllowlist([], 1, {from: accounts[8]}).should.be.rejected;

			// No mint if not on allowlist
			await contract.mintAllowlist({from: accounts[8]}).should.be.rejected;

			// Can't mint more than allocated
			await contract.mintAllowlist({from: accounts[0]}).should.be.rejected;
			await contract.mintAllowlist({from: accounts[1]}).should.be.rejected;

			let totalSup = await contract.totalSupply();
			console.log("Total supply after some allowlist mints: ", totalSup.toNumber());
			assert.equal(totalSup.toNumber(), 4, "Total supply incorrect after allowlist mint");

			// Pass 15 days
			await passDays(15, t, day);
			day += 15;
			t = await mechToken.startTime();

			let tokenResult = await contract.claimMechTokenAll();
			ownerBal = await mechToken.balanceOf(accounts[0]);
			assert.isAbove(ownerBal.toNumber(), 0, "Account 0 has zero balance after claim and allowlist mint");

		});

		it('Can do sale', async () => {
			
			mechTokenAddress = await contract.mechTokenAddress();
			console.log("Mech token address: ", mechTokenAddress);
			let mechToken = new MechToken(mechTokenAddress);
			// let mechToken = MechToken.at(mechTokenAddress); // balanceOf is not a function (I think)
			// let mechToken = MechToken.deployed(); // Mech Token not deployed

			let startTime = await mechToken.startTime();
			console.log("Start time: ", startTime.toNumber());
			let maxEarned = await mechToken.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned.toNumber(), 0);
			let day = 0;
			let claimableBalance;
			let pending;
			let t = startTime;
			
			async function passDays(n, tStart, dayStart) {
				let t = tStart;
				for (let i=0; i < n; i++) {
					t -= 86400;
					await mechToken.setStartTime(t);
					// maxEarned = await contract.maxEarned();
					console.log("Day: ", day + i + 1);
					// console.log("\tmaxEarned: ", maxEarned.toNumber());
				}
			}

			await contract.mintSale(-1).should.be.rejected;
			await contract.mintSale(0).should.be.rejected;

			let toSend = 100000000000000000; // .1 eth

			// Manually tested minting beyond max total supply, with and without burning before
			// await contract.mintSale(12, { from: accounts[1], value: toSend * 12});
			// await contract.burn(0, { from: accounts[1] });
			// let ts = await contract.totalSupply();
			// console.log("TS: ", ts.toNumber());

			// let ts2 = await contract.nMinted();
			// let ts3 = await contract.nBurned();
			// console.log(ts2.toNumber(), ts3.toNumber());

			// Send too little eth
			await contract.mintSale(1, {from: accounts[1]}).should.be.rejected;
			await contract.mintSale(1, {from: accounts[1], value: toSend - 10 }).should.be.rejected;
			await contract.mintSale(2, {from: accounts[1], value: toSend }).should.be.rejected;
			await contract.mintSale(21, {from: accounts[1], value: toSend }).should.be.rejected;

			// Send correct amount
			let mintResult = await contract.mintSale(1, { from: accounts[1], value: toSend });
			let ownerBal = await contract.balanceOf(accounts[1]);
			assert.equal(ownerBal.toNumber(), 1, "Owner balance not correct after mint from sale");

			// Test multiple
			mintResult = await contract.mintSale(3, { from: accounts[1], value: toSend * 3 });
			ownerBal = await contract.balanceOf(accounts[1]);
			assert.equal(ownerBal.toNumber(), 4, "Owner balance not correct after second mint from sale");

			// Sale remaining is decreasing
			let saleRemaining = await contract.saleRemaining();
			assert.equal(saleRemaining.toNumber(), 196);

			// Total supply is increasing
			let totalSupply = await contract.totalSupply();
			assert.equal(totalSupply.toNumber(), 4);

			// Mint from one more account
			mintResult = await contract.mintSale(5, { from: accounts[7], value: toSend * 5 });
			ownerBal = await contract.balanceOf(accounts[7]);
			assert.equal(ownerBal.toNumber(), 5, "Owner balance not correct after third mint from sale");

			totalSupply = await contract.totalSupply();
			assert.equal(totalSupply.toNumber(), 9);

			// Test eth balance of contract
			let ethBal = await web3.eth.getBalance(contract.address);
			console.log("Eth balance of contract after a few mints: ", ethBal);
			assert.isAbove(parseInt(ethBal), toSend * 8);

			// Can check token minted ID
			// console.log("result: ", result);
			// console.log("Do we have this: ", result.logs[0].args);
			// let firstIdAssigned = result.logs[0].args.id.toNumber();
			
			// Test claim some MECH token, none should be available to claim atm
			// Token doesn't exist yet
			await contract.claimMechToken(20).should.be.rejected;
			await contract.claimMechToken(20, { from: accounts[1] }).should.be.rejected;

			// Can't claim an existing token that's not yours
			await contract.claimMechToken(0).should.be.rejected;
			await contract.claimMechToken(0, { from: accounts[7] }).should.be.rejected;
			await contract.claimMechToken(6, { from: accounts[1] }).should.be.rejected;

			let tokensOwned = await contract.tokensInWallet(accounts[0]);
			console.log("Tokens owned by 0: ", tokensOwned.toString());
			assert.equal(tokensOwned.length, 0);
			tokensOwned = await contract.tokensInWallet(accounts[1]);
			console.log("Tokens owned by 1: ", tokensOwned.toString());
			assert.equal(tokensOwned.length, 4);

			// Can claim for your own tokens
			// accounts[1] has first 4, 
			// accounts[7] has next 5
			let tokenResult = await contract.claimMechToken(0, { from: accounts[1] });
			tokenResult = await contract.claimMechToken(1, { from: accounts[1] });
			tokenResult = await contract.claimMechToken(2, { from: accounts[1] });
			tokenResult = await contract.claimMechToken(3, { from: accounts[1] });
			// Repeat claim should really have no issue
			tokenResult = await contract.claimMechToken(1, { from: accounts[1] });

			// Claim for accounts[7]
			tokenResult = await contract.claimMechToken(4, { from: accounts[7] });
			tokenResult = await contract.claimMechToken(5, { from: accounts[7] });
			tokenResult = await contract.claimMechToken(6, { from: accounts[7] });

			// Test claim all
			let estimatedGas = await contract.claimMechTokenAll.estimateGas({ from: accounts[7] });
			console.log("Gas estimate: ", estimatedGas); // 163296, 161499
			tokenResult = await contract.claimMechTokenAll({ from: accounts[7] });
			
			// Check that balance of both accounts for Mech token is ZERO
			ownerBal = await mechToken.balanceOf(accounts[0]);
			assert.equal(ownerBal.toNumber(), 0, "Nonzero balance found before earning MECH Token");
			ownerBal = await mechToken.balanceOf(accounts[1]);
			assert.equal(ownerBal.toNumber(), 0, "Nonzero balance found before earning MECH Token");
			ownerBal = await mechToken.balanceOf(accounts[2]);
			assert.equal(ownerBal.toNumber(), 0, "Nonzero balance found before earning MECH Token");
			ownerBal = await mechToken.balanceOf(accounts[7]);
			assert.equal(ownerBal.toNumber(), 0, "Nonzero balance found before earning MECH Token");

			// Step a few days forward, see if earning MECH works ok, claiming
			// Step forward 3 days (by lowering start time)
			await passDays(3, t, day);
			day += 3;
			t = await mechToken.startTime();

			// Check MECH accumulating
			maxEarned = await mechToken.maxEarned();
			assert.equal(maxEarned.toNumber(), 3, "MECH Token earned after 3 days incorrect");

			// Check no MECH claimed
			tokenResult = await contract.claimMechTokenAll({ from: accounts[7] });
			ownerBal = await mechToken.balanceOf(accounts[7]);
			assert.equal(ownerBal.toNumber(), 0, "Nonzero balance found before earning MECH token");

			// Check MECH token total supply
			totalSupply = await mechToken.totalSupply();
			assert.equal(totalSupply, 0, "MECH Token total supply should be zero");

			// Pass a few more days
			await passDays(7, t, day);
			day += 7;
			t = await mechToken.startTime();

			// Check MECH accumulating
			maxEarned = await mechToken.maxEarned();
			assert.equal(maxEarned.toNumber(), 10, "MECH Token earned after 10 days incorrect");

			// Try claim one token, then claim the rest
			tokenResult = await contract.claimMechToken(4, { from: accounts[7] });
			ownerBal = await mechToken.balanceOf(accounts[7]);
			// assert.equal(ownerBal.toNumber(), 9, "Zero balance found after claiming MECH Token");
			assert.isAbove(ownerBal.toNumber(), 0, "Zero balance found after claiming MECH Token");
			console.log("ownerBal after first claim: ", ownerBal.toNumber());

			// MECH total supply should be non-zero
			totalSupply = await mechToken.totalSupply();
			assert.isAbove(totalSupply.toNumber(), 0, "MECH Token total supply should be non-zero");
			console.log("MECH Token total supply after single claim: ", totalSupply.toNumber());

			// Repeat claim, balance should remained unchanged
			let ownerBalBefore = ownerBal;
			let totalSupplyBefore = totalSupply;
			tokenResult = await contract.claimMechToken(4, { from: accounts[7] });
			ownerBal = await mechToken.balanceOf(accounts[7]);
			totalSupply = await mechToken.totalSupply();
			assert.equal(ownerBal.toNumber(), ownerBalBefore.toNumber(), "MECH Token balance changed after repeat claim");
			assert.equal(totalSupply.toNumber(), totalSupplyBefore.toNumber(), "MECH Token total supply changed after repeat claim");

			// Claim rest by accounts[7]
			tokenResult = await contract.claimMechTokenAll({ from: accounts[7] });
			ownerBal = await mechToken.balanceOf(accounts[7]);
			totalSupply = await mechToken.totalSupply();
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "MECH Token balance did not change after claiming rest of tokens");
			assert.isAbove(totalSupply.toNumber(), totalSupplyBefore.toNumber(), "MECH Token total supply did not change after claiming rest of tokens");
			console.log("Owner balance after claiming all MECH token [acct 7]: ", ownerBal.toNumber());
			console.log("Total sup MECH Token after all claims [acct 7]: ", totalSupply.toNumber());
			// both 45

			// Check max earned
			maxEarned = await mechToken.maxEarned();
			assert.isAbove(maxEarned.toNumber(), 9, "MECH Token earned after 10 days incorrect");

			// Try claim with nonExistant ID (and through mechToken contract direct)

			// Testing claim directly from Mech Token contract
			// Can't claim non-existant token Id
			await mechToken.claim(200).should.be.rejected;
			await contract.claimMechToken(200).should.be.rejected;

			// Can't claim from non-owner account (onlyOwner on MechToken, 
			// since 1 owns 0 and 1, both below should work, but are correctly prevented by onlyOwner)
			await mechToken.claim(0, { from: accounts[1] }).should.be.rejected;
			await mechToken.claim(1, { from: accounts[1] }).should.be.rejected;
			
			// Can't claim with a tokenId you don't own
			await mechToken.claim(0, { from: accounts[7] }).should.be.rejected;
			await contract.claimMechToken(0, { from: accounts[7] }).should.be.rejected;

			// Can't claim without an NFT
			await contract.claimMechToken(0, { from: accounts[4] }).should.be.rejected;

			// Other users should remain 0 balance
			ownerBal = await mechToken.balanceOf(accounts[1]);
			assert.equal(ownerBal.toNumber(), 0, "Account 1 has non-zero balance without claiming");
			ownerBal = await mechToken.balanceOf(accounts[0]);
			assert.equal(ownerBal.toNumber(), 0, "Account 0 has non-zero balance without claiming");
			
			// Pass 2 more days, no claim should happen
			await passDays(2, t, day);
			day += 2;
			t = await mechToken.startTime();

			ownerBalBefore = await mechToken.balanceOf(accounts[7]);
			tokenResult = await contract.claimMechTokenAll({ from: accounts[7] });
			ownerBal = await mechToken.balanceOf(accounts[7]);
			assert.equal(ownerBalBefore.toNumber(), ownerBal.toNumber(), "MECH Token balance changed after 2 more days, but shouldn't");


			// Basic mint test, not full test

			let totalSupplyTokens = await mechToken.totalSupply();
			let totalSupplyNFT = await contract.totalSupply();
			let ownerNFT = await contract.tokensInWallet(accounts[7], { from: accounts[7] });

			let mintCost = await contract.mintCost();
			console.log("Mint cost at day ", day, mintCost.toNumber());
			
			// Can't mint without MECH token
			// Approve MECH Token transfer from acct 6
			await mechToken.approve(mechTokenAddress, 50000, { from: accounts[6] });
			// Has no approval and no MECH token
			await contract.mintNFT({ from: accounts[0] }).should.be.rejected;
			// Has approval, but no MECH token
			await contract.mintNFT({ from: accounts[6] }).should.be.rejected;
			// Has no approval, but does have MECH
			await contract.mintNFT({ from: accounts[7] }).should.be.rejected;
			
			
			// MechToken.Approval(
			//       owner: <indexed> 0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5 (type: address),
			//       spender: <indexed> 0x2dcb82d6692A005016847EcAA44e57609782F410 (type: address),
			//       value: 50000 (type: uint256)
			//     )

			//     MechToken.Approval(
			//       owner: <indexed> 0x0F4F2Ac550A1b4e2280d04c21cEa7EBD822934b5 (type: address),
			//       spender: <indexed> 0x2dcb82d6692A005016847EcAA44e57609782F410 (type: address),
			//       value: 50000 (type: uint256)
			//     )
			

			// 4,5,6,7,8
			// let ots = await contract.tokensInWallet(accounts[7]);
			// console.log("Owner tokens before next mint: ", ots.toString());

			// Test successful mint, w/ approve first			
			await mechToken.approve(contract.address, 50000, { from: accounts[7] });
			mintResult = await contract.mintNFT({ from: accounts[7] });
			// console.log("Newly minted token: ", mintResult.logs[0].tokenId.toNumber());
			let totalSupplyTokensAfter = await mechToken.totalSupply();
			let totalSupplyNFTAfter = await contract.totalSupply();
			let ownerNFTAfter = await contract.tokensInWallet(accounts[7], { from: accounts[7] });
			assert.isBelow(Number(totalSupplyTokensAfter), Number(totalSupplyTokens), "MECH Tokens not burned after minting MechaPunkx");
			assert.equal(Number(totalSupplyNFT) + 1, Number(totalSupplyNFTAfter), "Total supply of NFT did not increase by 1");
			assert.equal(ownerNFT.length + 1, ownerNFTAfter.length, "Owner should own one more NFT after mint"); 
			console.log("Total supply NFT after: ", totalSupplyNFTAfter.toNumber());

			// See remaining MECH
			ownerBal = await mechToken.balanceOf(accounts[7]);
			console.log("MECH left over: ", ownerBal.toNumber());

			// Owner has 33 tokens left, can mint 2 more
			mintResult = await contract.mintNFT({ from: accounts[7] });
			mintResult = await contract.mintNFT({ from: accounts[7] });
			ownerBal = await mechToken.balanceOf(accounts[7]);
			console.log("Minted two more, MECH left over: ", ownerBal.toNumber());

			// Mint should fail, not enough MECH available
			await contract.mintNFT({ from: accounts[7] }).should.be.rejected;

			

			// Quick test, can burn NFT (more burn testing at end)
			// Can't burn token you don't own
			let mechTokenBalBefore = await mechToken.balanceOf(accounts[7]);
			await contract.burn(0).should.be.rejected;
			await contract.burn(0, { from: accounts[7] }).should.be.rejected;
			let burnResult = await contract.burn(6, { from: accounts[7] });

			// Can't burn same token twice
			await contract.burn(6, { from: accounts[7] }).should.be.rejected;
			// Test cannot claim MECH from a burnt NFT
			await contract.claimMechToken(6, { from: accounts[7] }).should.be.rejected;
			await mechToken.claim(6, { from: accounts[7] }).should.be.rejected;
			// Test we do not have the token anymore
			await contract.ownerOf(6).should.be.rejected;
			// Test that we get back some MECH token
			let mechTokenBalAfter = await mechToken.balanceOf(accounts[7]);
			assert.isAbove(mechTokenBalAfter.toNumber(), mechTokenBalBefore.toNumber(), "Did not earn back some MECH from burning NFT");
			console.log("Mech token bal before/after burning: ", mechTokenBalBefore.toNumber(), mechTokenBalAfter.toNumber());
					

			// Check newly claimed token has MECH Token balance after 10 days
			mechTokenBalBefore = await mechToken.balanceOf(accounts[7]);
			let ownerTokens = await contract.tokensInWallet(accounts[7]);
			console.log("Tokens of owner: ", ownerTokens.toString()); // Tokens of owner:  4,5,11,7,8,9,10
			
			await contract.claimMechToken(9).should.be.rejected;
			await contract.claimMechToken(9, { from: accounts[7] });
			ownerBal = await mechToken.balanceOf(accounts[7]);
			assert.equal((ownerBal.toNumber() - mechTokenBalBefore), 0, "MECH was claimed for token when claimable should be zero");
			await passDays(10, t, day);
			day += 10;
			t = await mechToken.startTime();

			await contract.claimMechToken(9, { from: accounts[7] });
			ownerBal = await mechToken.balanceOf(accounts[7]);
			assert.isAbove(ownerBal.toNumber() - mechTokenBalBefore, 5, "Did not earn claimable mech");
			assert.isBelow(ownerBal.toNumber() - mechTokenBalBefore, 15, "Did not earn claimable mech");
			console.log("Account 7 has MECH: ", ownerBal.toNumber()); // 23

			mintCost = await contract.mintCost();
			console.log("Mint cost at day ", day, mintCost.toNumber());
			

			// Transfer some mech to a new account
			// Make sure starting with 0 MECH
			ownerBal = await mechToken.balanceOf(accounts[8]);
			assert.equal(ownerBal.toNumber(), 0, "New account 8 had nonzero balance of MECH");
			// Make sure no MechaPunkx
			ownerBal = await contract.balanceOf(accounts[8]);
			assert.equal(ownerBal.toNumber(), 0, "New account 8 had nonzero balance of MechaPunkx");

			// Transfer MECH
			await mechToken.transfer(accounts[8], 22, { from: accounts[7] });

			// nonZero balance
			ownerBal = await mechToken.balanceOf(accounts[8]);
			assert.isAbove(ownerBal.toNumber(), 0, "MECH not received by new account");
			ownerBalBefore = ownerBal;

			// Give account 7 a new NFT
			ownerTokens = await contract.tokensInWallet(accounts[7]);
			let tokenId = ownerTokens[0];

			// Make sure someone else can't transfer your token without approval
			await contract.safeTransferFrom(accounts[7], accounts[8], tokenId.toNumber(), { from: accounts[1] }).should.be.rejected;
			await contract.safeTransferFrom(accounts[7], accounts[8], tokenId.toNumber(), { from: accounts[8] }).should.be.rejected;
			// Successful transfer of token
			await contract.safeTransferFrom(accounts[7], accounts[8], tokenId.toNumber(), { from: accounts[7] });
			// Returned error: insufficient funds for gas * price + value ??

			// Accounts[7] should have 6 NFT's still

			await passDays(10, t, day);
			day += 10;
			t = await mechToken.startTime();

			// After 10 days, make sure they can mint, and they earn mech
			await contract.claimMechTokenAll({ from: accounts[8] });
			ownerBal = await mechToken.balanceOf(accounts[8]);
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "New account 8 MECH balance did not increase");
			console.log("New account 8 earned MECH: ", ownerBal.toNumber()); // 22 transferred + 10 earned = 32 

			// New account can mint new MechaPunkx
			mintCost = await contract.mintCost();
			console.log("Mint cost at day: ", day, mintCost.toNumber()); // 32
			let totalSuppyBefore = await mechToken.totalSupply();
			await contract.mintNFT({ from: accounts[8] }).should.be.rejected;
			await mechToken.approve(contract.address, 50000, { from: accounts[8] });
			await contract.mintNFT({ from: accounts[8] });
			ownerBal = await contract.balanceOf(accounts[8]);
			assert.equal(ownerBal.toNumber(), 2, "New account 8 did not have MechaPunkx after mint");
			let totalSupplyAfter = await mechToken.totalSupply();
			assert.equal((totalSuppyBefore.toNumber() - 32), totalSupplyAfter.toNumber(), "32 MECH not burned after mint");
			ownerBal = await mechToken.balanceOf(accounts[8]);
			console.log("Mech balance of account 8 after mint: ", ownerBal.toNumber());
			// No mint if not enough MECH token
			await contract.mintNFT({ from: accounts[8] }).should.be.rejected;

			// Transfer the NFT from new account to another new account
			ownerTokens = await contract.tokensInWallet(accounts[8]);
			tokenId = ownerTokens[0];
			// Make sure no ability to transfer if not yours
			await contract.safeTransferFrom(accounts[8], accounts[7], tokenId.toNumber(), { from: accounts[7] }).should.be.rejected;
			await contract.safeTransferFrom(accounts[8], accounts[9], tokenId.toNumber(), { from: accounts[8] });
			
			ownerBal = await contract.balanceOf(accounts[9]);
			assert.equal(ownerBal.toNumber(), 1, "New account 9 did not have NFT");			
			ownerBal = await contract.balanceOf(accounts[8]);
			assert.equal(ownerBal.toNumber(), 1, "Account 8 did not lose 1 NFT from transfer");
			ownerBal = await mechToken.balanceOf(accounts[9]);
			assert.equal(ownerBal.toNumber(), 0, "Account 9 had nonZero MECH token balance");

			await passDays(14, t, day);
			day += 14;
			t = await mechToken.startTime();

			await contract.claimMechTokenAll({ from: accounts[9] });
			ownerBal = await mechToken.balanceOf(accounts[9]);
			assert.isAbove(ownerBal.toNumber(), 0, "Account 9 did not earn MECH token after 10 days from transferred NFT");

			// Test burn NFT
			totalSupply = await contract.totalSupply();
			ownerTokens = await contract.tokensInWallet(accounts[9]);
			tokenId = ownerTokens[0].toNumber();
			await contract.burn(tokenId, { from: accounts[4] }).should.be.rejected;
			await contract.burn(tokenId, { from: accounts[9] });
			// Test we do not have the token anymore
			await contract.ownerOf(tokenId).should.be.rejected;
			// Test that we get back some MECH token
			mechTokenBalAfter = await mechToken.balanceOf(accounts[9]);
			assert.isAbove(mechTokenBalAfter.toNumber(), ownerBal.toNumber(), "Did not get MECH back after burn");
			console.log("Mech bal before/after burning: ", ownerBal.toNumber(), mechTokenBalAfter.toNumber());
			totalSupplyAfter = await contract.totalSupply();
			assert.equal(totalSupply.toNumber() - 1, totalSupplyAfter.toNumber(), "NFT total supply not reduced after burn");

			// Test can mint after burn
			mintCost = await contract.mintCost();
			console.log("Mint cost after burn: ", mintCost.toNumber());
			ownerBal = await mechToken.balanceOf(accounts[7]);
			console.log("Balance of account 7: ", ownerBal.toNumber());
			await contract.claimMechTokenAll({ from: accounts[7] });
			console.log("Balance of account 7 after: ", ownerBal.toNumber());
			
			await contract.claimMechTokenAll({ from: accounts[5] });
			ownerBal = await mechToken.balanceOf(accounts[5]);
			console.log("Balance of account 5: ", ownerBal.toNumber());
			ownerBal = await contract.tokensInWallet(accounts[5]);
			console.log("Mech tokens by account 5: ", ownerBal.length);

			await mechToken.transfer(accounts[9], 40, { from: accounts[7] });
			// await mechToken.transfer(accounts[9], 40, { from: accounts[5] });

			ownerBal = await mechToken.balanceOf(accounts[9]);
			ownerTokens = await contract.tokensInWallet(accounts[9]);
			console.log("Account 9 balance after: ", ownerBal.toNumber());
			await contract.mintNFT({ from: accounts[9] }).should.be.rejected; // No approval to spend MECH token
			await mechToken.approve(contract.address, 50000, { from: accounts[9] });
			await contract.mintNFT({ from: accounts[9] });
			ownerTokensBefore = ownerTokens;
			ownerTokens = await contract.tokensInWallet(accounts[9]);
			assert.isAbove(ownerTokens.length, ownerTokensBefore.length, "Account 9 new NFT not found after burn, then mint");



			// Test withdrawal of ETH

			// Log eth balances before / after
			ethBal = await web3.eth.getBalance(contract.address); 
			console.log("Eth balance of contract after mints: ", ethBal);
			let ethBalBefore = await web3.eth.getBalance(accounts[0]); 

			// Try send all eth from contract to owner
			await contract.withdraw({ from: accounts[2] }).should.be.rejected;
			let nonZeroBalance = await web3.eth.getBalance(contract.address);
			assert.isAbove(Number(nonZeroBalance), 0, "Somehow contract is empty?");

			let removalSuccess = await contract.withdraw({ from: accounts[0] });
			ethBal = await web3.eth.getBalance(contract.address);
			console.log("Eth balance of contract after withdrawal: ", ethBal);
			assert.equal(Number(ethBal), 0, "Contract should be empty after withdrawal");

			//ethBalAfter = web3.utils.fromWei(web3.eth.getBalance(accounts[0]).toString());
			let ethBalAfter = await web3.eth.getBalance(accounts[0]);
			console.log("Eth balance of accounts[0] before/after withdrawal: ", ethBalBefore, ethBalAfter);
			assert.isAbove(Number(ethBalAfter), Number(ethBalBefore));


		});
	

		it('Mint cost scales to 100', async () => {

			mechTokenAddress = await contract.mechTokenAddress();
			console.log("Mech token address: ", mechTokenAddress);
			let mechToken = new MechToken(mechTokenAddress);

			let startTime = await mechToken.startTime();
			console.log("Start time: ", startTime.toNumber());
			let maxEarned = await mechToken.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned.toNumber(), 0);
			let day = 0;
			let claimableBalance;
			let pending;
			let t = startTime;
			
			async function passDays(n, tStart, dayStart) {
				let t = tStart;
				for (let i=0; i < n; i++) {
					// let mintCost = await contract.mintCost();
					// console.log("Day ", (day + i + 1), ", cost: ", mintCost.toNumber());
					t -= 86400;
					await mechToken.setStartTime(t);
				}
			}

			// Check mint cost visually
			// await passDays(360, t, day);
			
			// Day  1 , cost:  9
			// Day  2 , cost:  9
			// Day  3 , cost:  9
			// Day  4 , cost:  9
			// Day  5 , cost:  9
			// Day  6 , cost:  9
			// Day  7 , cost:  9
			// Day  8 , cost:  9
			// Day  9 , cost:  9
			// Day  10 , cost:  9
			// Day  11 , cost:  10
			// Day  12 , cost:  11
			// Day  13 , cost:  12
			// Day  14 , cost:  13
			// ...
			// Day  99 , cost:  98
			// Day  100 , cost:  99
			// Day  101 , cost:  100
			// Day  102 , cost:  100
			// Day  103 , cost:  100
			// Day  104 , cost:  100

			// Simple version, sanity check
			let mintCost;
			await mechToken.setStartTime(t - (86400 * 20));
			day = 20;
			mintCost = await contract.mintCost();
			assert.isAbove(mintCost.toNumber(), 15, "At day 20, mint cost should be above 15");	

			await mechToken.setStartTime(t - (86400 * 102));
			day = 102;
			mintCost = await contract.mintCost();
			assert.equal(mintCost.toNumber(), 100, "At day 102, mint cost should be 100.");		
			
			await mechToken.setStartTime(t - (86400 * 152));
			day = 152;
			mintCost = await contract.mintCost();
			assert.equal(mintCost.toNumber(), 100, "At day 152, mint cost should be 100.");	

			
		});
		*/
		
		it('LAMBO has ok permissions', async () => {
			
			// Test succeeds, but realized emission rate can be defined as a function of burn rate within LAMBO contract possibly

			mechTokenAddress = await contract.mechTokenAddress();
			console.log("Mech token address: ", mechTokenAddress);
			let mechToken = new MechToken(mechTokenAddress);

			// Check Contract and Token URI 
			let baseURI = await contract.baseTokenURI();
			console.log("baseURI: ", baseURI);
			await contract.setBaseURI("https://lambo.lol/kneecaps/");
			baseURI = await contract.baseTokenURI();
			assert.equal("https://lambo.lol/kneecaps/", baseURI);
			await contract.setBaseURI("https://lambo.lol/metadata/mechapunkx/"); // Reset
			baseURI = await contract.baseTokenURI();
			assert.equal("https://lambo.lol/metadata/mechapunkx/", baseURI);
			
			let contractURI = await contract.contractURI();
			console.log("contractURI: ", contractURI);
			// await contract.setContractURI("https://kneecaps.io/contract.json");
			// contractURI = await contract.contractURI();
			// assert.equal("https://kneecaps.io/contract.json", contractURI);
			mintResult = await contract.mintSale(2, { from: accounts[2], value: 100000000000000000 * 2});

			let tokenURI = await contract.tokenURI(0);
			assert.equal(tokenURI, "https://lambo.lol/metadata/mechapunkx/0");
			tokenURI = await contract.tokenURI(1);
			assert.equal(tokenURI, "https://lambo.lol/metadata/mechapunkx/1");
			await contract.tokenURI(2).should.be.rejected;
			

			// Add to MechToken to test
			// function testRate() external {
			// 	LamboNFT.setEmissionRate(10);
			// }

			// function setLambo(address lamboAddress) external {
			// 	LamboNFT = Lambo(lamboAddress);
			// }

			// Test lambo.setEmissionRate(rate) can be called by contract (since onlyLamboCorp modifier)
			
			/*
			// Non-owner can't set rate
			await lamboContract.setEmissionRate(10, { from: accounts[1] }).should.be.rejected;
			// Owner can set rate
			await lamboContract.setEmissionRate(10);
			// Non-owner cannot set manager
			await lamboContract.setManager(mechToken.address, { from: accounts[2] }).should.be.rejected;
			// Set rate fails without approving manager 
			await mechToken.testRate({ from: accounts[1] }).should.be.rejected;
			// Owner can set manager
			await lamboContract.setManager(mechToken.address);
			// Initialization just for test
			await mechToken.setLambo(lamboContract.address);
			// Mech contract has permission to set rate
			await mechToken.testRate({ from: accounts[1] });
			*/
			assert.equal(0, 0);
		})

		it('Can convert MechaPunkx to yield LAMBO, permissions', async () => {

			mechTokenAddress = await contract.mechTokenAddress();
			console.log("Mech token address: ", mechTokenAddress);
			let mechToken = new MechToken(mechTokenAddress);
			let startTime = await mechToken.startTime();
			await lamboContract.setStartTimeInitial(startTime);
			console.log("Start time: ", startTime.toNumber());
			let maxEarned = await mechToken.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned.toNumber(), 0);
			let day = 0;
			let t = startTime;
			
			let results = {
				day: 0,
				t: startTime
			}

			async function passDaysMulti(n) {
				results.t -= 86400 * n;
				results.day += n;
				await mechToken.setStartTime(results.t);
				await lamboContract.setStartTime(results.t);
			}

			let toSend = 100000000000000000; // .1 eth

			// Cannot claim LAMBO for MechaPunkx NFT that does not exist
			await lamboContract.claim(0).should.be.rejected;
			await lamboContract.claimAll();
			
			// Mint 2 NFT to Accounts[1]
			let mintResult = await contract.mintSale(2, { from: accounts[1], value: toSend * 2});
			let ownerBal = await contract.balanceOf(accounts[1]);
			assert.equal(ownerBal.toNumber(), 2, "Owner balance not correct after mint from sale");

			// Mint 5 NFT to Accounts[2]
			mintResult = await contract.mintSale(5, { from: accounts[2], value: toSend * 5});

			// Mint 1 NFT to Accounts[3]
			mintResult = await contract.mintSale(1, { from: accounts[3], value: toSend});

			// Cannot claim LAMBO for unconverted MechaPunkx NFT
			await lamboContract.claim(0, { from: accounts[1] }).should.be.rejected;
			// Succeeds, with 0 resulting claim (skips unconverted)
			await lamboContract.claimAll({ from: accounts[1] });

			// Pass time, earn MECH, burn to convert, yield LAMBO
			await passDaysMulti(30);
			await contract.claimMechTokenAll({ from: accounts[1] });
			await contract.claimMechTokenAll({ from: accounts[2] });
			await contract.claimMechTokenAll({ from: accounts[3] });
			ownerBal = await mechToken.balanceOf(accounts[1]);
			console.log("MECH account 1: ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), 0, "No MECH earned."); // 60
			ownerBal = await mechToken.balanceOf(accounts[2]);
			console.log("MECH account 2: ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), 0, "No MECH earned."); // 150
			ownerBal = await mechToken.balanceOf(accounts[3]);
			console.log("MECH account 3: ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), 0, "No MECH earned."); // 30

			// Need at least 50 MECH to convert
			assert.isBelow(ownerBal.toNumber(), 50, "Accounts[3] has over 50 MECH balance");
			let tokensOwned = await contract.tokensInWallet(accounts[3], { from: accounts[3] });
			assert.equal(tokensOwned[0], 7, "Accounts 3 had a different tokenId than 7");
			await contract.convertYieldToLambo(7, { from: accounts[3] }).should.be.rejected;

			// Accounts[1] should have successful conversion, although zero return since no time passed
			await mechToken.approve(contract.address, 50000, { from: accounts[1] });
			await contract.convertYieldToLambo(0, { from: accounts[1] });
			let yieldsLambo = await contract.yieldsLambo(0);
			assert.equal(yieldsLambo, true);
			ownerBal = await mechToken.balanceOf(accounts[1]);
			assert.isBelow(ownerBal.toNumber(), 50, "Accounts[1] should have balance under 50 after convert yield");
			// Cannot convert again
			await contract.convertYieldToLambo(0, { from: accounts[1] }).should.be.rejected;
			// Cannot claim MECH for converted NFT
			await contract.claimMechToken(0, { from: accounts[1] }).should.be.rejected;

			// Accounts[1] has 1 regular, 1 converted (10 MECH ish)
			// Accounts[2] has 5 regular (150 MECH ish)
			// Accounts[3] has 1 regular (30 MECH ish)

			// Accounts[2] convert two to LAMBO
			await mechToken.approve(contract.address, 50000, { from: accounts[2] });
			await contract.convertYieldToLambo(2, { from: accounts[2] });
			await contract.convertYieldToLambo(3, { from: accounts[2] });

			ownerBal = await lamboContract.balanceOf(accounts[2]);
			assert.equal(ownerBal.toNumber(), 0, "Accounts[2] should have no LAMBO before any claim");

			// Can claim multiple, although zero balance
			await lamboContract.claimAll({ from: accounts[2] });
			ownerBal = await lamboContract.balanceOf(accounts[2]);
			assert.equal(ownerBal.toNumber(), 0, "Accounts[2] should have no LAMBO");

			// Accounts[1] has 1 regular, 1 converted (10 MECH ish)
			// Accounts[2] has 3 regular, 2 converted (50 MECH ish)
			// Accounts[3] has 1 regular (30 MECH ish)

			// Pass time, earn MECH and LAMBO
			// Account 2 shows can claim MECH while having regular and converted NFTs
			await passDaysMulti(30);
			await contract.claimMechTokenAll({ from: accounts[1] });
			await contract.claimMechTokenAll({ from: accounts[2] }); 
			await contract.claimMechTokenAll({ from: accounts[3] });
			ownerBal = await mechToken.balanceOf(accounts[1]);
			console.log("MECH account 1: ", ownerBal.toNumber()); // 40
			assert.isAbove(ownerBal.toNumber(), 39, "No MECH earned.");
			ownerBal = await mechToken.balanceOf(accounts[2]); // 140
			console.log("MECH account 2: ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), 139, "No MECH earned.");
			ownerBal = await mechToken.balanceOf(accounts[3]); // 60
			console.log("MECH account 3: ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), 59, "No MECH earned.");

			// Mint an NFT with MECH
			await contract.mintNFT({ from: accounts[2] });
			ownerBal = await contract.balanceOf(accounts[2]);
			assert.equal(ownerBal.toNumber(), 6);

			// Accounts[1] has 1 unconverted, 1 converted (? MECH ish)
			// Accounts[2] has 4 unconverted, 2 converted (? MECH ish)
			// Accounts[3] has 1 unconverted (? MECH ish)

			// Can claim LAMBO 
			await lamboContract.claimAll({ from: accounts[1] });
			ownerBal = await lamboContract.balanceOf(accounts[1]);
			assert.isAbove(ownerBal.toNumber(), 0, "Accounts[1] did not earn LAMBO after 30 days");

			// Can claim LAMBO in separate calls, and while also earning MECH
			await lamboContract.claim(2, { from: accounts[2] });
			ownerBal = await lamboContract.balanceOf(accounts[2]);
			let ownerBalBefore = ownerBal;
			console.log("Accounts[2] earned LAMBO from one claim: ", ownerBal.toNumber()); // 300
			assert.equal(ownerBal.toNumber(), 300, "LAMBO balance should be 300");
			await lamboContract.claimAll( { from: accounts[2] });
			ownerBal = await lamboContract.balanceOf(accounts[2]);
			console.log("Accounts[2] earned LAMBO from all claims: ", ownerBal.toNumber()); // 600
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "LAMBO balance did not increase after remaining calls");
			assert.equal(ownerBal.toNumber(), 600, "LAMBO balance should be 600");

			// Burn NFT (non-yielding)
			yieldsLambo = await contract.yieldsLambo(4, { from: accounts[2] });
			assert.equal(yieldsLambo, false);
			await contract.burn(4, { from: accounts[2] });
			let nBurned = await contract.nBurned({ from: accounts[2] });
			assert.equal(nBurned.toNumber(), 1, "Burn count is off after burning non yielding");
			// No LAMBO yield, no MECH yield
			await contract.claimMechToken(4, { from: accounts[2] }).should.be.rejected;
			await lamboContract.claim(4, { from: accounts[2] }).should.be.rejected;

			// Burn NFT again (converted), test no MECH, no LAMBO
			yieldsLambo = await contract.yieldsLambo(2, { from: accounts[2] });
			assert.equal(yieldsLambo, true);
			await contract.burn(2, { from: accounts[1] }).should.be.rejected;
			await contract.burn(2, { from: accounts[2] });
			nBurned = await contract.nBurned();
			assert.equal(nBurned.toNumber(), 2, "Burn count is off after burning yielding");

			// Pass time, claim for all accounts, yielding MECH and LAMBO
			await passDaysMulti(15);

			// I think
			// Accounts[1] has 1 unconverted, 1 converted
			// Accounts[2] has 3 unconverted, 1 converted (2 burned)
			// Accounts[3] has 1 unconverted

			// Accounts[1] MECH before/after:  40  ->  55
			// Accounts[1] LAMBO before/after:  300  ->  450
			// Accounts[2] MECH before/after:  88  ->  133
			// Accounts[2] LAMBO before/after:  600  ->  750
			// Accounts[3] MECH before/after:  60  ->  75
			// Accounts[3] LAMBO before/after:  0  ->  0

			// Account 1
			ownerBalBefore = await mechToken.balanceOf(accounts[1]);
			await contract.claimMechTokenAll({ from: accounts[1] });
			ownerBal = await mechToken.balanceOf(accounts[1]);
			console.log("Accounts[1] MECH before/after: ", ownerBalBefore.toNumber(), " -> ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Did not earn MECH token");
			assert.equal(ownerBal - ownerBalBefore, 15, "Did not earn 15 MECH");

			ownerBalBefore = await lamboContract.balanceOf(accounts[1]);
			await lamboContract.claimAll({ from: accounts[1] });
			ownerBal = await lamboContract.balanceOf(accounts[1]);
			console.log("Accounts[1] LAMBO before/after: ", ownerBalBefore.toNumber(), " -> ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Did not earn LAMBO token");
			assert.equal((ownerBal - ownerBalBefore), 150, "Did not earn 150 LAMBO");

			// Account 2
			ownerBalBefore = await mechToken.balanceOf(accounts[2]);
			await contract.claimMechTokenAll({ from: accounts[2] });
			ownerBal = await mechToken.balanceOf(accounts[2]);
			console.log("Accounts[2] MECH before/after: ", ownerBalBefore.toNumber(), " -> ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Did not earn MECH token");
			assert.equal((ownerBal - ownerBalBefore), 45, "Did not earn 45 MECH");

			ownerBalBefore = await lamboContract.balanceOf(accounts[2]);
			let claimResult = await lamboContract.claimAll({ from: accounts[2] });
			// console.log("Claim result: ", claimResult); // cumulativeGasUsed: 112865
			ownerBal = await lamboContract.balanceOf(accounts[2]);
			console.log("Accounts[2] LAMBO before/after: ", ownerBalBefore.toNumber(), " -> ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Did not earn LAMBO token");
			assert.equal((ownerBal - ownerBalBefore), 150, "Did not earn 150 LAMBO");

			// Account 3
			ownerBalBefore = await mechToken.balanceOf(accounts[3]);
			await contract.claimMechTokenAll({ from: accounts[3] });
			ownerBal = await mechToken.balanceOf(accounts[3]);
			console.log("Accounts[3] MECH before/after: ", ownerBalBefore.toNumber(), " -> ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Did not earn MECH token");

			ownerBalBefore = await lamboContract.balanceOf(accounts[3]);
			await lamboContract.claimAll({ from: accounts[3] });
			ownerBal = await lamboContract.balanceOf(accounts[3]);
			console.log("Accounts[3] LAMBO before/after: ", ownerBalBefore.toNumber(), " -> ", ownerBal.toNumber());
			assert.equal(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Accounts[3] should not have changed LAMBO balance");
			
			// Mint another NFT with MECH
			await contract.mintNFT({ from: accounts[2] });
			console.log("Day: ", results.day); // 75

			// Test LAMBO burn

			// Only owner can set DAO
			await lamboContract.setDAO(accounts[9], { from: accounts[1] }).should.be.rejected;
			await lamboContract.setDAO(accounts[1], { from: accounts[1] }).should.be.rejected;
			// Set the DAO address
			await lamboContract.setDAO(accounts[9]);
			// DAO starts with no LAMBO
			ownerBal = await lamboContract.balanceOf(accounts[9]);
			assert.equal(ownerBal.toNumber(), 0, "Accounts[9] should have 0 LAMBO");
			
			// Can't burn without balance
			await lamboContract.burn(1, { from: accounts[9] }).should.be.rejected;
			// Can't burn more than balance
			await lamboContract.burn(50000, { from: accounts[2] }).should.be.rejected;
			// Can't burn without auth
			await lamboContract.burnFrom(accounts[2], 10, { from: accounts[3] }).should.be.rejected;
			// Successful burn, requires approval
			ownerBalBefore = await lamboContract.balanceOf(accounts[2]);
			
			// Don't understand why this is needed
			// ****
			let totalSupplyBefore = await lamboContract.totalSupply();
			await lamboContract.approve(accounts[2], 5000000, { from: accounts[2] });
			let burnResult = await lamboContract.burn(10, { from: accounts[2], gas: 800000 }); // , gasPrice: 500000000 
			// burnResult.receipt.cumulativeGasUsed // 206220
			// console.log("Burn result: ", burnResult);
			// no events: 203850
			// no events no burnDuringInterval: 203429
			// no events no burnDuringInterval no update: 71785
			// no events no burnDuringInterval no update no send to Dao: 36964
			// gas cost on arbi @ 0.7 -> 200k gas = 140k gwei = 0.00014 eth = $0.42
			// Only for the once per month heavy transaction
			// could also just give DAO a claimable balance that gets incremented, 
			// and then they pull the claim instead of transfer every fraction burnt (transfer is only 30k though)
			
			let totalSupplyAfter = await lamboContract.totalSupply();
			assert.isBelow(totalSupplyAfter.toNumber(), totalSupplyBefore.toNumber(), "Total supply did not decrease after burn");
			ownerBal = await lamboContract.balanceOf(accounts[2]);
			console.log("Accounts[2] before LAMBO burn, LAMBO: ", ownerBalBefore.toNumber());
			console.log("Accounts[2] after LAMBO burn, LAMBO: ", ownerBal.toNumber());
			assert.equal(ownerBal.toNumber(), ownerBalBefore - 10, "Accounts[9] did not lose LAMBO after burn");

			// Test DAO receives burned LAMBO
			ownerBal = await lamboContract.balanceOf(accounts[9]);
			assert.isAbove(ownerBal.toNumber(), 0, "Accounts[9] did not receive DAO LAMBO");
			console.log("DAO received LAMBO: ", ownerBal.toNumber());
			assert.equal(ownerBal.toNumber(), 3, "DAO received less than 30%");
			console.log("DAO LAMBO: ", ownerBal.toNumber());

			// Test DAO can send LAMBO
			await lamboContract.transfer(accounts[8], 1, { from: accounts[9] });
			// Test new account received and can send
			ownerBal = await lamboContract.balanceOf(accounts[8]);
			assert.equal(ownerBal.toNumber(), 1, "Accounts[8] did not receive transferred 1 LAMBO");
			await lamboContract.transfer(accounts[7], 1, { from: accounts[8] });
			ownerBal = await lamboContract.balanceOf(accounts[7]);
			assert.equal(ownerBal.toNumber(), 1, "Accounts[7] did not receive transferred 1 LAMBO");
			
			// Burn different amounts to test
			burnResult = await lamboContract.burn(1, { from: accounts[2], gas: 800000 }); 
			// console.log("Burn result: ", burnResult); // Gas should be less since already updated the monthly, 76k
			ownerBal = await lamboContract.balanceOf(accounts[9]);
			console.log("DAO LAMBO (burned 11 total): ", ownerBal.toNumber());
			// DAO receives 0 on burn of 1

			burnResult = await lamboContract.burn(3, { from: accounts[2], gas: 800000 });
			ownerBal = await lamboContract.balanceOf(accounts[9]);
			ownerBalBefore = ownerBal;
			console.log("DAO LAMBO (burned 14 total): ", ownerBal.toNumber()); 

			burnResult = await lamboContract.burn(13, { from: accounts[2], gas: 800000 });
			ownerBal = await lamboContract.balanceOf(accounts[9]);
			console.log("DAO LAMBO (burned 27 total): ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "DAO did not earn LAMBO on burn of 13");

			// Burn during interval is counting correctly
			let burnDuring = await lamboContract.burnDuringInterval();
			console.log("Burned total: ", burnDuring.toNumber()); // (27-10) 17

			// DAO LAMBO (burned 11 total):  2
			// DAO LAMBO (burned 14 total):  3
			// DAO LAMBO (burned 27 total):  6

			// Test burnFrom
			ownerBalBefore = await lamboContract.balanceOf(accounts[2]);
			await lamboContract.approve(accounts[5], 20, { from: accounts[2] });
			await lamboContract.burnFrom(accounts[2], 10, { from: accounts[5] });
			ownerBal = await lamboContract.balanceOf(accounts[2]);
			assert.isBelow(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Accounts[2] did not burn LAMBO by accounts[5]");

			// Yield rate should be updated since burn
			// Check account is earning equivalent
			ownerBalBefore = await lamboContract.balanceOf(accounts[2]);
			console.log("Accounts[2] LAMBO balance before: ", ownerBalBefore.toNumber()); 

			// Pass 5 days
			await passDaysMulti(5);
			await lamboContract.claimAll({ from: accounts[2] });
			ownerBal = await lamboContract.balanceOf(accounts[2]);
			console.log("Accounts[2] LAMBO balance after: ", ownerBal.toNumber()); // 713 -> 738
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Accounts[2] did not earn LAMBO at new rate");
			// Test claim again doesn't increase balance
			let ownerBalConstant = ownerBal;
			await lamboContract.claimAll({ from: accounts[2] });
			ownerBal = await lamboContract.balanceOf(accounts[2]);
			assert.equal(ownerBalConstant.toNumber(), ownerBal, "Repeat claim should not increase balance");

			let ratesLength = await lamboContract.emissionRatesLength();
			let rateChangesLength = await lamboContract.emissionRateChangesLength();
			assert.equal(rateChangesLength.toNumber(), 2);
			assert.equal(ratesLength.toNumber(), 2);
			let r1 = await lamboContract.emissionRates(0);
			let r2 = await lamboContract.emissionRates(1);
			console.log("Emission rates: ", r1.toNumber(), r2.toNumber());
			// Emission rate halves successfully
			assert.equal(r2.toNumber(), 5, "Emission rate should be 5 after halving");

			// Earned should be approx. 5 days * r2 (5) * nLamboYielders (1) = 25
			assert.equal(ownerBal - ownerBalBefore, 25, "Earned LAMBO should be 25 after 5 days at rate of 5");

			// Reset burn like normal to do 3rd emission rate update
			await passDaysMulti(33);
			burnResult = await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			ratesLength = await lamboContract.emissionRatesLength();
			rateChangesLength = await lamboContract.emissionRateChangesLength();
			assert.equal(rateChangesLength.toNumber(), 3);
			assert.equal(ratesLength.toNumber(), 3);
			r1 = await lamboContract.emissionRates(0);
			r2 = await lamboContract.emissionRates(1);
			let r3 = await lamboContract.emissionRates(2);
			console.log("Emission rates: ", r1.toNumber(), r2.toNumber(), r3.toNumber()); // 10, 5, 2
			assert.isBelow(r3.toNumber(), 5, "Emission rate should decrease again with low/no burning");

			await passDaysMulti(33);
			let burnDuringInterval = await lamboContract.burnDuringInterval();
			let emitted = await lamboContract.createdDuringInterval();
			console.log("Emitted over period: ", emitted.toNumber());
			console.log("Burn during interval: ", burnDuringInterval.toNumber()); // 0, 0, so it reset

			// Visually checked these cases

			// Emission rate increase, then constant
			// 0 created, 700 burned
			// Emission rate goes to 3, wait a month, only burn 1, make sure it stays at 3
			await lamboContract.burn(700, { from: accounts[2], gas: 800000 });
			r1 = await lamboContract.emissionRates(3);
			console.log("New emission rate: ", r1.toNumber()); // 3
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			emissionRateChangesLength = await lamboContract.emissionRatesLength();
			// assert.equal(emissionRateChangesLength.toNumber(), 4, "No emission rate change added, because rate stayed the same");
			r1 = await lamboContract.currentEmissionRate();
			console.log("Next emission rate: ", r1.toNumber());
			assert.equal(r1.toNumber(), 4, "Emission rate is not 4");
			// Then do a few months of claiming and burning to get values into the burnRates
			await passDaysMulti(33);
			await lamboContract.approve(accounts[1], 5000000, { from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(40, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(10, { from: accounts[1], gas: 800000 });
			r1 = await lamboContract.currentEmissionRate();
			console.log("Next emission rate: ", r1.toNumber());
			/*
			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(40, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(10, { from: accounts[1], gas: 800000 });
			r1 = await lamboContract.currentEmissionRate();
			console.log("Next emission rate: ", r1.toNumber());

			async function printBurnRates() {
				// emitted = await lamboContract.createdDuringInterval();
				// console.log("Emitted: ", emitted.toNumber());

				let r1 = await lamboContract.currentEmissionRate();
				console.log("\nNext emission rate: ", r1.toNumber());
				ownerBal = await lamboContract.balanceOf(accounts[1]);
				console.log("Accounts[1] LAMBO: ", ownerBal.toNumber());
				ownerBal = await lamboContract.balanceOf(accounts[2]);
				console.log("Accounts[2] LAMBO: ", ownerBal.toNumber());

				let burnRates1 = await lamboContract.burnRates(0);
				let burnRates2 = await lamboContract.burnRates(1);
				let burnRates3 = await lamboContract.burnRates(2);
				let burnRates4 = await lamboContract.burnRates(3);
				let burnRates5 = await lamboContract.burnRates(4);
				let burnRates6 = await lamboContract.burnRates(5);
				console.log("Burn rates: ", burnRates1.toNumber(), burnRates2.toNumber(), burnRates3.toNumber(), 
					burnRates4.toNumber(), burnRates5.toNumber(), burnRates6.toNumber());
			}

			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(200, { from: accounts[1], gas: 800000 });
			await printBurnRates();

			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(200, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(1, { from: accounts[1], gas: 800000 });
			await printBurnRates();

			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(10, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(400, { from: accounts[1], gas: 800000 });
			await printBurnRates();

			// Get more LAMBOS for account 2
			await contract.claimMechTokenAll({ from: accounts[2] });
			ownerBal = await mechToken.balanceOf(accounts[2]);
			await contract.convertYieldToLambo(6, { from: accounts[2] });
			await contract.convertYieldToLambo(5, { from: accounts[2] });

			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(40, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(40, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(40, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(40, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 
			
			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(50, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(50, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(33);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(60, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(20, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(100);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(1, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(100);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(1, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(33);
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(150, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(150, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(33);
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(150, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(150, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(33);
			let createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await lamboContract.burn(150, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(150, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(3);
			await lamboContract.burn(150, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(150, { from: accounts[1], gas: 800000 });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[1], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(10, { from: accounts[1], gas: 800000 });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(3, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(1, { from: accounts[1], gas: 800000 });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(2, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(2, { from: accounts[1], gas: 800000 });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(17);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(1, { from: accounts[1], gas: 800000 });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(10, { from: accounts[1], gas: 800000 });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			// claimResult = await lamboContract.claimAll({ from: accounts[1] });
			// claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(1, { from: accounts[1], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			await lamboContract.burn(400, { from: accounts[1], gas: 800000 });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			// Check long duration claiming, no burning
			await passDaysMulti(100);
			claimResult = await lamboContract.claimAll({ from: accounts[1] });
			await passDaysMulti(10);
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(100);
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			console.log("HERE --------------------------------------------\n\n");

			await passDaysMulti(4);
			await lamboContract.burn(240, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(300, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(500, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(700, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(1000, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			await passDaysMulti(4);
			await lamboContract.burn(2000, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			createdDuringInterval = await lamboContract.createdDuringInterval();
			burnDuringInterval = await lamboContract.burnDuringInterval();
			console.log("created during: ", createdDuringInterval.toNumber());
			console.log("burned during: ", burnDuringInterval.toNumber());
			await passDaysMulti(33);
			await lamboContract.burn(1, { from: accounts[2], gas: 800000 });
			await printBurnRates(); 

			// Test locking burn rate
			await lamboContract.setUseBurnRate(false);
			await passDaysMulti(15);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(33);
			await printBurnRates(); 
			await passDaysMulti(15);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await printBurnRates(); 
			await passDaysMulti(15);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(33);
			await printBurnRates(); 
			await passDaysMulti(15);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] });
			await passDaysMulti(33);
			await printBurnRates();
			await passDaysMulti(15);
			await lamboContract.burn(400, { from: accounts[2], gas: 800000 });
			claimResult = await lamboContract.claimAll({ from: accounts[2] }); // 420k
			await passDaysMulti(33);
			await printBurnRates(); 
			*/
			// After many rate changes, see what claim cost is


			// Test burning a yielding MechaPunkx (already tested above too)
			await contract.convertYieldToLambo(5, { from: accounts[2] });
			yieldsLambo = await contract.yieldsLambo(5, { from: accounts[2] });
			assert.equal(yieldsLambo, true);
			await contract.burn(5, { from: accounts[2] });
			// No LAMBO yield, no MECH yield
			await contract.claimMechToken(5, { from: accounts[2] }).should.be.rejected;
			await lamboContract.claim(5, { from: accounts[2] }).should.be.rejected;
			await contract.burn(5, { from: accounts[1] }).should.be.rejected;
			await contract.burn(5, { from: accounts[2] }).should.be.rejected;

			// Transfer all MECH to a new account, see if can get new NFT + keep claiming
			// await contract.transfer(accounts[2], accounts[6], 100, { from: accounts[2] });
			let cost = await contract.mintCost();
			console.log("Mint cost: ", cost.toNumber());
			ownerBal = await mechToken.balanceOf(accounts[2]);
			console.log("Accounts[2] MECH balance: ", ownerBal.toNumber());
			await mechToken.transfer(accounts[6], ownerBal.toNumber(), { from: accounts[2] });
			// Transfer from accounts[1] and accounts[3] since 2 didn't have enough
			await contract.claimMechTokenAll({ from: accounts[1] });
			await contract.claimMechTokenAll({ from: accounts[3] });
			let ownerBalOther = await mechToken.balanceOf(accounts[1]);
			await mechToken.transfer(accounts[6], ownerBalOther.toNumber(), { from: accounts[1] });
			ownerBalOther = await mechToken.balanceOf(accounts[3]);
			await mechToken.transfer(accounts[6], ownerBalOther.toNumber(), { from: accounts[3] });

			await contract.mintNFT({ from: accounts[2] }).should.be.rejected;
			await mechToken.approve(contract.address, 50000, { from: accounts[6] });
			await contract.mintNFT({ from: accounts[6] });
			// See if they can keep claiming
			await passDaysMulti(15);
			let currentId = await contract.nMinted();
			console.log("Most recent minted NFT: ", currentId.toNumber());
			await contract.claimMechToken(currentId.toNumber() - 1, { from: accounts[2] }).should.be.rejected;
			await contract.claimMechToken(currentId.toNumber() - 1, { from: accounts[6] });
			ownerBalBefore = ownerBal;
			ownerBal = await mechToken.balanceOf(accounts[6]);
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "New account could not claim after transfer");

			// Transfer a yielding NFT and make sure new owner can claim LAMBO
			await contract.convertYieldToLambo(currentId.toNumber() - 1, { from: accounts[6] });
			await passDaysMulti(15);
			await contract.claimMechToken(currentId.toNumber() - 1, { from: accounts[6] }).should.be.rejected;
			await contract.transferFrom(accounts[6], accounts[7], currentId.toNumber() - 1, { from: accounts[6] }); // Also voids any unclaimed MECH
			ownerBal = await lamboContract.balanceOf(accounts[7]);
			ownerBalBefore = ownerBal;
			console.log("Accounts[7] LAMBO balance: ", ownerBal.toNumber());
			await lamboContract.claimAll({ from: accounts[7] });
			ownerBal = await lamboContract.balanceOf(accounts[7]);
			console.log("Accounts[7] LAMBO balance: ", ownerBal.toNumber());
			assert.isAbove(ownerBal.toNumber(), ownerBalBefore.toNumber(), "Accounts[7] did not earn LAMBO from a transferred Mecha NFT");
			// Make sure accounts[6] can't claim either
			await contract.claimMechToken(currentId.toNumber() - 1, { from: accounts[6] }).should.be.rejected;
			await lamboContract.claim(currentId.toNumber() - 1, { from: accounts[6] }).should.be.rejected;
			// And new owner cannot claim MECH
			await contract.claimMechToken(currentId.toNumber() - 1, { from: accounts[7] }).should.be.rejected;


			// Check we can approve, and someone else can spend an owner's LAMBO, ie. Lambo World contract
			// Allow [8] to take from [7]
			await lamboContract.transfer(accounts[8], 100, { from: accounts[8] }).should.be.rejected;
			await lamboContract.approve(accounts[8], 50000, { from: accounts[7] });
			await lamboContract.approve(accounts[8], 50000, { from: accounts[7] });
			ownerBal = await lamboContract.balanceOf(accounts[8]);
			console.log("Accounts[8] LAMBO balance before transfer from [7]: ", ownerBal.toNumber());
			await lamboContract.transferFrom(accounts[7], accounts[8], 10, { from: accounts[8] });
			ownerBal = await lamboContract.balanceOf(accounts[8]);
			console.log("Accounts[8] LAMBO balance after transfer from [7]: ", ownerBal.toNumber());

			// Total supply MECH token:  281
			// Total supply LAMBO token:  1650
			// Total MechaPunkx:  11

			// console.log(lamboContract.methods);

			let totalSupplyMech = await mechToken.totalSupply();
			let totalSupplyLambo = await lamboContract.totalSupply();
			let totalMinted = await contract.nMinted();
			console.log("Total supply MECH token: ", totalSupplyMech.toNumber());
			console.log("Total supply LAMBO token: ", totalSupplyLambo.toNumber());
			console.log("Total MechaPunkx: ", totalMinted.toNumber());
			assert.isAbove(totalMinted.toNumber(), 6);
		});
		
		/*
		it('Full run test', async () => {
			
			let nAccounts = 10;

			mechTokenAddress = await contract.mechTokenAddress();
			console.log("Mech token address: ", mechTokenAddress);
			let mechToken = new MechToken(mechTokenAddress);

			let startTime = await mechToken.startTime();
			console.log("Start time: ", startTime.toNumber());
			let maxEarned = await mechToken.maxEarned();
			console.log("maxEarned: ", maxEarned.toNumber());
			assert.equal(maxEarned.toNumber(), 0);
			let day = 0;
			let claimableBalance;
			let pending;
			let t = startTime;
			let mintCost;
			let mintResult;
			
			async function passDays(n, tStart, dayStart) {
				let t = tStart;
				for (let i=0; i < n; i++) {
					// let mintCost = await contract.mintCost();
					// console.log("Day ", (day + i + 1), ", cost: ", mintCost.toNumber());
					t -= 86400;
					await mechToken.setStartTime(t);
				}
				return day + n;
			}

			let toSend = 100000000000000000; // .1 eth



			// Approve all to spend MECH
			for (let i=1; i < nAccounts; i++) {
				await mechToken.approve(contract.address, 500000, { from: accounts[i] });
				if (i % 50 == 0) {
					console.log("Approving account: ", i);
				}
			}

			// Whitelist mints
			await contract.seedAllowlist([accounts[1], accounts[2], accounts[3]], 1);
			await contract.seedAllowlist([accounts[4]], 2);
			await contract.seedAllowlist([accounts[5]], 3);
			mintResult = await contract.mintAllowlist({ from: accounts[1] });
			mintResult = await contract.mintAllowlist({ from: accounts[2] });
			mintResult = await contract.mintAllowlist({ from: accounts[3] });
			mintResult = await contract.mintAllowlist({ from: accounts[4] });
			mintResult = await contract.mintAllowlist({ from: accounts[5] });

			// Sale mints
			mintResult = await contract.mintSale(1, { from: accounts[6], value: toSend });
			mintResult = await contract.mintSale(3, { from: accounts[7], value: toSend * 3});

			// day = await passDays(10, t, day);
			// t = await mechToken.startTime();

			let results = {
				day: 0,
				t: startTime
			}

			async function passDaysMulti(n) {
				results.t -= 86400 * n;
				results.day += n;
				await mechToken.setStartTime(results.t);
			}


			for (let j=1; j < 50; j++) { 
				console.log("Day " + results.day.toString() + ", skipping 10 days");
				await passDaysMulti(3);

				// Claim + Mint
				for (let i=1; i < 8; i++) {

					// Claim token
					await contract.claimMechTokenAll({ from: accounts[i] });

					// Mint NFT if enough MECH token
					let numNFT = await contract.balanceOf(accounts[i], { from: accounts[i] });
					mintCost = await contract.mintCost({ from: accounts[i] });
					let bal = await mechToken.balanceOf(accounts[i], { from: accounts[i] });

					// console.log("BAL: ", bal);
					// console.log("MINT COST: ", mintCost);
					// console.log("BAL: ", bal.toNumber());
					// console.log("MINT COST: ", mintCost.toNumber());

					while (bal.gte(mintCost)) {

						await contract.mintNFT({ from: accounts[i] });
						let balAfter = await mechToken.balanceOf(accounts[i], { from: accounts[i] });

						console.log("Account [" + i.toString() + "], MECH [" + 
							bal.toNumber().toString() + "], NFTs: [" + numNFT.toNumber().toString() + 
								"] -- minting 1 at cost [" + mintCost.toString() + "], (after) MECH [" + balAfter.toNumber().toString()  + "]");
						
						bal = balAfter;
						// console.log("\tnew bal: [" + bal.toNumber().toString() + "]");
					}
				}


				// padStart, padEnd


				// Print Summary
				let numMinted = await contract.nMinted();
				let totalMech = await mechToken.totalSupply();
				console.log("\nDay [" + results.day.toString() + "], minted [" + numMinted.toNumber().toString() + 
					"], circulating MECH [" + totalMech.toNumber().toString() + "]");
				console.log("-----------------------------------------------------------------------");
				for (let i=0; i < 8; i++) {
					let numNFT = await contract.balanceOf(accounts[i], { from: accounts[i] });
					let bal = await mechToken.balanceOf(accounts[i], { from: accounts[i] });
					console.log("Account [" + i.toString() + "], MechaPunkx [" + 
						numNFT.toNumber().toString() + "], MECH [" + bal.toNumber().toString() + "]");
				}
				console.log("\n");
			}
			
			assert.equal(0, 0);
		});
		*/

		/*
		// Testing can mint dev allocation, 3M gas 
		await contract.seedAllowlist([accounts[8]], 30);
		mintResult = await contract.mintAllowlist({ from: accounts[8] });
		console.log("MINT RESULT: ", mintResult);
		*/


	});
});