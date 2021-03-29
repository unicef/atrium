import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => 
  ({
    container: props => ({
      margin: 0,
      backgroundColor: theme.colors[props.bgColor],
      padding: 80,
      [theme.breakpoints.down("xs")]: {
        padding: 20
      },
    }),
    parties: {
      [theme.breakpoints.up("md")]: {
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  })
)

const mergedClassNames = (primaryClasses, secondaryClasses) => [secondaryClasses, primaryClasses].join(' ')

const TwoPartySection = ({ bgColor, containerProps, partiesContainerProps, ...props }) => {
  const classes = useStyles({ bgColor })
  const firstPartyProps = partiesContainerProps[0] || {}
  const secondPartyProps = partiesContainerProps[1] || {}
  const containerClasses = mergedClassNames(classes.container, containerProps.className || '')
  const firstPartyClasses = mergedClassNames(classes.parties, firstPartyProps.className || '')
  const secondPartyClasses = mergedClassNames(classes.parties, secondPartyProps.className || '')

  let children = React.Children.toArray(props.children)

  if (props.reverse) {
    children = children.reverse()
  }

  return (
    <Grid container item justify="center" xs={12} {...containerProps} className={containerClasses}>
      <Grid container item  xs={12} md={10}>
        <Grid item container xs={12} sm={12} md={6} {...firstPartyProps} className={firstPartyClasses}>
          {children[0]}
        </Grid>
        <Grid item container xs={12} sm={12} md={6} {...secondPartyProps} className={secondPartyClasses}>
          {children[1]}
        </Grid>
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
