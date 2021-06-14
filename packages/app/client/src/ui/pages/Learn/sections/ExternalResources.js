import React from 'react'
import { SectionContainer } from '../../../templates'
import { SectionDescription, ResourceList } from '../components'

const existingResources = {
  BLOCKCHAIN: [
    {
      title: 'The meaning of decentralization',
      description: 'by Vitalik Buterin',
      href:
        'https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274',
      likes: [],
      category: 'BLOCKCHAIN'
    }
  ],
  CRYPTOCURRENCY: [
    {
      title: 'Course: An introduction to digital currencies',
      href: 'https://www.unic.ac.cy/blockchain/free-mooc/',
      likes: [],
      category: 'CRYPTOCURRENCY'
    },
    {
      title: 'Top 100 cryptocurrencies by market capitalization',
      href: 'https://coinmarketcap.com/',
      likes: [],
      category: 'CRYPTOCURRENCY'
    },
    {
      title: 'Discover cryptocurrency',
      href: 'https://www.coinbase.com/learn',
      likes: [],
      category: 'CRYPTOCURRENCY'
    }
  ],
  WALLETS: [
    {
      title: 'Crypto wallets explained',
      href: 'https://cointelegraph.com/explained/crypto-wallets-explained',
      likes: [],
      category: 'WALLETS'
    }
  ],
  ETHEREUM: [
    {
      title: 'Ethereum.org',
      description: '',
      href: 'https://ethereum.org/',
      likes: [],
      category: 'ETHEREUM'
    },
    {
      title: 'The history of Ethereum',
      description: '',
      href: 'https://thehistoryofethereum.com/',
      likes: [],
      category: 'ETHEREUM'
    }
  ],
  BITCOIN: [
    {
      title: 'A brief history of Bitcoin',
      description: '10 Years of Highs and Lows',
      href:
        'https://cointelegraph.com/news/a-brief-history-of-bitcoin-10-years-of-highs-and-lows',
      likes: [],
      category: 'BITCOIN'
    },
    {
      title: 'Video: How Bitcoin Works in 5 Minutes',
      description: '',
      href: 'https://www.youtube.com/watch?v=l9jOJk30eQs',
      likes: [],
      category: 'BITCOIN'
    },
    {
      title: 'Video: How Bitcoin works under the hood',
      description: '',
      href: 'https://www.youtube.com/watch?v=Lx9zgZCMqXE&t=2s',
      likes: [],
      category: 'BITCOIN'
    }
  ],
  USE_CASES: [
    {
      title: 'Report: Blockchain and social impact',
      description: '',
      href:
        'https://www.gsb.stanford.edu/sites/gsb/files/publication-pdf/study-blockchain-impact-moving-beyond-hype_0.pdf',
      likes: [],
      category: 'USE_CASES'
    },
    {
      title:
        'Blockchain and distributed ledger technologies in the humanitarian sector',
      description: '',
      href:
        'https://www.odi.org/sites/odi.org.uk/files/resource-documents/12605.pdf',
      likes: [],
      category: 'USE_CASES'
    },
    {
      title: 'Guide: The blueprint for blockchain & social innovation',
      description: '',
      href:
        'https://www.newamerica.org/digital-impact-governance-inititiative/blockchain-trust-accelerator/reports/blueprint-blockchain-and-social-innovation/',
      likes: [],
      category: 'USE_CASES'
    }
  ],
  SUPPLEMENTARY_RESOURCES: [
    {
      title: 'Crypto cannon by a16z',
      description: '',
      href: 'https://a16z.com/2018/02/10/crypto-readings-resources/',
      likes: [],
      category: 'SUPPLEMENTARY_RESOURCES'
    },
    {
      title: 'Glossary of blockchain terms',
      description: '',
      href:
        'https://blockchaintrainingalliance.com/pages/glossary-of-blockchain-terms',
      likes: [],
      category: 'SUPPLEMENTARY_RESOURCES'
    },
    {
      title: 'Blockchain and cryptocurrency learning hub',
      description: '',
      href: 'https://decrypt.co/learn',
      likes: [],
      category: 'SUPPLEMENTARY_RESOURCES'
    }
  ]
}

const sections = Object.keys(existingResources).map(key => {
  let title = key[0] + key.slice(1).toLowerCase()
  return {
    title: title.replace('_', ' '),
    resources: existingResources[key]
  }
})

const ExternalResources = () => {
  return (
    <SectionContainer
      id="externalResources"
      padding="40px 80px 80px 80px"
      spacing={5}
      md={8}
      lg={6}
    >
      <SectionDescription
        title="External resources"
        text="Below you'll find various external resources, classified by category. Have a resource you think should be here? Share in the Forum section of the platform."
      />
      <ResourceList sections={sections} />
    </SectionContainer>
  )
}

export default ExternalResources
