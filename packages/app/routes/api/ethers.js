const express = require('express')
const _ = require('lodash')
const router = express.Router()
const passport = require('passport')
// Custom ethers blockchain library:
const ethersLibrary = require('../../lib/ethers')
const log = require('../../config/log')

// @route GET api/ethers/network-details
// @desc Get current block of the network that this app is connected to
// @access Public
router.get(
  '/network-details',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    log.info({ requestId: req.id }, 'Getting network details')

    const networkDetails = {}
    networkDetails.lastBlock = await ethersLibrary.getBlockchainBlockNumber()

    log.info(
      { requestId: req.id, lastBlock: networkDetails.lastBlock },
      'Last block found in network'
    )
    res.send(networkDetails)
  }
)

module.exports = router
