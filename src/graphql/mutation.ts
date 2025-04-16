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
export const UPDATE_FEEDBACK_MUTATION = gql`
  mutation UpdateFeedback(
    $feedbackId: Int
    $resolveInput: FeedbackResolveInput
  ) {
    updateFeedback(feedbackId: $feedbackId, resolveInput: $resolveInput) {
      id
      type
      status
      priority
      date
      title
      description
      user {
        cumId
        uuid
        phoneNumber
        loyaltyPercent
        walletNumber
        wallet {
          walletNumber
          balance
          currency
        }
        family {
          id
          members {
            cumId
            phoneNumber
            firstName
            lastName
          }
        }
        detail {
          lastName
          firstName
          birthDate
          email
          gender
          kyc
          status
          phoneNumber
          userId
        }
        status
        groups {
          id
          name
        }
        createdAt
      }
      image {
        uuid
        originalName
        url
        mimetype
      }
      resolutionComment
      resolvedDate
      resolvedEmp {
        empId
        orgId
        firstName
        lastName
      }
      assignedEmp {
        empId
        orgId
        firstName
        lastName
      }
      assignedAt
      assignerEmp {
        empId
        orgId
        firstName
        lastName
      }
    }
  }
`;
