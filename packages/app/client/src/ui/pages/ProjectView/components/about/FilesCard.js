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

const FilesCard = ({ src, media, extension, name, onClick, size }) => {
  const classes = useStyles()
  const nameWithoutId = name.substr(name.indexOf('-') + 1)

  const trimmedName = useTrimmedText({ text: nameWithoutId, max: 70 })
  const isDocumentType = media === 'document'
  const sizeText = `${(size / 1000000).toFixed(2)} mb`

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
          <Grid zeroMinWidth wrap="nowrap" className={classes.nameWrapper} container item xs={12}>
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
           {sizeText}
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
