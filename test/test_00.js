"use strict";

const assert = require("assert");
const { 
  BN, 
  expectEvent, 
  expectRevert 
} = require("@openzeppelin/test-helpers");

contract("WyvernExchange", async (accounts) => {

  const WyvernExchange = artifacts.require("./WyvernExchange");

  let exchange;

  before(async () => {
    registry = await NiftyRegistry.new(owners, signing_keys);
    
    defaultOwner = accounts[1];
    shop = await BuilderShop.new(registry.address, defaultOwner);
  });

  beforeEach(async () => {
    let result = await shop.createNewBuilderInstance(
      nifty_information[0].name,
      nifty_information[0].symbol,
      nifty_information[0].num_nifties,
      nifty_information[0].token_base_uri,
      nifty_information[0].creator_name
    );
    let address = result.logs[0].args[0];
    id = new BN(result.logs[0].args[1]);
    instance = await NiftyBuilderInstance.at(address);

    let success = await shop.isValidBuilderInstance(address);
    assert.strictEqual(success, true);
  });

  it("ensure you can't burn token after safe transfer", async function () {
    const niftyType = 1;
    const count = 1;

    let firstOutput = await instance.mintNifty(niftyType, count);
    let firstValue = firstOutput.logs[0].args[1];

    let firstToken = firstValue.toNumber();

    await instance.safeTransferFrom(defaultOwner, accounts[8], firstToken, {
      from: defaultOwner,
    });
    let firstBalanceOfOutput = await instance.balanceOf(accounts[7]);
    assert.strictEqual(0, firstBalanceOfOutput.toNumber());

    await expectRevert(
      instance.burn(firstToken, { 
        from: accounts[7] 
      }),
      errors.BURN_NOT_OWNER_OR_APPROVED_ERROR
    );

    await instance.burn(firstToken, { 
      from: accounts[8]
    });

    let secondBalanceOfOutput = await instance.balanceOf(accounts[8]);
    assert.strictEqual(0, secondBalanceOfOutput.toNumber());
  });



  it("can only perform safe transfer after an approve operation, not before", async function () {
    const niftyType = 1;
    const count = 1;

    let firstOutput = await instance.mintNifty(niftyType, count);
    let firstValue = firstOutput.logs[0].args[0];
    let firstTokenId = firstValue.toNumber();
    await expectRevert(
      instance.safeTransferFrom(defaultOwner, accounts[7], firstTokenId, {
        from: accounts[8],
      }),
      errors.TRANSFER_CALLER_NOT_ALLOWED_ERROR
    );
    await instance.approve(accounts[8], firstTokenId, {
      from: defaultOwner,
    });
    await instance.safeTransferFrom(defaultOwner, accounts[7], firstTokenId, {
        from: defaultOwner,
    });
  });


 
    
      




 



 





  

  
});


