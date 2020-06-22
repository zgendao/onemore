pragma solidity ^0.5.0;

contract DiceContract  {
  constructor() public { owner = msg.sender; }
  address payable owner;
  uint8 constant threshold = 2;
  uint8 constant odds = 0.40 * 10; //40 percent

  event Won(address indexed _from);
  event Lost();

  modifier onlyOwner {
    require(
      msg.sender == owner,
      "Only owner can call this function."
    );
    _;
  }

  function kill() external onlyOwner {
    selfdestruct(owner);
  }

  function deposit() public payable onlyOwner {}

  function() external payable {
    require(msg.value < address(this).balance/threshold, "Send less than balance/2");
    uint random = (uint(blockhash(block.number-1))%10 + 1);
    if(random > odds){
      emit Lost();
    }else{
      address(msg.sender).transfer(msg.value*2);
      emit Won(msg.sender);
    }
  }
}
