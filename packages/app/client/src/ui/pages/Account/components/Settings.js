import React from 'react'
import { MainContainer } from '../../../templates'
import { SimpleFormWithHeader } from '../../../organisms'
import { useAuthAsyncActions } from '../../../hooks'
import { makeStyles } from '@material-ui/core/styles'
import { email, password } from '../../../../utils/formFields'

const useStyles = makeStyles(() => ({
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

function Settings(props) {
  const fields = [
    { ...email, initialValue: props.email || '', disabled: true },
    { ...password }
  ]
  const { checkUserPassword } = useAuthAsyncActions()

  const classes = useStyles()
  const submitHandler = async userDetails => {
    await checkUserPassword({ userId: props.id, userDetails })
  }
  return (
    <MainContainer size="small">
      <SimpleFormWithHeader
        fields={fields}
        title="Settings"
        onSubmit={submitHandler}
        submitLabel={'Change Password'}
        titleProps={{ align: 'left' }}
        buttonLayout={{ xs: 4 }}
      />
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.viewButton}
          variant="outlined"
          onClick={() => history.push(`users/${props.id}`)}
        >
          Save changes
        </Button>
      </div>
    </MainContainer>
  )
}

export default Settings
