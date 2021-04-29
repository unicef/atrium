import React from 'react'
import TreeItem from '@material-ui/lab/TreeItem'
import { makeStyles } from '@material-ui/core/styles'

const handleColors = ({ main, colors }) => {
  if (main) {
    return Object.keys(colors).reduce((acc, key) => ({...acc, [key]: colors[key].main }), {})
  }

  return Object.keys(colors).reduce((acc, key) => ({...acc, [key]: colors[key].subitem }), {})
}

const useStyles = makeStyles(theme => {
  const forcedBg = `${theme.colors.white} !important`
  
  return {
    root: {
      marginBottom: 8
    },
    iconContainer: props =>({
      display: props.main ? 'flex' : 'none',
      '& > svg': {
        fill: theme.colors[props.colors.default]
      }
    }),
    content: props => ({
      backgroundColor: forcedBg,
      fontWeight: props.main ? theme.typography.fontWeightMedium : theme.typography.fontWeightLight,
      flexDirection: props.main ? 'row-reverse' : 'row',
      justifyContent: props.main ? 'flex-end' : 'flex-start'
    }),
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: props => ({
      backgroundColor: forcedBg,
      '& > $content > $label': {
        color: theme.colors[props.colors.expanded]
      },
      '& > $content > $iconContainer > svg': {
        fill: theme.colors[props.colors.expanded]
      }
    }),
    selected: props => ({
      backgroundColor: 'transparent',
      '& > $content > $label': {
        color: theme.colors[props.colors.selected],
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: forcedBg,
      }
    }),
    label: props => ({
      fontWeight: 'inherit',
      fontSize: 16,
      marginRight: props.main ? 8 : 0, 
      color: theme.colors[props.colors.default],
      width: 'auto',
      backgroundColor: forcedBg,
      '&:hover': {
        color: theme.colors[props.colors.hover],
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: forcedBg,
      },
    }),
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1
    },
  }
})

const TreeMenuItem = ({ main, colors, ...props}) => {
  const classes = useStyles({ main, colors: handleColors({ main, colors }) })
 
  return (
    <TreeItem
      classes={classes}
      {...props}
    />
  )
}

TreeMenuItem.defaultProps = {
  colors: {
    default: {
      subitem: 'black-three',
      main: 'black-three'
    },
    expanded: {
      subitem: 'black-three',
      main: 'black-three'
    },
    selected: {
      subitem: 'shamrock-green',
      main: 'black-three'
    },
    hover: {
      subitem: 'shamrock-green',
      main: 'black-three'
    }
  }
}

export default TreeMenuItem
