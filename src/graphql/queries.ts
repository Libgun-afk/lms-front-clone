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
        description
        code
        price
        tags {
          id
          name
          status
        }
        createdUserId
        createdAt
        updatedUserId
        updatedAt
        images {
          url
        }
      }
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
        firstName
        lastName
        phoneNumber
        email
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