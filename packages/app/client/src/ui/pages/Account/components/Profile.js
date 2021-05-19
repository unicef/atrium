import React, { useState } from 'react'
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
import { Button } from '../../../atoms'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useAuthAsyncActions } from '../../../hooks'
import validateProfileForm from '../validateProfileForm'
import Grid from '@material-ui/core/Grid'
import { AvatarUploader, WebsitesList } from '../../../molecules'

const useStyles = makeStyles(() => ({
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
  }
}))

function Profile(props) {
  const classes = useStyles()
  const history = useHistory()
  const [editting, setEditting] = useState(false)
  const [websites, setWebsites] = useState(props.websites || [])
  const [avatar, setAvatar] = useState(props.avatar || null)

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
            <Grid item xs={12}>
              <AvatarUploader
                avatar={avatar}
                setAvatar={setAvatar}
                editting={editting}
              />
            </Grid>
            <Grid item xs={12}>
              <WebsitesList
                websites={websites}
                setWebsites={setWebsites}
                editting={editting}
              />
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
