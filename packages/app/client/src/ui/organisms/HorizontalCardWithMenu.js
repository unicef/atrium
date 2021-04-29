import React from 'react'
import Card from '@material-ui/core/Card'
import makeStyles from '@material-ui/styles/makeStyles'
import { ShadedPaper } from '../atoms'
import { ThreeDotsPopover } from '../molecules'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    width: '100%',
    boxShadow: 'none',
    overflow: 'visible',
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  cardContent: {
    position: 'relative',
    width: '100%'
  },
  edit: {
    position: 'absolute',
    right: 5,
    top: 5
  }
}))

const HorizontalCardWithMenu = (props) => {
  const { userIsTheOwner } = props
  const classes = useStyles({ userIsTheOwner })
  const bgColor = userIsTheOwner ? 'light-green' : 'white'

  return (
    <Card raised={false} className={classes.card}>
      <ShadedPaper elevation={0} bgColor={bgColor} className={classes.cardContent}>
        {userIsTheOwner ? (
          <div className={classes.edit}>
            <ThreeDotsPopover
              menuItems={props.menuItems}
            />
          </div>
        ) : null}
        {props.children}
      </ShadedPaper>
    </Card>
  )
}

export default HorizontalCardWithMenu