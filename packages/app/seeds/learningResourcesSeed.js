require('dotenv').config()
const mongoose = require('mongoose')
const mongoConnection = require('../config/mongoConfig')
const { LEARNING_CATEGORIES_ENUM } = require('../config/unin-constants')
const LearningResource = require('../models/LearningResource')

const existingResources = [
  {
    title: 'The meaning of decentralization',
    description: 'by Vitalik Buterin',
    link:
      'https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.BLOCKCHAIN
  },
  {
    title: 'Course: An introduction to digital currencies',
    link: 'https://www.unic.ac.cy/blockchain/free-mooc/',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.CRYPTOCURRENCY
  },
  {
    title: 'Top 100 cryptocurrencies by market capitalization',
    link: 'https://coinmarketcap.com/',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.CRYPTOCURRENCY
  },
  {
    title: 'Discover cryptocurrency',
    link: 'https://www.coinbase.com/learn',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.CRYPTOCURRENCY
  },
  {
    title: 'Crypto wallets explained',
    link: 'https://cointelegraph.com/explained/crypto-wallets-explained',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.WALLETS
  },
  {
    title: 'Ethereum.org',
    description: '',
    link: 'https://ethereum.org/',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.ETHEREUM
  },
  {
    title: 'The history of Ethereum',
    description: '',
    link: 'https://thehistoryofethereum.com/',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.ETHEREUM
  },
  {
    title: 'A brief history of Bitcoin',
    description: '10 Years of Highs and Lows',
    link:
      'https://cointelegraph.com/news/a-brief-history-of-bitcoin-10-years-of-highs-and-lows',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.BITCOIN
  },
  {
    title: 'Video: How Bitcoin Works in 5 Minutes',
    description: '',
    link: 'https://www.youtube.com/watch?v=l9jOJk30eQs',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.BITCOIN
  },
  {
    title: 'Video: How Bitcoin works under the hood',
    description: '',
    link: 'https://www.youtube.com/watch?v=Lx9zgZCMqXE&t=2s',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.BITCOIN
  },
  {
    title: 'Report: Blockchain and social impact',
    description: '',
    link:
      'https://www.gsb.stanford.edu/sites/gsb/files/publication-pdf/study-blockchain-impact-moving-beyond-hype_0.pdf',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.USE_CASES
  },
  {
    title:
      'Blockchain and distributed ledger technologies in the humanitarian sector',
    description: '',
    link:
      'https://www.odi.org/sites/odi.org.uk/files/resource-documents/12605.pdf',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.USE_CASES
  },
  {
    title: 'Guide: The blueprint for blockchain & social innovation',
    description: '',
    link:
      'https://www.newamerica.org/digital-impact-governance-inititiative/blockchain-trust-accelerator/reports/blueprint-blockchain-and-social-innovation/',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.USE_CASES
  },
  {
    title: 'Crypto cannon by a16z',
    description: '',
    link: 'https://a16z.com/2018/02/10/crypto-readings-resources/',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.SUPPLEMENTARY_RESOURCES
  },
  {
    title: 'Glossary of blockchain terms',
    description: '',
    link:
      'https://blockchaintrainingalliance.com/pages/glossary-of-blockchain-terms',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.SUPPLEMENTARY_RESOURCES
  },
  {
    title: 'Blockchain and cryptocurrency learning hub',
    description: '',
    link: 'https://decrypt.co/learn',
    likes: [],
    category: LEARNING_CATEGORIES_ENUM.SUPPLEMENTARY_RESOURCES
  }
]

const seedExistingResources = async () => {
  try {
    for (const resource of existingResources) {
      const newResource = new LearningResource(resource)
      await newResource.save()
    }
  } catch (err) {
    console.error(err)
  }
}

if (require.main === module) {
  async function seed() {
    await seedExistingResources()
    process.exit(0)
  }
  seed()
}

module.exports = seedExistingResources
