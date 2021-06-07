import React from 'react'
import Grid from '@material-ui/core/Grid'
import FilesCard from './FilesCard'

const FilesGrid = ({ mediaType, files, handleClick }) => (
  <Grid container spacing={3} item xs={12}>
    {files.map((file) => (
      <Grid key={file.name} item xs={6} md={4}>
        <FilesCard
          onClick={handleClick && handleClick({ src: file.url, name: file.name })}
          extension={file.extension}
          media={mediaType}
          src={file.url}
          name={file.name}
          size={file.size}
        />
      </Grid>
    ))}
  </Grid>
)

export default FilesGrid
