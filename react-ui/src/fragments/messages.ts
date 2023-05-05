import { graphql } from "../gql";

export const CHANNEL_MEMBER_FIELDS = graphql(`
  fragment ChannelMemberFields on ChannelMember {
    id
    username
    createdAt
    avatarColor
  }
`);

export const MESSAGE_INFO = graphql(`
  fragment MessageInfo on Message {
    id
    type
    createdAt
    editedAt
    content
    channelId
    author {
      ...ChannelMemberFields
    }
    referencedMessage {
      id
      content
      author {
        ...ChannelMemberFields
      }
      mentions {
        ...ChannelMemberFields
      }
    }
    mentions {
      ...ChannelMemberFields
    }
  }
`);
