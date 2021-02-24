import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  hoverable: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  tagsText: {
    color: theme.colors['shamrock-green'],
    overflowWrap: 'break-word',
    fontSize: 19
  },
  tagList: {
    display: 'flex'
  },
  tagListItem: {
    width: 'auto',
    padding: 0
  },
}))

const TagsList = ({ tags = [], onClickTag }) => {
  const classes = useStyles()

  return !tags.length ? null : (
    <List disablePadding className={classes.tagList}>
      {tags.map((obj, k) => (
        <ListItem className={classes.tagListItem} key={k}>
          <ListItemText
            onClick={onClickTag ? () => onClickTag(obj) : null}
            className={onClickTag ? `${classes.tagsText} ${classes.hoverable}` : classes.tagsText}
            primary={obj ? `#${obj}` : ''}
          />
          &nbsp;
        </ListItem>
      ))}
    </List>
  )
}

TagsList.propTypes = {
  tags: PropTypes.array,
}

export default TagsList
