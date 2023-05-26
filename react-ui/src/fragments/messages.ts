import { graphql } from "../gql";

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
