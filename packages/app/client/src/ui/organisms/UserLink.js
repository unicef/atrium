import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import { UserInfoModal } from './'

const styles = theme => ({
  nameText: props => ({
    color: theme.colors[props.color],
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '180%',
    marginLeft: 5,
    marginRight: 5
  })
})

/**
 * Create a styled typography to display a user in places such as in mentions
 *
 * @param {UserLinkProps} props
 */
const UserLink = ({ id, name, classes, ...props }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Typography
        variant="subtitle1"
        component="span"
        className={classes.nameText}
        onClick={() => setOpen(true)}
      >
        {name}
      </Typography>
      {open ? (
        <UserInfoModal userId={id} onClose={() => setOpen(false)} />
      ) : null}
    </>
  )
}

UserLink.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.object
}

UserLink.defaultProps = {
  color: 'shamrock-green'
}

export default withStyles(styles)(UserLink)
