import React from 'react'
import Grid from '@material-ui/core/Grid'
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined'
import FilesGrid from './FilesGrid'
import FileGridWithViewModal from './FileGridWithViewModal'
import { TextButton, Divider } from '../../../../atoms'
import { Box, Typography } from '@material-ui/core'
import { ABOUT_PROJECT_SECTIONS } from '../../../../../unin-constants'

const Header = ({ title, count, id }) => (
  <Grid id={id} container justify="space-between" item xs={12}>
    <Box>
      <Typography variant="h5">
        {title} ({count})
      </Typography>
    </Box>

    <Box mb={3}>
      <TextButton
        textContent="Download all"
        startIcon={<SystemUpdateAltOutlinedIcon />}
        color="primary"
      />
    </Box>
  </Grid>
)

const FilesSection = (props) => {
  const lastSectionIndex = ABOUT_PROJECT_SECTIONS.length - 1
  const subItems = ABOUT_PROJECT_SECTIONS[lastSectionIndex].subItems
  return (
    <Grid container item xs={10}>
      <Box mb={2}>
        <Typography id="projectFiles" variant="h3">
          Files
        </Typography>
      </Box>

      {subItems.map((item, index) => {
        const isTheLastIndex = index === (subItems.length - 1)
        const files = props[item.dataKey]
        const isDocumentsSubItem = item.mediaType === 'document'

        return (
          <div key={item.id}>
            <Grid container item xs={12}>
              <Header id={item.id} title={item.label} count={files.length} />

              {isDocumentsSubItem ? 
                <FilesGrid mediaType={item.mediaType} files={files} /> :
                <FileGridWithViewModal  mediaType={item.mediaType} files={files} />
              }
            </Grid>
            {!isTheLastIndex && <Divider mb={20} />}
          </div>
        )
      })}
    </Grid>
  )
}

export default FilesSection
