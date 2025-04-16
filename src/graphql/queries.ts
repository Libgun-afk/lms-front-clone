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
        type
        region
        weekdaysHours
        weekendHours
        features {
          isOpen24Hours
          sellsAlcohol
          hasFoodToGo
          sellsVape
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
      pageNumber
      pageSize
      total
      items {
        id
        name
        status
        code
        price
        salePrice
        salePercent
        saleStartdate
        saleEnddate
        promotionName
        promotionProduct {
          code
          name
        }
        promotionStartdate
        promotionEnddate
        description
        tags {
          id
          name
          status
          type
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

export const GET_EMPLOYEES = gql`
  query GetEmployeeList {
    getEmployeeList {
      empId
      orgId
      firstName
      lastName
    }
  }
`;

export const GET_EMP_ID = gql`
  query GetEmployeeByEmpId {
    getEmployeeByEmpId {
      empId
      orgId
      firstName
      lastName
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      pageNumber
      pageSize
      total
      items {
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
            type
            canSpendLoyalty
            showPurchaseHistory
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
    }
  }
`;
export const GET_USERS_MINIMAL = gql`
  query GetUsersMinimal {
    getUsers {
      pageNumber
      pageSize
      total
      items {
        uuid
        detail {
          firstName
          lastName
          phoneNumber
          email
        }
        status
        createdAt
      }
    }
  }
`;

export const GET_LOG = gql`
  query GetActivityLogs {
    getActivityLogs {
      pageNumber
      pageSize
      total
      items {
        id
        action
        requestHeader
        requestUrl
        requestType
        requestBody
        responseBody
        description
        createdAt
        createdEmpId
      }
    }
  }
`;

export const GET_FEEDBACK_STATUSES = gql`
  query GetFeedbackStatuses {
    getFeedbackStatuses {
      value
      label
    }
  }
`;
