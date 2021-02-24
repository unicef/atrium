/*
    In this file, functions to interact with the GitHub API are available
*/
const log = require('../config/log')
const { ATRIUM_CONSTANTS } = require('../config/unin-constants')
const keys = require('../config/keys')
// Should we see if we should add a way to generate personal tokens for people
// to add themselves to an organization once approved...
const octokit = require('@octokit/rest')({ auth: keys.GITHUB_ACCESS_TOKEN })

// Listing members of the interagency blockchain github org
exports.listMembersFromGitHubOrg = org => {
  log.info({ org }, 'Listing members for org')
  return octokit.orgs.listMembers({ org })
}

exports.addMembershipToGitHubOrg = (org, username) => {
  log.info({ org, username }, 'Adding membership to github org')
  return octokit.orgs.addOrUpdateMembership({ org, username })
}

exports.updateMembershipToGitHubOrg = (org, username, role) => {
  // Ensure that role is passed in
  // Role can be:
  /*
              The role to give the user in the organization.
              Can be one of: \* `admin` - The user will become an owner of the organization.
                              \* `member` - The user will become a non-owner member of the organization.
          */
  log.info({ org, username }, 'Updating membership to github org')

  return octokit.orgs
    .addOrUpdateMembership({ org, username, role })
    .then(response => {
      console.log('Response from GitHub:', response.data)
    })
    .catch(error => {
      console.log('Error from GitHub:', error)
    })
}

exports.forkPublicRepoForGithub = async (owner, repo) => {
  log.info({ owner, repo }, 'Forking repo for github')
  return await octokit.repos.createFork({
    owner,
    repo,
    organization: ATRIUM_CONSTANTS.GITHUB_PROFILE_NAME
  })
}

exports.deleteRepoFromGitHub = async (owner, repo) => {
  log.info({ owner, repo }, 'Deleting repo from github')
  return await octokit.repos.delete({ owner, repo })
}
