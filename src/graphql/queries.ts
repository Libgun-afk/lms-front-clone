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
