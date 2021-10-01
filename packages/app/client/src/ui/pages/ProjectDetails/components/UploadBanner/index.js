import React, { useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import UploadedBanner from '../UploadedBanner'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import styles from './styles'
import { Button, Image } from '../../../../atoms'
import { AttachmentUploader } from '../../../../molecules'
import { ProjectPicture, MyPost } from '../../../../assets'
import { useImageUpload } from '../../../../hooks'
import { MAX_UPLOAD_SIZE } from '../../../../../unin-constants'

const UploadBanner = ({
  editing,
  oldPicture,
  handleChange,
  touched,
  errors,
  attachment,
  setFieldValue,
  setFieldError
}) => {
  const imgInputRef = useRef(null)
  const classes = styles()
  const {
    filePreview,
    handleUploading,
    clearPreview
  } = useImageUpload(
    {
      setAttachment: (att) => setFieldValue('attachment', att),
      onSizeExceded: () => setFieldError('attachment', 'File exceeds maximum size of 10MB, please use a smaller image'),
      maxUploadSize: MAX_UPLOAD_SIZE 
    }
  )

  return (
    <Grid item xs={12}>
      {editing ? (
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
              onChange={(e) => {
                handleChange(e)
                handleUploading(e)
              }}
            />
            <Button
              color="primary"
              className={classes.myPostButton}
              onClick={e => {
                e.preventDefault()
                imgInputRef.current.click()
              }}
              disabled={Boolean(filePreview?.name)}
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
          {filePreview?.name ? (
            <UploadedBanner
              name={filePreview.name}
              handleClick={
                () => {
                  clearPreview(null)
                  setFieldValue('attachment', null)
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
        {!!(touched && errors) && !oldPicture
          ? touched && errors
          : null}
      </FormHelperText>
    </Grid>
  )
}

export default UploadBanner
