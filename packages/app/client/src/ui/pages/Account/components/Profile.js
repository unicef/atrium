import React, { useState } from 'react'
import { SimpleFormWithHeader } from '../../../organisms'
import {
  name,
  bio,
  role,
  organization,
  website
} from '../../../../utils/formFields'
import { MainContainer } from '../../../templates'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Button } from '../../../atoms'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useAuthAsyncActions } from "../../../hooks";
import validateProfileForm from "../validateProfileForm";

const useStyles = makeStyles(() => ({
  websites: {
    padding: '8px',
    width: '100%'
  },
  website: {
    border: '1.2px solid #E7E7E7',
    borderRadius: '5px',
    padding: '2%',
    marginBottom: '2%'
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
  }
}))

function Profile(props) {
  const classes = useStyles()
  const history = useHistory()
  const [editting, setEditting] = useState(false)
  const [websites, setWebsites] = useState(props.websites)
  const { updateUser } = useAuthAsyncActions()

  const submitHandler = async userDetails => {
    await updateUser({ ...userDetails, websites })
    setEditting(false)
  }
  const fields = [
    { ...name, initialValue: props.name || '', disabled: !editting },
    { ...bio, initialValue: props.bio || '', rows: 4, multiline: true, disabled: !editting },
    { ...role, initialValue: props.role || '', disabled: !editting },
    { ...organization, initialValue: props.organization || '', disabled: !editting },
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
        onSubmit={editting ? submitHandler : () => setEditting(true)}
        submitLabel={editting ? 'Save changes' : 'Edit'}
        titleProps={{ align: 'left' }}
        buttonLayout={{ xs: 4 }}
        // isSubmitting={editting}
        // isValid={true}
        // validate={validateProfileForm}
        renderBellowForm={
          <div className={classes.websites}>
            {websites.map((item, i) => (
              <Typography
                className={classes.website}
                key={item.replace(/s/g, '') + i}
              >
                {item}
              </Typography>
            ))}
          </div>
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
