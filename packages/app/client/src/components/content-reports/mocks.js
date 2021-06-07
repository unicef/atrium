const projects = [
  {
    tags: [],
    comments: [],
    likes: [],
    documents: [],
    videos: [],
    photos: [],
    team: [],
    updates: [],
    _id: '60ba21b7ad9037005e0d2a5a',
    name: 'project',
    details: 'project',
    owner: {
      _id: '60b0c4a65bb6dd00386c9421',
      email: 'un-innovation@unicef.org',
      name: 'Admin Admin',
      company: '',
      id: '60ba1f6652f5ee0039032ba6'
    },
    projectOwner: 'UN-Innovation',
    projectOwnerEmail: 'un-innovation@unicef.org',
    attachment: {
      url:
        'http://localhost:5000/api/projects/attachment/1622811061260-image.jpeg',
      name: '1622811061260-image.jpeg',
      extension: 'image/png',
      size: 105002
    },
    blockchainName: 'bitcoin',
    blockchainType: 'public',
    freeForAll: true,
    published: true,
    stageOfProject: 'Ideation',
    innovationCategory: 'Food and Water',
    thematicArea: 'Sustainable Cities and Communities',
    contactPersonFullName: 'Admin Admin',
    contactPersonEmail: 'un-innovation@unicef.org',
    contactPerson: {
      _id: '60b0c4a65bb6dd00386c9421',
      email: 'un-innovation@unicef.org',
      name: 'Admin Admin',
      company: '',
      id: '60ba1f6652f5ee0039032ba6'
    },
    createdAt: '2021-05-28T12:08:50.128Z',
    __v: 0,
    id: '60ba21b7ad9037005e0d2a5a'
  },
  {
    tags: [],
    comments: [],
    likes: [],
    documents: [],
    videos: [],
    photos: [],
    team: [],
    updates: [],
    _id: '60ba21d4ad9037005e0d2a5e',
    name: 'project2',
    details: 'project2',
    owner: {
      _id: '60b0c4a65bb6dd00386c9421',
      email: 'un-innovation@unicef.org',
      name: 'Admin Admin',
      company: '',
      id: '60ba1f6652f5ee0039032ba6'
    },
    projectOwner: 'Admin Admin',
    projectOwnerEmail: 'un-innovation@unicef.org',
    attachment: {
      url:
        'http://localhost:5000/api/projects/attachment/1622811061260-image.jpeg',
      name: '1622811061260-image.jpeg',
      extension: 'image/png',
      size: 105002
    },
    blockchainName: 'ethereum',
    blockchainType: 'public',
    freeForAll: true,
    published: true,
    stageOfProject: 'Ideation',
    innovationCategory: 'Food and Water',
    thematicArea: 'Gender Equality',
    contactPersonFullName: 'Admin Admin',
    contactPersonEmail: 'un-innovation@unicef.org',
    contactPerson: {
      _id: '60b0c4a65bb6dd00386c9421',
      email: 'un-innovation@unicef.org',
      name: 'Admin Admin',
      company: '',
      id: '60ba1f6652f5ee0039032ba6'
    },
    createdAt: '2021-05-28T12:08:50.128Z',
    __v: 0,
    id: '60ba21d4ad9037005e0d2a5e'
  }
]

const comments = [
  {
    "mentions": [],
    "replies": [],
    "likes": [],
    "_id": "60ba21e5ad9037005e0d2a60",
    "content": "comment",
    "user": {
      "_id": "60ba1f6652f5ee0039032ba6",
      "email": "un-innovation@unicef.org",
      "name": "Admin Admin",
      "company": "",
      "id": "60ba1f6652f5ee0039032ba6"
    },
    "date": "2021-06-04T12:51:49.684+00:00",
    "__v": 1,
    "id": "60ba21e5ad9037005e0d2a60"
  },
  {
    "mentions": [],
    "replies": [],
    "likes": [],
    "_id": "60ba21f4ad9037005e0d2a64",
    "content": "comment2",
    "user": {
      "_id": "60ba1f6652f5ee0039032ba6",
      "email": "un-innovation@unicef.org",
      "name": "Admin Admin",
      "company": "",
      "id": "60ba1f6652f5ee0039032ba6"
    },
    "date": "2021-06-04T12:51:49.684+00:00",
    "__v": 0,
    "id": "60ba21f4ad9037005e0d2a64"
  }
]

const updates = [
  {
    id: '60ba2200ad9037005e0d2a66',
    date: '2021-06-04T12:52:16.096+00:00',
    title: 'update',
    text: 'update',
    owner: '60ba1f6652f5ee0039032ba6'
  },
  {
    id: '60ba2200ad9037005e0d2a66',
    date: '2021-06-04T12:52:24.339+00:00',
    title: 'update2',
    text: 'update2',
    owner: '60ba1f6652f5ee0039032ba6'
  },
]

export { projects, comments, updates }
