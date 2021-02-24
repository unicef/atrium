import "./SafeMath.sol";
import "./ERC165.sol";
import "./ERC721.sol";

contract Badge is ERC165, ERC721 {
  using SafeMath for uint256;


  mapping (address => uint256) private _ownedTokensCount;
  mapping (uint256 => address) private _tokenOwner;
  address private _admin;

  bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

  constructor (address admin) public {
    // register the supported interfaces to conform to ERC721 via ERC165
    require(admin != address(0), "Admin must not be 0 address");
    _registerInterface(_INTERFACE_ID_ERC721);
    _admin = admin;
  }

  function getAdmin() public view returns (address ad) {
    return _admin;
  }

  modifier onlyMinter() {
    require(msg.sender == _admin, "Minter must be admin");
    _;
  }

  function mint(address to, uint256 tokenId) public onlyMinter returns (bool) {
    require(to != address(0), "ERC721: mint to the zero address");
    require(_tokenOwner[tokenId] == address(0), "Token ID already minted");
    require(_ownedTokensCount[to] == 0, "Each user can only hold one badge of each type");

    _tokenOwner[tokenId] = to;
    _ownedTokensCount[to] = _ownedTokensCount[to].add(1);

    return true;
  }

  function burn(address to, uint256 tokenId) public onlyMinter returns (bool) {
    require(to != address(0), "ERC721: mint to the zero address");
    require(_tokenOwner[tokenId] != address(0), "User does not own this token");
    _tokenOwner[tokenId] = address(0);
    _ownedTokensCount[to].sub(1);
  }

  function balanceOf(address owner) public view returns (uint256 balance) {
    require(owner != address(0), "ERC721: balance query for the zero address");
    return _ownedTokensCount[owner];
  }

  function ownerOf(uint256 tokenId) public view returns (address) {
      address owner = _tokenOwner[tokenId];
      require(owner != address(0), "ERC721: owner query for nonexistent token");

      return owner;
  }

  function approve(address to, uint256 tokenId) public {
    require(false, "ERC721: the badge token does not support approvals");
  }

  function getApproved(uint256 tokenId) public view returns (address operator) {
    require(false, "ERC721: the badge token does not support approvals");
  }

  function setApprovalForAll(address operator, bool _approved) public {
    require(false, "ERC721: the badge token does not support approvals");
  }

  function isApprovedForAll(address owner, address operator) public view returns (bool) {
    require(false, "ERC721: the badge token does not support approvals");
  }

  function transferFrom(address from, address to, uint256 tokenId) public {
    require(false, "ERC721: the badge token does not support transfer");

  }

  function safeTransferFrom(address from, address to, uint256 tokenId) public {
    require(false, "ERC721: the badge token does not support transfer");
  }
}
