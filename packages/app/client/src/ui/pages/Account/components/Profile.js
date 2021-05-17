import React, { useEffect, useState } from 'react'
import { SimpleFormWithHeader } from '../../../organisms'
import {
  name,
  role,
  organization,
  website,
  bio
} from '../../../../utils/formFields'

import { MainContainer } from '../../../templates'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Avatar, Button, Image } from '../../../atoms'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useAuthAsyncActions } from '../../../hooks'
import validateProfileForm from '../validateProfileForm'
import { DeleteButton } from '../../../../components/projects/overview/assets'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(() => ({
  websites: {
    width: '100%'
  },
  enterButton: {
    color: '#15B54A',
    backgroundColor: 'white'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '-55px',
    paddingRight: '10px'
  },
  viewButton: {
    width: '141px',
    height: '51px'
  },
  website: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1.2px solid #E7E7E7',
    borderRadius: '5px',
    padding: '2%',
    marginBottom: '2%'
  },
  deleteButton: {
    backgroundColor: 'white',
    minWidth: 0,
    width: '12px',
    height: '13px'
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
  addFileButton: {
    marginRight: '5%'
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center'
  },
  clarification: {
    color: '#919492'
  }
}))

function Profile(props) {
  const inputRef = React.useRef(null)
  const classes = useStyles()
  const history = useHistory()
  const [editting, setEditting] = useState(false)
  const [websites, setWebsites] = useState(props.websites)
  const [avatar, setAvatar] = useState(props.avatar)

  const { updateUser } = useAuthAsyncActions()

  const submitHandler = async userDetails => {
    const formData = new FormData()
    if (avatar) {
      formData.append('avatar', avatar)
    }
    formData.append('name', userDetails.name)
    formData.append('bio', userDetails.bio)
    formData.append('role', userDetails.role)
    formData.append('organization', userDetails.organization)
    formData.append('websites', websites)
    await updateUser(props.id, formData)
    setEditting(false)
  }

  const fields = [
    { ...name, initialValue: props.name || '', disabled: !editting },
    {
      ...bio,
      initialValue: props.bio || '',
      rows: 4,
      multiline: true,
      disabled: !editting
    },
    { ...role, initialValue: props.role || '', disabled: !editting },
    {
      ...organization,
      initialValue: props.organization || '',
      disabled: !editting
    },
    {
      ...website,
      disabled: !editting,
      endAdornment: editting ? (
        <InputAdornment position="end">
          <Button
            className={classes.enterButton}
            onClick={() =>
              setWebsites([
                ...websites,
                document.getElementById('websiteInput').value
              ])
            }
          >
            Enter
          </Button>
        </InputAdornment>
      ) : null
    }
  ]

  return (
    <MainContainer size="small" mt="-50px" margin="0">
      <SimpleFormWithHeader
        fields={fields}
        title="Profile"
        onSubmit={
          editting
            ? submitHandler
            : (_, formProps) => {
                setEditting(true)
                formProps.setSubmitting(false)
              }
        }
        submitLabel={editting ? 'Save changes' : 'Edit'}
        titleProps={{ align: 'left' }}
        buttonLayout={{ xs: 4 }}
        validate={validateProfileForm}
        renderBellowForm={
          <>
            <Grid item xs={12} className={classes.avatarSection}>
              <input
                ref={inputRef}
                disabled={!editting}
                type="file"
                id="avatar"
                name="avatar"
                className={classes.fileInput}
                onChange={e => {
                  setAvatar(e.target.files[0])
                }}
              />
              <Button
                className={classes.addFileButton}
                disabled={!editting}
                color="primary"
                onClick={e => {
                  e.preventDefault()
                  inputRef.current.click()
                }}
              >
                <label
                  htmlFor="avatar"
                  className={classes.fileInputLabel}
                  aria-label="ATTACH FILE"
                  title="ATTACH FILE"
                >
                  Change avatar
                </label>
              </Button>
              {typeof avatar === 'string' ? (
                <Avatar src={avatar} />
              ) : (
                <Typography>{avatar.name}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.clarification} variant="body1">
                Upload a photo of size 50 by 50 less then 10mb
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.websites}>
                {websites.map((item, i) => (
                  <div
                    key={item.replace(/s/g, '') + i}
                    className={classes.website}
                  >
                    <Typography>{item}</Typography>
                    {editting ? (
                      <Button
                        className={classes.deleteButton}
                        onClick={() =>
                          setWebsites(websites.filter(el => el !== item))
                        }
                      >
                        <Image
                          sameSize
                          borderRadius={0}
                          width="14px"
                          height="14px"
                          src={DeleteButton}
                        />
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
            </Grid>
          </>
        }
      />
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.viewButton}
          variant="outlined"
          onClick={() => history.push(`users/${props.id}`)}
        >
          View profile
        </Button>
      </div>
    </MainContainer>
  )
}

export default Profile
