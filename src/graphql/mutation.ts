import { gql } from "graphql-request";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($createProductInput: CreateProductInput) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      status
      code
      price
      salePrice
      salePercent
      saleEnddate
      description
      createdUserId
      createdUserName
      createdAt
      updatedUserId
      updatedUserName
      updatedAt
    }
  }
`;
