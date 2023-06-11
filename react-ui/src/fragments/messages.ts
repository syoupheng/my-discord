import { graphql } from "@/gql";

export const MESSAGE_INFO = graphql(`
  fragment Message on Message {
    id
    type
    createdAt
    editedAt
    content
    channelId
    author {
      ...ChannelMember
    }
    referencedMessage {
      id
      content
      author {
        ...ChannelMember
      }
      mentions {
        ...ChannelMember
      }
    }
    mentions {
      ...ChannelMember
    }
  }
`);
