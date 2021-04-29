import React from 'react'
import Grid from '@material-ui/core/Grid'
import { CheckboxField } from '../../../atoms'
import { useSelector } from 'react-redux'
import { getProjectsSearchFilter } from '../../../../selectors'

const FilterRow = ({ option, addFilter, removeFilter, index, dataKey }) => {
  const currentSection = useSelector(state => getProjectsSearchFilter(state, dataKey))

  const checked = Array.isArray(currentSection) && currentSection.indexOf(option) >= 0

  return (
    <Grid id={`${dataKey}FilterOption_${index}`} key={`${dataKey}FilterOption_${index}`} item xs={12}>
      <CheckboxField
        label={option}
        value={checked}
        onChange={(e) => {
          if (e.nativeEvent.target.checked) {
            addFilter({ option, filterName: dataKey })
          } else {
            removeFilter({ option, filterName: dataKey })
          }
        }}
      />
    </Grid>
  )
}

export default FilterRow
