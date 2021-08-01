import React from 'react'

const ERRORS = {
  GET_PROJECT:
    'Oops, failed to get project details... Please refresh and if the issue persists email blockchain@uninnovation.network',
  GET_ATTACHMENT:
    'Oops, failed to get project attachment... Please refresh and if the issue persists email blockchain@uninnovation.network'
}

const getAttachmentName = attachment => {
  if (attachment) {
    const attachbits = attachment.split('/')
    return attachbits[attachbits.length - 1]
  }
}
export const useFetchProjectWithCache = ({
  projectId,
  getProject,
  getAttachment,
  cachedProject,
  setError
}) => {
  const [project, setProject] = React.useState(cachedProject)

  //Fetch the project if no project in cache
  React.useEffect(() => {
    let unmounting = false
    const fetchProject = async () => {
      try {
        if (projectId && !cachedProject && !unmounting) {
          const fetchedProject = await getProject(projectId)
          setProject(fetchedProject.data.project[0])
        }
      } catch (err) {
        setError(ERRORS.GET_PROJECT)
      }
    }
    fetchProject()
    return () => {
      unmounting = true
    }
  }, [projectId, getProject, cachedProject, setError])

  //Update state project if cached project changes (updates to likes/comments)
  React.useEffect(() => {
    if (cachedProject) {
      setProject(cachedProject)
    }
  }, [cachedProject])

  //Get attachment of the project if not null
  const [attachmentSource, setAttachmentSource] = React.useState(null)
  React.useEffect(() => {
    let unmounting = false
    const fetchProjectAttachment = async () => {
      if (project && project.attachment && !unmounting) {

        try {
          const response = await getAttachment(project.attachment)
          const f = new File(
            [response.data],
            getAttachmentName(project.attachment)
          )
          setAttachmentSource(URL.createObjectURL(f))
        } catch (err) {

        }
      }
    }
    fetchProjectAttachment()
    return () => {
      unmounting = true
    }
  }, [project, setAttachmentSource, setError])

  return { project, attachmentSource }
}
