import {Component} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import {RouteComponentProps, withRouter} from 'react-router'
import {WithAtmosphereProps} from 'universal/decorators/withAtmosphere/withAtmosphere'
import withAtmosphere from '../decorators/withAtmosphere/withAtmosphere'
import AcceptTeamInvitationMutation from '../mutations/AcceptTeamInvitationMutation'
import {TeamInvitationAccept_verifiedInvitation} from '__generated__/TeamInvitationAccept_verifiedInvitation.graphql'

interface Props extends WithAtmosphereProps, RouteComponentProps<{token: string}> {
  verifiedInvitation: TeamInvitationAccept_verifiedInvitation
}

class TeamInvitation extends Component<Props> {
  constructor (props) {
    super(props)
    const {
      atmosphere,
      history,
      match: {
        params: {token}
      },
      teamInvitation: {teamId}
    } = props
    const onCompleted = () => {
      history.replace(`/team/${teamId}`)
    }
    AcceptTeamInvitationMutation(
      atmosphere,
      {invitationToken: token},
      {history},
      undefined,
      onCompleted
    )
  }

  render () {
    return null
  }
}

export default createFragmentContainer(
  withAtmosphere(withRouter(TeamInvitation)),
  graphql`
    fragment TeamInvitationAccept_verifiedInvitation on VerifiedInvitationPayload {
      teamInvitation {
        teamId
      }
    }
  `
)