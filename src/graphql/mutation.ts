import { gql } from "graphql-request";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($createProductInput: CreateProductInput) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      status
      price
      tags {
        id
        name
        status
        products {
          id
          name
          status
          code
          price
          weight
          weightUnit
          remaining
          description
          minAge
          createdUserId
          createdAt
          updatedUserId
          updatedAt
        }
      }
      weight
      weightUnit
      remaining
      description
      code
      createdAt
      createdUserId
    }
  }
`;
