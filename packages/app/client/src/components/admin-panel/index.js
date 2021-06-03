import React from 'react'
import { MainContainer } from '../../ui'
import { InfoSection } from '../../ui/pages/Account/components'
import ContentReport from '../content-reports'

const AdminPanel = () => {
  return (
    <MainContainer>
      <InfoSection>
        <ContentReport />
      </InfoSection>
    </MainContainer>
  )
}

export default AdminPanel
