import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CheckboxField } from '../../../atoms'
import { useSelector } from 'react-redux'
import { getProjectsSearchFilter } from '../../../../selectors'

const FilterRow = ({ sectionTitle, option, addFilter, removeFilter, index }) => {
  const currentSection = useSelector(state => getProjectsSearchFilter(state, sectionTitle))

  const checked = Array.isArray(currentSection) && currentSection.indexOf(option) >= 0

  return (
    <Grid id={`${sectionTitle}FilterOption_${index}`} key={`${sectionTitle}FilterOption_${index}`} item xs={12}>
      <CheckboxField
        label={option}
        value={checked}
        onChange={(e) => {
          if (e.nativeEvent.target.checked) {
            addFilter({ option, filterName: sectionTitle })
          } else {
            removeFilter({ option, filterName: sectionTitle })
          }
        }}
      />
    </Grid>
  )
}

export default FilterRow
