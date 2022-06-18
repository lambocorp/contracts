// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.6.0/token/ERC1155/extensions/ERC1155Supply.sol";

contract MechaPunkxLegends is ERC1155, Ownable, ERC1155Supply {
    
    string public contractURI = "https://lambo.lol/mechapunkx-legends/contract.json";
    
    constructor() ERC1155("https://lambo.lol/metadata/mechapunkx-legends/{id}.json") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function setContractURI(string memory newuri) 
        public 
        onlyOwner 
    {
        contractURI = newuri;
    }

    function name() public view returns(string memory) {
        return "MechaPunkx Legends";
    }
    
}