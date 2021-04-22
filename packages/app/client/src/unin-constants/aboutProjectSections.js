module.exports = [
  {
    label: 'About',
    id: 'aboutProject',
    main: true,
    subItems: [
      {
        label: 'Story',
        id: 'aboutProjectStory',
        dataKey: 'story'
      },
      {
        label: 'Challenges',
        id: 'aboutProjectChallenges',
        dataKey: 'challenges'
      },
      {
        label: 'Benefits',
        id: 'aboutProjectBenefits',
        dataKey: 'benefits'
      },
      {
        label: 'Needs',
        id: 'aboutProjectNeeds',
        dataKey: 'needs'
      }
    ]
  },
  {
    label: 'Additional info',
    id: 'projectAdditionalInfo',
    main: true,
  },
  {
    label: 'Files',
    id: 'projectFiles',
    main: true,
    subItems: [
      {
        label: 'Video',
        id: 'projectFilesVideo',
        dataKey: 'videos',
        mediaType: 'video'
      },
      {
        label: 'Images',
        id: 'projectFilesImages',
        dataKey: 'photos',
        mediaType: 'image'
      },
      {
        label: 'Documents',
        id: 'projectFilesDocuments',
        dataKey: 'documents',
        mediaType: 'document'
      }
    ]
  }
]