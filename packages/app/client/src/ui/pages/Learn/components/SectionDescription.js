import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TitleAndSubtitle } from '../../../molecules'

const SectionDescription = (props) => (
  <Grid item container xs={12}>
    <TitleAndSubtitle
      title={props.title}
      subtitle={props.subtitle}
      titleProps={{ align: 'left', alignMobbile: 'left' }}
      subtitleProps={{ align: 'left', alignMobbile: 'left' }}
    />

    <Grid item xs={12}>
      <Typography variant="subtitle2">
        {props.text}
      </Typography>
    </Grid>

    {props.children}
  </Grid>
)

SectionDescription.defaultProps = {
  subtitle: ""
}

export default SectionDescription
