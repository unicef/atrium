import React from 'react';
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { HorizontalCardWithMenu } from '../../../../organisms'
import { TextButton } from '../../../../atoms';

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles((theme) => ({
  root: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px solid ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))( ({children, ...props }) => <Box {...props}>
  <TransitionComponent in={props.in}>
    {children}
  </TransitionComponent>
</Box>);

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function CustomizedTreeView() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)

  return (
    <Box className={classes.root}>
      <Box width="100%">

        <HorizontalCardWithMenu  menuItems={[]} userIsTheOwner={true}>
          <Avatar style={{ width: 30, height: 30 }} />
          <TextButton
            textContent="replies"
            onClick={() => setOpen(op => !op)}
          />
        </HorizontalCardWithMenu>
        <StyledTreeItem in={open}>
          <HorizontalCardWithMenu  menuItems={[]} userIsTheOwner={true}>
            <Avatar style={{ width: 30, height: 30 }} />
            <TextButton
              textContent="replies"
              onClick={() => setOpen(op => !op)}
            />
          </HorizontalCardWithMenu>
        </StyledTreeItem>
      </Box>

      <HorizontalCardWithMenu  menuItems={[]} userIsTheOwner={true}>
        <Avatar style={{ width: 30, height: 30 }} />
        <TextButton
          textContent="replies"
          //onClick={() => setOpen(op => !op)}
        />
      </HorizontalCardWithMenu>
    </Box>
  )
}
