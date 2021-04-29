import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined'
import { TextButton } from './TextButton'
import { makeStyles } from '@material-ui/core/styles'
import { composeMargins } from '../utils'


const useStyles = makeStyles(() => ({
  iconContainer: props => ({
    ...composeMargins(props)
  })
}))

const ShowMoreButton = ({ isShowingMore, handleClick, showByNavigating, iconMargins }) => {
  const endIcon = isShowingMore ? <RemoveIcon /> : <AddIcon />
  const text = isShowingMore ? 'Show less' : 'Show more'
  const classes = useStyles(iconMargins)

  return (
    <TextButton
      endIcon={showByNavigating ? <NavigateNextOutlinedIcon /> : endIcon}
      textContent={text}
      size="outlined"
      color="primary"
      // TODO: IMPORVE BUTTONS
      style={{ margin: 0, padding: '5px 10px 5px 3px' }}
      onClick={handleClick}
      classes={{ endIcon: classes.iconContainer }}
    />
  )
}

ShowMoreButton.defaultProps = {
  iconMargins: {
    ml: 3,
    mt: 0,
    mb: 0,
    mr: 0
  }
}

export default ShowMoreButton
