import { gql } from "@apollo/client";

// users
export const GET_ALL_USERS = gql`
  query {
    findallqlusers {
      id
      name
      email
      image
      role
    }
  }
`;

export const GET_USER_POSTS = gql`
  query getUserPosts($userId: Int!) {
    findAllUserPosts(userId: $userId) {
      title
      image_url
    }
  }
`;

export const getUserSavedPosts = (userId: number) => gql`

query {
  findAllUserSavedPosts(userId: ${userId}) {
    title
    image_url
  }
}
`;
