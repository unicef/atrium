const SECTIONS_NAME = Object.freeze({
  REQUIRED_INFORMATIONS: 'Required information',
  PROJECT: 'Project',
  CONTACT_PERSON: 'Contact Person',
  EXTRA_INFORMATION: 'Extra information',
  TEAM_DETAILS: 'Team details',
  STORY: 'Story',
  LINKS: 'Links',
  DOCUMENTS: 'Documents'
})

export const SECTIONS_ID = Object.freeze({
  [SECTIONS_NAME.PROJECT]: 'projectDetails',
  [SECTIONS_NAME.CONTACT_PERSON]: 'contactPerson',
  [SECTIONS_NAME.STORY]: 'projectStories',
  [SECTIONS_NAME.TEAM_DETAILS]: 'teamDetails',
  [SECTIONS_NAME.LINKS]: 'projectLinks',
  [SECTIONS_NAME.DOCUMENTS]: 'projectDocuments'
})

export default SECTIONS_NAME
