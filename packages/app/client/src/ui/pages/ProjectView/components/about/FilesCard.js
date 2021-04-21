import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined'
import { TextButton } from '../../../../atoms'
import { Grid } from '@material-ui/core'
import { CardWithMedia } from '../../../../molecules'
import { useTrimmedText } from '../../../../hooks'
import DocumentsBackgroundImage from './DocumentsBackgroundImage'

const useStyles = makeStyles({
  cardContent: {
    paddingLeft: 0,
    paddingTop: 0
  },
  details: {
    overflowWrap: 'break-word',
    width: '100%',
    maxWidth: '100%'
  },
  nameContainer: {
    paddingLeft: 0,
    paddingTop: 5,
    paddingBottom: 5
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '140%',
  }
})

const FilesCard = ({ src, media, extension, name, onClick }) => {
  const classes = useStyles()
  const trimmedName = useTrimmedText({ text: name, max: 70 })
  const isDocumentType = media === 'document'

  return (
    <CardWithMedia
      maxHeight={300}
      maxWidth="100%"
      mediaProps={{
        media: isDocumentType ? 'image' : media,
        src,
        height: 140,
        extension,
      }}
      onClick={onClick}
      mediaAreaContent={isDocumentType && <DocumentsBackgroundImage />}
      actionAreaContent={
        <CardContent className={classes.nameContainer}>  
          <Grid zeroMinWidth wrap="nowrap" className={classes.nameWrapper} container item xs={9}>
            <Typography className={classes.text} component="p" className={classes.details}>
              {trimmedName}
            </Typography>
          </Grid>
        </CardContent>
      }
    >
       <CardContent className={classes.cardContent}>
        <Grid container alignItems="center" justify="space-between">
          <Typography className={classes.text} component="p">
            1.3 mb
          </Typography>
          <TextButton
            textContent="Download"
            startIcon={<SystemUpdateAltOutlinedIcon />}
            color="primary"
          />
        </Grid>
      </CardContent>
    </CardWithMedia>
  )
}

export default FilesCard
