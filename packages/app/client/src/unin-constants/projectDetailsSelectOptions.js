const AGENCIES_LIST = require('./agenciesList')
const list = require('country-list')

module.exports = Object.freeze({
  BLOCKCHAIN_NAME: [
    {
      value: 'bitcoin',
      label: 'Bitcoin'
    },
    {
      value: 'ethereum',
      label: 'Ethereum'
    },
    {
      value: 'hyperledger',
      label: 'Hyperledger'
    },
    {
      value: 'corda',
      label: 'Corda'
    },
    {
      value: 'quorum',
      label: 'Quorum'
    },
    {
      value: 'iota',
      label: 'IOTA'
    },
    {
      value: 'stellar',
      label: 'Stellar'
    },
    {
      value: 'other',
      label: 'Other - please specify'
    }
  ],
  STAGE_OF_PROJECT: [
    {
      value: 'Research',
      label: 'Research'
    },
    {
      value: 'Ideation',
      label: 'Ideation'
    },
    {
      value: 'Prototype',
      label: 'Prototype'
    },
    {
      value: 'Implementation',
      label: 'Implementation'
    },
    {
      value: 'Production',
      label: 'Production'
    }
  ],
  INNOVATION_CATEGORY: [
    {
      value: 'Blockchain',
      label: 'Blockchain'
    },
    {
      value: 'Financial Inclusion',
      label: 'Financial Inclusion'
    },
    {
      value: 'Health',
      label: 'Health'
    },
    {
      value: 'Identity',
      label: 'Identity'
    },
    {
      value: 'Supply Chains',
      label: 'Supply Chains'
    },
    {
      value: 'Food and Water',
      label: 'Food and Water'
    },
    {
      value: 'Marketplaces',
      label: 'Marketplaces'
    },
    {
      value: 'Energy',
      label: 'Energy'
    },
    {
      value: 'Accounting and Audit',
      label: 'Accounting and Audit'
    },
    {
      value: 'Innovative Financing',
      label: 'Innovative Financing'
    },
    {
      value: 'Nutrition',
      label: 'Nutrition'
    },
    {
      value: 'Emergency Response',
      label: 'Emergency Response'
    },
    {
      value: 'Government system',
      label: 'Government system'
    },
    {
      value: 'Other',
      label: 'Other'
    }
  ],
  THEMATIC_AREA: [
    {
      value: 'End Poverty',
      label: 'End Poverty'
    },
    {
      value: 'Zero Hunger',
      label: 'Zero Hunger'
    },
    {
      value: 'Good Health and Well-Being',
      label: 'Good Health and Well-Being'
    },
    {
      value: 'Quality Education',
      label: 'Quality Education'
    },
    {
      value: 'Gender Equality',
      label: 'Gender Equality'
    },
    {
      value: 'Clean Water and Sanitation',
      label: 'Clean Water and Sanitation'
    },
    {
      value: 'Affordable and Clean Energy',
      label: 'Affordable and Clean Energy'
    },
    {
      value: 'Decent Work and Economic Growth',
      label: 'Decent Work and Economic Growth'
    },
    {
      value: 'Industry, Innovation and Infrastructure',
      label: 'Industry, Innovation and Infrastructure'
    },
    {
      value: 'Reduced Inequalities',
      label: 'Reduced Inequalities'
    },
    {
      value: 'Sustainable Cities and Communities',
      label: 'Sustainable Cities and Communities'
    },
    {
      value: 'Responsible Consumption and Production',
      label: 'Responsible Consumption and Production'
    },
    {
      value: 'Climate action',
      label: 'Climate action'
    },
    {
      value: 'Life Below Water',
      label: 'Life Below Water'
    },
    {
      value: 'Life on Land',
      label: 'Life on Land'
    },
    {
      value: 'Peace, Justice and Strong Institutions',
      label: 'Peace, Justice and Strong Institutions'
    },
    {
      value: 'Partnerships for Goals',
      label: 'Partnerships for Goals'
    }
  ],
  ORGANIZATION: AGENCIES_LIST.map(agency => ({ value: agency.name, label: agency.name })),
  COUNTRY: list.getNames()
  .sort()
  .map(country => ({ value: country, label: country }))
})
