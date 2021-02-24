import web3 from './web3'
require('dotenv').config()
// Need to pass in an address after the Decisions.sol contract is deployed
const address = '0x1c67d36b2A076Bf8a0634b852BE022d721AECA8e'
// use the ABI from your contract
const abi = [
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'decisionToOwner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    name: 'ownerDecisionCount',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'decisions',
    outputs: [
      {
        name: 'pollId',
        type: 'string'
      },
      {
        name: 'twitterLink',
        type: 'string'
      },
      {
        name: 'topic',
        type: 'string'
      },
      {
        name: 'pollResult',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'certId',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'pollId',
        type: 'string'
      },
      {
        indexed: false,
        name: 'twitterLink',
        type: 'string'
      },
      {
        indexed: false,
        name: 'topic',
        type: 'string'
      },
      {
        indexed: false,
        name: 'pollResult',
        type: 'string'
      }
    ],
    name: 'NewDecision',
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_pollId',
        type: 'string'
      },
      {
        name: '_twitterLink',
        type: 'string'
      },
      {
        name: '_topic',
        type: 'string'
      },
      {
        name: '_pollResult',
        type: 'string'
      }
    ],
    name: '_createDecision',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      }
    ],
    name: '_getDecision',
    outputs: [
      {
        name: '',
        type: 'string'
      },
      {
        name: '',
        type: 'string'
      },
      {
        name: '',
        type: 'string'
      },
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: '_getOwnerCount',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]
export default new web3.eth.Contract(abi, address)
