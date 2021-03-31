import React from 'react'
import { SectionContainer } from '../../../templates'
import { SectionDescription, ResourceList } from '../components'

const resource = {
  title: "Background on bitcoin and blockchain",
  href: "https://techcrunch.com/"
}

const sections = [
  {
    title: "Blockchain",
    resources: [resource]
  },
  {
    title: "Cryptocurrency",
    resources: [resource]
  },
  {
    title: "Bitcoin",
    resources: [resource]
  }
]


const ExternalResources = () => {
  return (
    <SectionContainer id="externalResources" padding="40px 80px 80px 80px" spacing={5} md={8} lg={6}>
      <SectionDescription
        title="External resources"
        text="Below you'll find various external resources, classified by category. Have a resource you think should be here? Share in the Forum section of the platform."
      />
      <ResourceList sections={sections} />
    </SectionContainer>
  )
}

export default ExternalResources
