import {GraphQLList, GraphQLObjectType} from 'graphql';
import {resolveOrganization, resolveTeam, resolveTeamMember} from 'server/graphql/resolvers';
import Invitation from 'server/graphql/types/Invitation';
import Organization from 'server/graphql/types/Organization';
import Team from 'server/graphql/types/Team';
import TeamMember from 'server/graphql/types/TeamMember';

const AddOrgPayload = new GraphQLObjectType({
  name: 'AddOrgPayload',
  fields: () => ({
    organization: {
      type: Organization,
      resolve: resolveOrganization
    },
    team: {
      type: Team,
      resolve: resolveTeam
    },
    teamMember: {
      type: TeamMember,
      description: 'The teamMember that just created the new team, if this is a creation',
      resolve: resolveTeamMember
    },
    invitations: {
      type: new GraphQLList(Invitation),
      resolve: ({invitationIds}, args, {dataLoader}) => {
        if (!invitationIds || invitationIds.length === 0) return [];
        return dataLoader.get('invitations').loadMany(invitationIds);
      }
    }
  })
});

export default AddOrgPayload;