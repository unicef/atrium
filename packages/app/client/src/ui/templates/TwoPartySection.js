import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => 
  ({
    container: props => ({
      margin: 0,
      backgroundColor: theme.colors[props.bgColor]
    })
  })
)

const TwoPartySection = ({ bgColor, containerProps, partiesContainerProps, ...props }) => {
  const classes = useStyles({ bgColor })
  const firstPartyProps = partiesContainerProps[0] || {}
  const secondPartyProps = partiesContainerProps[1] || {}
  const mergedClassNames = [classes.container, containerProps.className || ''].join(' ')

  let children = React.Children.toArray(props.children)

  if (props.reverse) {
    children = children.reverse()
  }

  return (
    <Grid container item xs={12} {...{ ...containerProps, className: mergedClassNames }}>
      <Grid item container xs={12} sm={6} md={6} {...firstPartyProps}>
        {children[0]}
      </Grid>
      <Grid item container xs={12} sm={6} md={6} {...secondPartyProps}>
        {children[1]}
      </Grid>
    </Grid>
  )
}

TwoPartySection.defaultProps = {
  bgColor: 'white',
  partiesContainerProps: [{}, {}],
  containerProps: {}
}

export default TwoPartySection
