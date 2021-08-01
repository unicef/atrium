import React, { useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import UploadedBanner from './UploadedBanner'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Button, Image } from '../../../atoms'
import { AttachmentUploader } from '../../../molecules'
import { ProjectPicture, MyPost } from '../../../assets'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: 'black',
    marginBottom: 6,
    fontWeight: 500
  },
  editAttachmentMessage: {
    color: theme.colors['dark-gray']
  },
  fileInput: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  fileInputLabel: {
    cursor: 'pointer'
  },
  dropBoxBorder: {
    padding: '3%',
    width: '100%',
    backgroundImage:
      'repeating-linear-gradient(2deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px),' +
      ' repeating-linear-gradient(92deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px), ' +
      'repeating-linear-gradient(182deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px), ' +
      'repeating-linear-gradient(272deg, #b9b1b1, #b9b1b1 14px, transparent 14px, transparent 27px, #b9b1b1 27px)',
    backgroundSize: '1px 100%, 100% 1px, 1px 100% , 100% 1px',
    backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center'
  },
  firstDropBoxText: {
    marginTop: '2%',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 350,
    fontSize: 18
  },
  secondDropBoxText: {
    marginTop: '2%',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 200,
    fontSize: 13
  },
  errorMessage: {
    marginLeft: 0,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '140%',
    color: theme.palette.error.main
  },
}))

const UploadBanner = ({
  editting,
  oldPicture,
  picture,
  setPicture,
  handleChange,
  touched,
  errors,
  attachment,
  setFieldValue
}) => {
  const imgInputRef = useRef(null)
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      {editting ? (
        <>
          <InputLabel
            className={classes.inputLabel}
            shrink
            htmlFor="attachment"
          >
            Project photo{' '}
            <Typography
              className={classes.editAttachmentMessage}
              component="span"
            >
              (maximum size of 10MB)
            </Typography>
          </InputLabel>
          <Box position="relative" width="100%" height="250px">
            <Image
              width="100%"
              height="250px"
              borderRadius="5px"
              sameSize
              src={oldPicture || ProjectPicture}
            />
            <input
              ref={imgInputRef}
              type="file"
              id="attachment"
              name="attachment"
              className={classes.fileInput}
              onChange={e => {
                setPicture(e.target.files[0])
                handleChange(e)
              }}
            />
            <Button
              color="primary"
              className={classes.myPostButton}
              onClick={e => {
                e.preventDefault()
                imgInputRef.current.click()
              }}
              disabled={!!picture}
            >
              <label
                htmlFor={'attachment'}
                className={classes.fileInputLabel}
                aria-label={'ATTACH IMAGE'}
                title={'ATTACH IMAGE'}
              >
                <img src={MyPost} alt="ProjectPicture" />
              </label>
            </Button>
          </Box>
          {picture ? (
            <UploadedBanner
              name={picture.name}
              handleClick={
                () => {
                  setPicture(null)
                  imgInputRef.current.value = null
                }
              }
            />
          ) : null}
        </>
      ) : (
        <div className={classes.dropBoxBorder}>
          <div>
            <CloudUploadIcon fontSize="large" />
          </div>
          <div className={classes.firstDropBoxText}>
            Select project picture
          </div>
          <div className={classes.secondDropBoxText}>
            Suggested size 1000px x 300px, under 10mb
          </div>
          <AttachmentUploader
            attachment={attachment}
            setAttachment={val => setFieldValue('attachment', val)}
            variant="create"
          />
        </div>
      )}
      <FormHelperText className={classes.errorMessage}>
        {!!(touched.attachment && errors.attachment) && !oldPicture
          ? touched.attachment && errors.attachment
          : null}
      </FormHelperText>
    </Grid>
  )
}

export default UploadBanner
