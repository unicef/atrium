import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined'
import FilesGrid from './FilesGrid'
import FileGridWithViewModal from './FileGridWithViewModal'
import { TextButton, Divider } from '../../../../atoms'
import { ABOUT_PROJECT_SECTIONS } from '../../../../../unin-constants'
import {downloadFile} from "../../../../../api/projects";

const Header = ({ title, count, id, files }) => (
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
        onClick={() =>
          files.map(
            async file =>
              await window.location.replace(
                file.url.replace('attachment', 'download')
              )
            // await downloadFile(file.name)
          )
        }
      />
    </Box>
  </Grid>
)

const FilesSection = props => {
  const lastSectionIndex = ABOUT_PROJECT_SECTIONS.length - 1
  const subItems = ABOUT_PROJECT_SECTIONS[lastSectionIndex].subItems
  return (
    <Grid container item xs={10}>
      <Box flexDirection="column" flex={1} display="flex">
        <Box mb={2}>
          <Typography id="projectFiles" variant="h3">
            Files
          </Typography>
        </Box>

        {subItems.map((item, index) => {
          const isTheLastIndex = index === subItems.length - 1
          const files = props[item.dataKey]
          const isDocumentsSubItem = item.mediaType === 'document'

          return (
            <Box key={item.id}>
              <Grid direction="column" container item xs={12}>
                <Header
                  id={item.id}
                  title={item.label}
                  count={files.length}
                  files={files}
                />

                {isDocumentsSubItem ? (
                  <FilesGrid mediaType={item.mediaType} files={files} />
                ) : (
                  <FileGridWithViewModal
                    mediaType={item.mediaType}
                    files={files}
                  />
                )}
              </Grid>
              {!isTheLastIndex && <Divider mb={20} />}
            </Box>
          )
        })}
      </Box>
    </Grid>
  )
}

export default FilesSection
