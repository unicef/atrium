import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import AddedFile from './AddedFile'
import { Button } from '../../../../ui'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  inputLabel: {
    color: 'black',
    marginTop: 40,
    marginBottom: 15,
    fontWeight: 500
  },
  addFileButton: {
    margin: '5px 0'
  },
  fileInput: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  fileInputLabel: {
    cursor: 'pointer'
  },
}))

const DocumentUpload = ({ title, htmlFor, id, name, handleChange, prevValues, ...props }) => {
  const classes = useStyles()
  const inputRef = React.useRef(null)
  const [files, setFiles] = React.useState(prevValues)
  const [newFile, setNewFile] = React.useState(null)
  const [buttonDisabled, setDisabled] = React.useState(false)
  
  const handleClick = (e) => {
    e.preventDefault()
    inputRef.current && inputRef.current.click()
  }

  const onDelete = ({ url }) => {
    props.deleteHandler(url, props.type)
    setFiles(prevValues => prevValues.filter(file => file.url !== url))
    setDisabled(false)
  }

  return (
    <>
      <InputLabel
        className={classes.inputLabel}
        shrink
        htmlFor={htmlFor}
      >
       {title}
      </InputLabel>

      <Button
        className={classes.addFileButton}
        color="primary"
        onClick={handleClick}
        disabled={buttonDisabled}
      >

        <label
          htmlFor={htmlFor}
          className={classes.fileInputLabel}
          aria-label={'ATTACH FILE'}
          title={'ATTACH FILE'}
        >
          + Add {name} file
        </label>

      </Button>

      <input
        ref={inputRef}
        type="file"
        id={id}
        name={name}
        className={classes.fileInput}
        onChange={e => {
          handleChange(name, e.target.files[0])
          setNewFile(e.target.files[0])
          setDisabled(true)
        }}
      />
      {
        Boolean(newFile) &&
        <AddedFile
          name={newFile.name}
          size={newFile.size}
          onDelete={() => {
            setDisabled(false)
            setNewFile(null)
          }}
          newFile
          file={newFile}
        />
      }
      {Array.isArray(files) &&
        files.map(file => (
          <AddedFile
            name={file.name}
            size={file.size}
            onDelete={onDelete}
            file={file}
          />
        ))
      }
    </>
  )
}

export default DocumentUpload
