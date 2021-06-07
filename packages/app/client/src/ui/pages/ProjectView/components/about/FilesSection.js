import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined'
import React from 'react'
import { ABOUT_PROJECT_SECTIONS } from '../../../../../unin-constants'
import { Divider, TextButton } from '../../../../atoms'
import FileGridWithViewModal from './FileGridWithViewModal'
import FilesGrid from './FilesGrid'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const downloadAll = async (files, index = 0) => {
  if (index >= files.length) return
  await delay((index + 1) * 1000)
  const file = files[index]
  const a = document.createElement('a')
  a.href = file.url.replace('attachment', 'download')
  a.download = file.name
  a.type = file.extension
  document.body.append(a)
  a.click()
  a.remove()
  index++
  downloadAll(files, index)
}

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
        onClick={() => downloadAll(files)}
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
