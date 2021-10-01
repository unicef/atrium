import React, { useState } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import Close from '@material-ui/icons/Close'
import { TextArea, Button } from '../../../atoms'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  editingButton: {
    backgroundColor: '#F2F2F2',
    color: theme.colors.black,
    borderColor: '#F2F2F2',
    '& span:first-child': {
      justifyContent: 'space-between',
    },
    '&:hover': {
      backgroundColor: '#F2F2F2'
    }
  },
  closeIcon: {
    color: theme.palette.primary.main,
    fontSize: '16px'
  },
  defaultButton: {
    '&:hover': {
      borderWidth: '1.2px',
      borderColor: theme.palette.primary.main,
    }
  }
}))

const StoryField = ({ label, inputProps, setFieldValue, editingLabel }) => {
  const classes = useStyles()
  const hasValue = Boolean(inputProps.value)
  const [open, setCollpaseOpen] = useState(hasValue)

  return (
    <Grid item xs={12} container spacing={1}>
      <Grid item xs={12}>
        <Button
          onClick={() => setCollpaseOpen((prevVal) => {
            if (prevVal) {
              setFieldValue(inputProps.name, '')
            }

            return !prevVal
          })}
          color="secondary"
          variant="outlined"
          size="full"
          className={open ? classes.editingButton : classes.defaultButton}
          endIcon={open ? <Close className={classes.closeIcon} /> : null}
        >
          {open ? editingLabel : `+ ${label}`}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <TextArea
              label=""
              rows="10"
              fullWidth
              characterLimit={250}
              {...inputProps}
            />
        </Collapse>
      </Grid>
    </Grid>
  )
}

export default StoryField
