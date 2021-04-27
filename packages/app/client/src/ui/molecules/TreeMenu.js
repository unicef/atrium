import React from 'react'
import TreeView from '@material-ui/lab/TreeView'
import { TreeMenuItem } from '../atoms'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  }
}))

const mapItems = (items, colors) => items.map(
  ({ subItems, id, ...item }) => (
    <TreeMenuItem colors={colors} nodeId={id} key={`${id}_treeMenuItem`} {...item}>
      {Array.isArray(subItems) && subItems.length > 0 && mapItems(subItems)}
    </TreeMenuItem>
  )
)

const expandAll = (items) => items.map(
  (item) => item.id
)

const TreeMenu = ({ colors, expanded, menuItems, allExpanded, ...props }) => {
  const classes = useStyles(colors)
  
  if (!Array.isArray(menuItems) || menuItems.length === 0) return null 
  return (
    <TreeView
      className={classes.root}
      {...{ expanded: allExpanded ? expandAll(menuItems) : expanded }}
      {...props}
    >
      {mapItems(menuItems, colors)}
    </TreeView>
  );
}

export default TreeMenu
