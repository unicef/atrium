import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function ControlledTreeView() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <TreeView
      className={classes.root}
      
      expanded={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
      selected={['1']}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <TreeItem nodeId="1" label="About">
        <TreeItem nodeId="2" label="Story" />
        <TreeItem nodeId="3" label="Challenges" />
        <TreeItem nodeId="4" label="Benefits" />
        <TreeItem nodeId="5" label="Needs" />
      </TreeItem>
      <TreeItem nodeId="7" label="Additional info"/>
      <TreeItem nodeId="8" label="Files">
        <TreeItem nodeId="9" label="Video">
        </TreeItem>
          <TreeItem nodeId="10" label="Images" />
      </TreeItem>
    </TreeView>
  );
}
