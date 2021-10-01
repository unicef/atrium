import { PROJECT_DETAILS_SELECT_OPTIONS } from '../../../../unin-constants'
export default {
  requiredInformation: [
    {
      name: 'name',
      id: 'name',
      label: 'Project Name',
      htmlFor: 'name',
      type: 'text'
    },
    {
      name: 'details',
      id: 'details',
      label: 'Project Discription',
      htmlFor: 'details',
      multiline: true,
      rows: 6,
      type: 'textArea',
      characterLimit: 250
    }
  ],
  project: [
    {
      type: 'radioGroup',
      name: 'blockchainType',
      label: 'Blockchain type',
      ariaLabel: 'blockchain-type',
      id:'blockchainType',
      inputs: [
        {
          value: 'public',
          label: 'Public',
          name: 'blockchainType',
          id: 'publicInput'
        },
        {
          value: 'permissioned',
          label: 'Permissioned',
          name: 'blockchainType',
          id: 'permissionedInput'
        }
      ]
    },
    {
      type: 'select',
      name: 'blockchainName',
      id: 'blockchainName',
      label: 'Blockchain name',
      displayEmpty: true,
      options: PROJECT_DETAILS_SELECT_OPTIONS.BLOCKCHAIN_NAME,
      emptyOptionLabel: 'Choose'
    },
    {
      type: 'checkbox',
      name: 'freeForAll',
      id: 'freeForAll',
      label: 'This project doesn’t contain any sensitive data and can be viewed by non-UN users'
    },
    {
      type: 'select',
      name: 'stageOfProject',
      id: 'stageOfProject',
      label: 'Stage of project',
      displayEmpty: true,
      options: PROJECT_DETAILS_SELECT_OPTIONS.STAGE_OF_PROJECT,
      emptyOptionLabel: 'Choose'
    },
    {
      type: 'select',
      name: 'innovationCategory',
      id: 'innovationCategory',
      label: 'Innovation category',
      displayEmpty: true,
      options: PROJECT_DETAILS_SELECT_OPTIONS.INNOVATION_CATEGORY,
      emptyOptionLabel: 'Choose'
    },
    {
      type: 'select',
      name: 'thematicArea',
      id: 'thematicArea',
      label: 'Thematic area',
      displayEmpty: true,
      options: PROJECT_DETAILS_SELECT_OPTIONS.THEMATIC_AREA,
      emptyOptionLabel: 'Choose'
    },
    {
      type: 'select',
      name: 'country',
      id: 'country',
      label: 'Country',
      displayEmpty: true,
      options: PROJECT_DETAILS_SELECT_OPTIONS.COUNTRY,
      emptyOptionLabel: 'Choose'
    },
    {
      type: 'select',
      name: 'organization',
      id: 'organization',
      label: 'Organization',
      displayEmpty: true,
      options: PROJECT_DETAILS_SELECT_OPTIONS.ORGANIZATION,
      emptyOptionLabel: 'Choose'
    },
  ],
  contactPerson: [
    {
      type: 'checkbox',
      name: 'iamTheContact',
      id: 'iamTheContact',
      label: 'I’m the contact person for this project'
    },
    {
      name: 'contactPersonEmail',
      id: 'contactPersonEmail',
      label: 'Contact person’s e-mail',
      htmlFor: 'contactPersonEmail',
      type: 'text'
    },
    {
      name: 'contactPersonFullName',
      id: 'contactPersonFullName',
      label: 'Contact person’s full name',
      htmlFor: 'contactPersonFullName',
      type: 'text'
    },
  ],
  extraInformation: [
    {
      name: 'story',
      id: 'story',
      addLabel: 'Add Story',
      editinglabel: 'Talk about the project',
      htmlFor: 'story',
    },
    {
      name: 'challenges',
      id: 'challenges',
      addLabel: 'Add Challenges',
      editinglabel: 'Talk about the challenges',
      htmlFor: 'challenges',
    },
    {
      name: 'benefits',
      id: 'benefits',
      addLabel: 'Add Benefits',
      editinglabel: 'Talk about the benefits',
      htmlFor: 'benefits',
    },
    {
      name: 'needs',
      id: 'needs',
      addLabel: 'Add Needs',
      editinglabel: 'Talk about the needs',
      htmlFor: 'needs',
    }
  ],
  links: [
    {
      name: 'linkToRepository',
      id: 'linkToRepository',
      label: 'Repository link',
      htmlFor: 'linkToRepository',
      type: 'text',
      placeholder: 'http://atrium.com/project1234567'
    },
    {
      name: 'websiteLink',
      id: 'websiteLink',
      label: 'Project website link',
      htmlFor: 'websiteLink',
      type: 'text',
      placeholder: 'Http:// ....'
    }
  ]
}
