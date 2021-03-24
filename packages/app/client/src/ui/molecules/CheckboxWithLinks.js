import React from 'react'
import { CheckboxField } from '../atoms'
import TextWithLinks from './TextWithLinks'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  formLabelRoot: props => ({
    alignItems: props.contentPlacemet
  }),
  checkboxRoot: props => {
    const paddingByPlacement = {}

    if (props.contentPlacemet === 'flex-start') {
      paddingByPlacement.paddingTop = 3
    }

    return {
      ...paddingByPlacement
    }
  }
})

const CheckboxWithLinks = ({ links, label, contentPlacemet, ...props}) => {
  const classes = useStyles({ contentPlacemet })

  return (
    <CheckboxField
      formLabelProps={{
        className: classes.formLabelRoot
      }}
      classes={{ root: classes.checkboxRoot }}
      {...props}
      label={
        <TextWithLinks links={links}>
          {label}
        </TextWithLinks>
      }
    />
  )
}

CheckboxWithLinks.propTypes = {
  contentPlacemet: PropTypes.string
}

CheckboxWithLinks.defaultProps = {
  contentPlacemet: 'center'
}

export default CheckboxWithLinks
