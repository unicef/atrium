import React from 'react'
import { Checkbox } from '../atoms'
import TextWithLinks from './TextWithLinks'

const CheckboxWithLinks = ({ links, label, ...props}) => (
  <Checkbox
    {...props}
    label={
      <TextWithLinks links={links}>
        {label}
      </TextWithLinks>
    }
  />
)

export default CheckboxWithLinks
