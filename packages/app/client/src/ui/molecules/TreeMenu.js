import React from 'react'
import TreeView from '@material-ui/lab/TreeView'
import { TreeMenuItem } from '../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
  selectedItem: {
    color: theme.palette.primary.main,
   
  }
}))

const mapItems = (items) => items.map(
  ({ subItems, id, ...item }) => (
    <TreeMenuItem nodeId={id} key={`${id}_treeMenuItem`} {...item}>
      {Array.isArray(subItems) && subItems.length > 0 && mapItems(subItems)}
    </TreeMenuItem>
  )
)

const expandAll = (items) => items.map(
  (item) => item.id
)

const TreeMenu = ({ expanded, menuItems, allExpanded, ...props }) => {
  const classes = useStyles()
  
  if (!Array.isArray(menuItems) || menuItems.length === 0) return null
  
  return (
    <TreeView
      className={classes.root}
      expanded={allExpanded ? expandAll(menuItems) : expanded}
      {...props}
    >
      {mapItems(menuItems)}
    </TreeView>
  );
}

export default TreeMenu
