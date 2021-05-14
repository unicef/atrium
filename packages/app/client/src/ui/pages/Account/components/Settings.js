import React from 'react'
import { MainContainer } from '../../../templates'
import { SimpleFormWithHeader } from '../../../organisms'
import { useAuthAsyncActions } from '../../../hooks'
import { makeStyles } from '@material-ui/core/styles'
import { email, currentPassword } from '../../../../utils/formFields'
import { Button, Image } from '../../../atoms'
import Typography from '@material-ui/core/Typography'
import { DeleteButton } from '../../../../components/projects/overview/assets'

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
  },
  line: {
    marginTop: '7%',
    borderBottom: '1px solid #E7E7E7'
  },
  deleteSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '195px',
    backgroundColor: 'white'
  }
}))

function Settings(props) {
  const fields = [
    { ...email, initialValue: props.email || '', disabled: true },
    { ...currentPassword }
  ]
  const { checkUserPassword } = useAuthAsyncActions()
  const { deleteUser } = useAuthAsyncActions()

  const classes = useStyles()
  const submitHandler = async userDetails => {
    await checkUserPassword({ userId: props.id, userDetails })
  }

  const deleteHandler = async () => {
    await deleteUser(props.id)
  }
  return (
    <MainContainer size="small" mt="-50px" margin="0">
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
          // onClick={() => history.push(`users/${props.id}`)}
        >
          Save changes
        </Button>
      </div>
      <div className={classes.line} />
      <Button onClick={deleteHandler} className={classes.deleteSection}>
        <Image
          sameSize
          borderRadius={0}
          width="14px"
          height="14px"
          src={DeleteButton}
        />
        <Typography variant="body1">Delete my account</Typography>
      </Button>
    </MainContainer>
  )
}

export default Settings
