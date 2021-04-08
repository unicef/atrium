import React from 'react'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import classnames from 'classnames'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { CheckboxField, Divider, Title, TextButton } from '../../../atoms'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'transparent',
    padding: 0,
    transition: 'all 0.4s ease',
    width: 0,
    opacity: 0,
    overflow: 'hidden',
  },
  visible: {
    width: 340,
    padding: 20,
    opacity: 1
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
  }
}))

const filters = new Array(3).fill(
  {
    label: 'Blockchain'
  }
)
const Filters = ({ visible }) => {
  const classes = useStyles({ visible })

  return (
    // <Slide direction="right" in={visible} mountOnEnter unmountOnExit >

    <div className={classnames(classes.container, { [classes.visible]: visible })}>

        <div style={{ display: 'flex', justifyContent:"space-between", alignItems:"center"}}>
          <Typography className={classes.title}>Filters</Typography>

          {/* <TextButton
            endIcon={<CloseIcon />}
            textContent="Clear Filters"
            size="outlined"
            style={{ margin: 0, padding: 5 }}
          /> */}
        </div>

        <div style={{ marginTop: 20 }}>
          <Typography variant="subtitle1">Blockchain</Typography>
          
          {filters.map((filter, index) => (
            <Grid id={`${filter.label}${index}`} item xs={12}>
              <CheckboxField
                  label={filter.label}
              />
            </Grid>
          ))}
          
          <TextButton
            endIcon={<AddIcon />}
            textContent="Show more"
            size="outlined"
            color="primary"
            style={{ margin: 0, padding: 5 }}
          />
        </div>

        <Divider />


        <Grid xs={12} item style={{ marginTop: 20 }}>
          <Typography variant="subtitle1">Blockchain</Typography>
          
          {filters.map((filter, index) => (
            <Grid id={`${filter.label}${index}`} item xs={12}>
              <CheckboxField
                  label={filter.label}
              />
            </Grid>
          ))}
          
          <TextButton
            endIcon={<AddIcon />}
            textContent="Show more"
            size="outlined"
            color="primary"
            style={{ margin: 0, padding: 5 }}
          />
        </Grid>

        <Divider />


        <Grid xs={12} item style={{ marginTop: 20 }}>
          <Typography variant="subtitle1">Blockchain</Typography>
          
          {filters.map((filter, index) => (
            <Grid id={`${filter.label}${index}`} item xs={12}>
              <CheckboxField
                  label={filter.label}
              />
            </Grid>
          ))}
          
          <TextButton
            endIcon={<AddIcon />}
            textContent="Show more"
            size="outlined"
            color="primary"
            style={{ margin: 0, padding: 5 }}
          />
        </Grid>

        <Divider />

        <Grid xs={12} item style={{ marginTop: 20 }}>
          <Typography variant="subtitle1">Blockchain</Typography>
          
          {filters.map((filter, index) => (
            <Grid id={`${filter.label}${index}`} item xs={12}>
              <CheckboxField
                  label={filter.label}
              />
            </Grid>
          ))}
          
          <TextButton
            endIcon={<AddIcon />}
            textContent="Show more"
            size="outlined"
            color="primary"
            style={{ margin: 0, padding: 5 }}
          />
        </Grid>

        <Divider />
      </div>
    // </Slide>
  )
}

export default Filters
