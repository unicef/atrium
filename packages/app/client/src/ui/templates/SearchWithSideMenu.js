import React from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  firstGap: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    transition: 'all 0.3s ease'
  },
  secondGap: props => ({
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: props.isSideMenuVisible ? '5%' :'15%',
    transition: 'all 0.3s ease',
    [theme.breakpoints.down("md")]: {
      flexBasis: '0%',
    }
  }),
  wrapper: {
    display: 'flex',
    flex: 1,
    position: 'relative'
  },
  sideMenuWrapper: {
    padding: 20,
    transition: 'all 0.2s ease',
    width: 340,
    opacity: 0,
    overflowX: 'hidden',
    overflowY: 'scroll',
    transform: 'translate(-340px, 0)',
    marginBottom: 50,
    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: 99,
      bottom: 0,
      top: 0,
      borderRight: `1px solid ${theme.colors['light-gray-two']}`,
      '& > div': {
        overflowY: 'scroll',
        marginBottom: 10
      }
    }
  },
  sideMenuVisible: {
    opacity: 1,
    transform: 'translate(0, 0)',
    [theme.breakpoints.down("md")]: {
      paddingTop: 0,
    }
  },
}))

const SearchWithSideMenu = ({ SideMenuComponent, SearchBarComponent, ListComponent }) => {
  const [isSideMenuVisible, toggleSideMenu] = React.useState(false)
  const classes = useStyles({ isSideMenuVisible })
  
  return (
    <div>
      <SearchBarComponent isSideMenuVisible={isSideMenuVisible} toggleSideMenu={() => toggleSideMenu(prevVal => !prevVal)} />

      <div className={classes.wrapper}>

        <div className={classnames(classes.sideMenuWrapper, { [classes.sideMenuVisible]: isSideMenuVisible })}>
          <SideMenuComponent />
        </div>
        
        <div className={classes.firstGap} />

        <ListComponent />

        <div className={classes.secondGap} />

      </div>
    </div>
  )
}

export default SearchWithSideMenu
