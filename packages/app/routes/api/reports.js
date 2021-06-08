const express = require('express')
const router = express.Router()
const excel = require('excel4node')
const User = require('../../models/User')
const Project = require('../../models/Project')
const Comment = require('../../models/Comment')
const Activity = require('../../models/Activity')
const keccak256 = require('keccak256')
const passport = require('passport')
const log = require('../../config/log')
const { sendError } = require('../../lib/requestUtils')
const Update = require('../../models/Update')

const downloadKeys = {}

router.post('/login', async (req, res) => {
  const { password } = req.body
  const reportsPassword = keccak256(process.env.ADMIN_PASSWORD).toString('hex')
  const key = Math.random() * 1e17

  downloadKeys[key] = true

  if (reportsPassword === password) {
    res.json({ key: key })
  } else {
    res.send(false)
  }
})

router.get('/download/:key', async (req, res) => {
  const { key } = req.params

  if (downloadKeys[key]) {
    delete downloadKeys[key]

    const reportName = `AtriumReport.xlsx`

    await createSpreadsheet(reportName, res)
  } else {
    res.send(
      'The supplied download key is invalid. Try again, or contact an admin and file a bug report.'
    )
  }
})

async function createSpreadsheet(filename, res) {
  const workbook = new excel.Workbook()

  const userData = await getUserData()
  const userTab = workbook.addWorksheet('Users')
  createSpreadsheetTab(userTab, userData)

  const projectData = await getProjectData()
  const projectTab = workbook.addWorksheet('Projects')
  createSpreadsheetTab(projectTab, projectData)

  const commentData = await getCommentData()
  const commentTab = workbook.addWorksheet('Comments')
  createSpreadsheetTab(commentTab, commentData)

  const discussionData = await getDiscussionData()
  const discussionTab = workbook.addWorksheet('Discussions')
  createSpreadsheetTab(discussionTab, discussionData)

  const activityData = await getActivityData()
  const activityTab = workbook.addWorksheet('Activities')
  createSpreadsheetTab(activityTab, activityData)

  workbook.write(`${filename}`, (err, stats) => {
    if (err) {
      return res.send(
        'The report failed to save. Try again, or contact an admin and file a bug report.'
      )
    } else {
      return res.download(`${filename}`)
    }
  })
}

function createSpreadsheetTab(tab, data) {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
      tab.cell(row + 1, col + 1).string(data[row][col].toString())
    }
  }
  return tab
}

async function getUserData() {
  let userData = await User.find({})
  userData = userData.map(row => {
    return [
      row._id || '',
      row.name || '',
      row.email || '',
      row.role || '',
      row.company || '',
      row.address || '',
      row.date || '',
      row.learnPageFlag || '',
      row.explorePageFlag || '',
      row.engagePageFlag || '',
      row.emailVerified || ''
    ]
  })

  userData.unshift([
    'ID',
    'Name',
    'Email',
    'Role',
    'Company',
    'Address',
    'Date',
    'Learn Page Badge',
    'Explore Page Badge',
    'Engage Page Badge',
    'Email Verified'
  ])

  return userData
}
async function getProjectData() {
  let projectData = await Project.find({})

  projectData = projectData.map(row => {
    return [
      row.name || '',
      row.details || '',
      row.owner || '',
      row.projectOwner || '',
      row.projectOwnerEmail || '',
      row.email || '',
      row.tags || '',
      row.linkToRepository || '',
      row.websiteLink || '',
      row.createdAt || '',
      row.linkToDeployedApp || '',
      row.comments || '',
      row.likes || '',
      row.attachment || ''
    ]
  })

  projectData.unshift([
    'Name',
    'Details',
    'Owner',
    'Project Owner',
    'Project Owner Email',
    'Email',
    'Tags',
    'Link To Repository',
    'Website Link',
    'Created',
    'Link To Deployed App',
    'Comments',
    'Likes',
    'Attachment'
  ])

  return projectData
}
async function getCommentData() {
  let commentData = await Comment.find({})

  commentData = commentData.map(row => {
    return [
      row.content || '',
      row.mentions || '',
      row.user || '',
      row.date || ''
    ]
  })

  commentData.unshift(['Content', 'Mentions', 'User', 'Date'])

  return commentData
}
async function getDiscussionData() {
  let discussionData = await Project.find({})

  discussionData = discussionData.map(row => {
    return [
      row.name || '',
      row.details || '',
      row.email || '',
      row.user || '',
      row.createdAt || '',
      row.comments || '',
      row.likes || '',
      row.type || '',
      row.createdAt || ''
    ]
  })

  discussionData.unshift([
    'Name',
    'Details',
    'Email',
    'User',
    'CreatedAt',
    'Comments',
    'Likes',
    'Type',
    'Created'
  ])

  return discussionData
}
async function getActivityData() {
  let activityData = await Activity.find({})

  activityData = activityData.map(row => {
    return [row.user || '', row.typeOfActivity || '', row.createdAt || '']
  })

  activityData.unshift(['User', 'Activity', 'Created'])

  return activityData
}

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info(
      {
        requestId: req.id,
        user: req.user.id,
        project: req.params.id
      },
      'Getting reported content'
    )
    try {
      const allData = await Promise.all(getAllReports)
      const [projects, comments, updates] = allData
      return res.status(200).json({ projects, comments, updates })
    } catch (error) {
      log.info(
        {
          requestId: req.id,
          error: error
        },
        'Can not get reports from the database'
      )
      return sendError(res, 503, 'Error getting reports')
    }
  }
)

const getReportedProjects = () => Project.find({ reported: true })

const getReportedComments = async () => {
  const comments = await Comment.find({ reported: true })
  const projectsIdWithComment = await Promise.all(
    comments.map(async comment => {
      let project = await Project.find({ comments: comment._id })
      return {
        projectId: project[0]._id,
        ...comment._doc
      }
    })
  )
  return projectsIdWithComment
}

const getReportedUpdated = async () => {
  const updates = await Update.find({ reported: true })
  const projectsIdWithUpdates = await Promise.all(
    updates.map(async update => {
      let project = await Project.find({ updates: update._id })
      return {
        projectId: project[0]._id,
        ...update._doc
      }
    })
  )
  return projectsIdWithUpdates
}

const getAllReports = [
  getReportedProjects(),
  getReportedComments(),
  getReportedUpdated()
]

module.exports = router
