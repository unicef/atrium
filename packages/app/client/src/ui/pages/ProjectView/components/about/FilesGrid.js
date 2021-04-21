import React from 'react'
import Grid from '@material-ui/core/Grid'
import FilesCard from './FilesCard'

const FilesGrid = ({ mediaType, files, handleClick }) => (
  <Grid container spacing={3} item xs={12}>
    {files.map((file) => (
      // TODO: CHANGE THE SRC, NAME, AND EXTENSION TO THE PROPER ONE WHEN THE API IS READY
      <Grid key={file} item xs={6} md={4}>
        <FilesCard
          onClick={handleClick && handleClick({ src: file, name: file })}
          extension=".extension" 
          media={mediaType}
          src={file}
          name={file}
        />
      </Grid>
    ))}
  </Grid>
)

export default FilesGrid
