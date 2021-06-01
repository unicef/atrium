import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import UpdateCard from './UpdateCard'
import { makeStyles } from '@material-ui/core/styles'
import { EmptyResults } from '../../../../molecules'

const useStyles = makeStyles(theme => ({
  headerText: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '180%',
    color: theme.colors['light-gray-two']
  },
  line: {
    borderColor: theme.colors['light-gray-two']
  }
}))

const UpdatesList = ({ selectedMonthId, handledUpdates }) => {
  const classes = useStyles()

  if (selectedMonthId === undefined) {
    return null
  }
  
  const [month, year] = selectedMonthId.split('_')
  const currentMonth = { year, month, data: handledUpdates[year] && handledUpdates[year][month] }

  return (
    <Grid container item xs={12}>
      <Box display="flex" flex={1} flexDirection="column" pl={5}>
        <Box display="flex" flex={1} mb="20px">
          <Grid container item xs={12}>
            <Typography className={classes.headerText}>{month && month.toLocaleUpperCase()} {year || ''}</Typography>
            <Box display="flex" flex={1} bgcolor="transparent" alignItems="center" pl={2}>
              <Box className={classes.line} borderTop={1} borderColor="light-gray-two" width="100%" />
            </Box>
          </Grid>
        </Box>
        
       {currentMonth.data &&
          <Grid container spacing={1} item xs={12}>
            {currentMonth.data.map((item) => (
              <UpdateCard {...item} year={year} month={month} />
            ))}
          </Grid>
        }
      </Box>
    </Grid>
  )
  
}

export default UpdatesList
