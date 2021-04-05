import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Title, TextButton, SearchField } from '../../../atoms'
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined'

const useStyles = makeStyles(theme =>
  ({
    filtersButton: {
      padding: 15,
      marginTop: 0,
      marginRight: 20,
      '& > span > span:not(& > svg)': {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 5
      }
    },
    textField: {
      width: '100%',
      maxWidth: 770
    },
    container: {
      borderBottom: `2px solid ${theme.colors['light-gray-three']}`,
      paddingTop: 65,
      paddingBottom: 35
    }
  })
)

const SearchBar = () => {
  const classes = useStyles()

  const onSearch = (value) => {
    console.log(value)
  }

  return (
  <Grid justify="center" className={classes.container} container item xs={12}> 
    <Title mb={25}>All projects</Title>
    <Grid justify="center" item container xs={12}>
      <TextButton
        className={classes.filtersButton}
        startIcon={<TuneOutlinedIcon />}
        textContent="Filters"
        size="outlined"
      />
      
      <SearchField onChange={onSearch} placeholder="Search in projects" fullWidth={false} className={classes.textField} />
    </Grid>
  </Grid>
  )
}

export default SearchBar
