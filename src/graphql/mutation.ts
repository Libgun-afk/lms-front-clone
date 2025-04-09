import { gql } from "graphql-request";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct {
    createProduct {
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
      images {
        uuid
      }
      tags {
        id
        name
        status
      }
      promotionProduct {
        name
        code
      }
    }
  }
`;

export const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($createTagInput: CreateTagInput) {
    createTag(createTagInput: $createTagInput) {
      id
      name
      status
      products {
        id
        name
        status
        code
        price
        salePrice
        salePercent
        saleEnddate
        promotionProduct {
          code
          name
        }
        promotionEnddate
        description
        tags {
          id
          name
          status
        }
        images {
          uuid
          originalName
          url
          mimetype
        }
        createdUserId
        createdUserName
        createdAt
        updatedUserId
        updatedUserName
        updatedAt
      }
    }
  }
`;
