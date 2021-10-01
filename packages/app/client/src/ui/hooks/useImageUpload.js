import React from 'react'

const useImageUpload = ({ maxUploadSize, onSizeExceded, setAttachment }) => {
  const [filePreview, setFilePreview] = React.useState()

  const handleUploading = e => {
    const nextFile = e.target.files[0]

    if (nextFile) {
      if (nextFile.size > maxUploadSize) {
        onSizeExceded()
        e.target.value = null
        return
      }
      setFilePreview({ src: URL.createObjectURL(nextFile), name: nextFile.name })
      setAttachment(nextFile)
    }
  }

  React.useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview)
      }
    }
  })

  return { handleUploading, filePreview, clearPreview: () => setFilePreview(null) }
}

export default useImageUpload
