import React from 'react'
import Box from '@material-ui/core/Box'
import { Image } from '../../../../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { DocumentBg, DocumentSVG } from '../../../../assets'

const DocumentsBackgroundImage = () => {
  return (
    <Box position="relative">
      <Image src={DocumentBg} width="100%" height="100%">
        <Box position="absolute" display="flex" justifyContent="center" alignItems="center" top={0} bottom={0} right={0} left={0}>
          <DocumentSVG />
        </Box>
      </Image>
    </Box>
  )
}

export default DocumentsBackgroundImage
