import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/styles/makeStyles'
import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import { ReactComponent as CancelIcon } from '../../icons/cancel.svg'
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start'
  },
  inputSearchRoot: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#ececec',
    height: 40
  },
  adornment: {
    margin: 12,
    fill: theme.colors['warm-gray']
  },
  inputSearch: {
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.8px',
    fontFamily: theme.typography.fontFamily,
    transition: theme.transitions.create('width'),
    width: '100%',
    paddingRight: 10,
    '&::placeholder': {
      opacity: 1,
      color: theme.colors['warm-gray']
    }
  }
}))

const SearchBar = ({ value, onChange, placeholder, clearFilter }) => {
  const classes = useStyles()

  return (
    <InputBase
      startAdornment={
        <InputAdornment className={classes.adornment} position="start">
          <SearchIcon />
        </InputAdornment>
      }
      endAdornment={
        value && clearFilter ? (
          <InputAdornment position="end">
            <IconButton onClick={clearFilter}>
              <CancelIcon />
            </IconButton>
          </InputAdornment>
        ) : null
      }
      placeholder={placeholder}
      classes={{
        root: classes.inputSearchRoot,
        input: classes.inputSearch
      }}
      inputProps={{
        id: 'search',
        'aria-label': 'Search projects'
      }}
      value={value}
      onChange={onChange}
    />
  )
}

SearchBar.propTypes = {
  value: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  clearFilter: PropTypes.func
}

export default SearchBar
