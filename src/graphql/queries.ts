import { gql } from "@apollo/client";

export const getPostList = gql`
query getPostList($first: Int, $skip: Int) {
  postsConnection(first: $first, skip: $skip) {
    aggregate {
      count
    }
  }
  posts(first: $first, skip: $skip) {
    id
    title
    body
  }
}`