import React from 'react'
import Box from '@material-ui/core/Box'

function Panel({value, index, children}) {
  return <div>{value === index && <Box>{children}</Box>}</div>
}

export default Panel
