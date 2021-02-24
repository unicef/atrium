import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { refreshToken, verifyEmail } from '../../../actions/authActions'
import InfoPage from './InfoPage'
import { getEmailHash } from './libs/get-email-hash'
import PollPage from './PollPage'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  verifyEmail: ({ emailHash }) => dispatch(verifyEmail({ emailHash })),
  refreshToken: () => dispatch(refreshToken())
})

const enhance = compose(connect(mapStateToProps, mapDispatchToProps))

export const Registration = enhance(
  ({ classes, auth, history, refreshToken, ...props }) => {
    const [stage, setStage] = React.useState(1)

    React.useEffect(() => {
      const { location, verifyEmail } = props

      const emailHash = getEmailHash(location.search)

      const params = new URLSearchParams(location.search)
      const invitationCode = params.get('code')

      const handleVerify = async () => {
        try {
          await verifyEmail({ emailHash: `${emailHash}/${invitationCode}` })
        } catch (error) {
          history.push('/login')
        }
      }

      if (emailHash) {
        handleVerify()
      } else {
        history.push('/login')
      }
    }, [])

    const handleSubmitStage = () => {
      setStage(prev => prev + 1)
    }

    /**
     * Navigate to page and call to refresh user token
     *
     * @param {string} path
     */
    const refreshTokenAndNavigate = async path => {
      history.push(path)
      await refreshToken()
    }

    return {
      1: <InfoPage submitStage={handleSubmitStage} />,
      2: <PollPage navigate={refreshTokenAndNavigate} />
    }[stage]
  }
)
