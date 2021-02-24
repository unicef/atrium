import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 642,
    height: 239,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  title: {
    marginTop: 26,
    marginBottom: 26,
    color: theme.colors['dark-forest-green'],
    overflowWrap: 'break-word'
  },
  buttonContainer: {
    textAlign: 'right'
  },
  button: {
    margin: '8px',
    width: 165,
    height: 40,
    color: theme.colors['dark-forest-green'],
    borderColor: theme.colors['dark-forest-green'],
    fontSize: 13,
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    textAlign: 'center'
  }
}))

export default function SimpleModal(props) {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h2" className={classes.title}>
        Are you sure you want to delete this {props.type}?
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => {
            if (props.onDeleteClick) {
              props.onDeleteClick()
            }
          }}
        >
          Delete {props.type}
        </Button>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => {
            if (props.setOpen) {
              props.setOpen(false)
            }
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => {
          if (props.setOpen) {
            props.setOpen(false)
          }
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}
