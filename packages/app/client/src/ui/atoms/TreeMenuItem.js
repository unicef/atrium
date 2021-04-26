import React from 'react'
import TreeItem from '@material-ui/lab/TreeItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: props => ({
    marginBottom: 8,
    '&:hover > $content': {
      backgroundColor: 'transparent',
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `transparent`,
      color: props.main ? theme.palette.text.primary : theme.palette.primary.main,
      fontWeight: props.main ? theme.typography.fontWeightMedium : theme.typography.fontWeightLight
    },
    '&:focus > $content, &$selected ': {
      backgroundColor: 'transparent',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  }),
  content: props => ({
    backgroundColor: 'transparent',
    fontWeight: props.main ? theme.typography.fontWeightMedium : theme.typography.fontWeightLight,
    '$expanded > &': {
    },
  }),
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: props => ({
    fontWeight: 'inherit',
    color: 'inherit',
    '&:hover': {
      color: props.main ? theme.palette.text.primary : theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium
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
}))

const TreeMenuItem = ({ main, ...props}) => {
  const classes = useStyles({ main })

  return (
    <TreeItem
      classes={classes}
      {...props}
    />
  )
}

export default TreeMenuItem
