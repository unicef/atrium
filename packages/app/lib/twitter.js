const Twitter = require('twitter')
const keys = require('../config/keys')
const log = require('../config/log')

const client = new Twitter({
  consumer_key: keys.TWITTER_CONSUMER_KEY,
  consumer_secret: keys.TWITTER_CONSUMER_SECRET,
  access_token_key: keys.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
})

// Need a way to create private poll
// Need a way to get information from a private poll
// Need a way to follow twitter accounts (based on user input... similar to github?)
// Need a way to follow twitter accounts (from a private account also)

// Follow a twitter account

exports.followOnTwitter = twitterHandle => {
  log.info({ user: twitterHandle }, 'Following user on twitter')
  return client.post('friendships/create', {
    screen_name: twitterHandle,
    follow: true
  })
}
// Write to public twitter account
exports.postTweet = status => {
  log.info({ status }, 'Posting tweet')
  return client.post('statuses/update', { status })
}

// Reading from public twitter account
exports.readFromTwitter = twitterHandle => {
  log.info({ user: twitterHandle }, 'Reading statuses')
  const params = {
    screen_name: twitterHandle,
    count: 2,
    tweet_mode: 'extended'
  }
  return client.get('statuses/user_timeline', params)
  // client.get('statuses/user_timeline', params, function(error, tweets) {
  //     if(!error) {
  //         console.log(tweets);
  //         return tweets;
  //     }
  // })
}
