import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($createProductInput: CreateProductInput) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      code
      price
      description
      createdUserId
      createdUserName
      createdAt
      images {
        uuid
      }
      tags {
        id
        name
        status
        type
      }
      saleEnddate
      salePercent
      salePrice
      saleStartdate
      promotionName
      promotionStartdate
      promotionEnddate
      promotionProduct {
        code
        name
      }
      status
      updatedUserId
      updatedAt
      updatedUserName
    }
  }
`;
