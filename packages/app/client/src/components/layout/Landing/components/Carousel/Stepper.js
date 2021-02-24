import React from 'react'
import { compose } from 'recompose'
import classnames from 'classnames'
import withStyles from '@material-ui/styles/withStyles'

const styles = theme => ({
  list: {
    display: 'flex',
    alignItems: 'center'
  },
  listItem: {
    display: 'flex',
    borderRadius: 50,
    width: 35,
    height: 1,
    backgroundColor: theme.colors['dark-forest-green'],
    '&:not(:last-child)': {
      marginRight: 20
    }
  },
  active: {
    height: 3,
    backgroundColor: theme.colors['shamrock-green']
  }
})

const Stepper = ({ classes, count, activeSlide }) => {
  // create an array of dividers by the 'count' of slides
  const array = Array.from({ length: count }, (_, i) =>
    React.createElement('span', { id: i })
  )

  // render an array and set the 'active' style by key === id of divider
  const renderList = array.map((obj, key) => {
    const className = classnames(classes.listItem, {
      [classes.active]: activeSlide === obj.props.id
    })

    return React.cloneElement(obj, { key, className })
  })

  return <div className={classes.list}>{renderList}</div>
}

export default compose(React.memo, withStyles(styles))(Stepper)
