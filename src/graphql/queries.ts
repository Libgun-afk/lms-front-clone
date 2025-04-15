import { gql } from "@apollo/client";

export const GET_BRANCHES = gql`
  query GetBranches {
    getBranches {
      pageNumber
      pageSize
      total
      items {
        id
        name
        status
        imageUrl
        weekdaysHours
        weekendHours
        features {
          isOpen24Hours
          sellsAlcohol
          sellsFastFood
          sellsCigarettes
          hasPowerBankRental
        }
        location {
          city
          district
          khoroo
          address
          latitude
          longitude
        }
      }
    }
  }
`;

export const GET_TAG_LIST = gql`
  query GetTagList($pagination: PaginationInput!, $filters: FilterTag) {
    getTagList(pagination: $pagination, filters: $filters) {
      items {
        name
        id
        type
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      items {
        id
        name
        code
        price
        description
        images {
          uuid
          originalName
          url
          mimetype
        }
        createdUserId
        createdUserName
        createdAt
        promotionProduct {
          name
        }
        status
        tags {
          name
        }
        updatedAt
        updatedUserId
        salePrice
        salePercent
        saleStartdate
        saleEnddate
        promotionName
        promotionStartdate
        promotionEnddate
        updatedUserName
      }
      total
    }
  }
`;

export const GET_FEEDBACKS = gql`
  query GetFeedbackList($pagination: PaginationInput) {
    getFeedbackList(pagination: $pagination) {
      pageNumber
      pageSize
      total
      items {
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
          canSpendLoyalty
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
  }
`;
