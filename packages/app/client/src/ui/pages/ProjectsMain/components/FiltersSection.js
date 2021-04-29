import React from 'react'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Collapse from '@material-ui/core/Collapse'
import FilterRow from './FilterRow'
import { Divider, TextButton } from '../../../atoms'
import { useProjectsMainActions } from '../../../hooks'

const FiltersSection = ({ options, title, dataKey  }) => {
  const { addFilter, removeFilter } = useProjectsMainActions()
  const [isShowingMore, toggleMoreOptions] = React.useState(false)
  const [minOptionsGroupHeigh, setOptionsGroupMinHeight] = React.useState(0)
  const shouldHaveShowMoreButton = options.length > 4

  React.useEffect(() =>  {
    const checkboxHeight = document.getElementById(`${dataKey}FilterOption_0`).clientHeight

    setOptionsGroupMinHeight(4 * checkboxHeight)
  }, [])

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <Typography variant="subtitle1">{title}</Typography>
        
        <Collapse in={isShowingMore} collapsedHeight={minOptionsGroupHeigh}>
          <div>
            {options.map((option, index) => (
              <FilterRow
                option={option}
                addFilter={addFilter}
                removeFilter={removeFilter}
                index={index}
                dataKey={dataKey}
              />
            ))}
          </div>
        </Collapse>
        
       {shouldHaveShowMoreButton &&
          <TextButton
            endIcon={isShowingMore ? <RemoveIcon /> : <AddIcon />}
            textContent={isShowingMore ? 'Show less' : 'Show more'}
            size="outlined"
            color="primary"
            // TODO: IMPORVE BUTTONS
            style={{ margin: 0, padding: 5 }}
            onClick={() => toggleMoreOptions(prev => !prev)}
          />
        }
      </div>

      <Divider />
    </>
  )
}

export default FiltersSection
