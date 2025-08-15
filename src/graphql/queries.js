import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      origin
      image
      categories
    }
  }
`;

export const GET_GUITAR_MODELS = gql`
  query GetGuitarModels($brandId: ID!, $sortBy: ModelSortField = name, $sortOrder: SortOrder = ASC) {
    findBrandModels(id: $brandId, sortBy: { field: $sortBy, order: $sortOrder }) {
      id
      name
      type
      price
      image
      description
    }
  }
`;

export const GET_GUITAR_MODEL = gql`
  query GetGuitarModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      price
      image
      description
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      price
      image
      description
    }
  }
`;

export const GET_BRAND = gql`
  query GetBrand($id: ID!) {
    findUniqueBrand(id: $id) {
      id
      name
      origin
      image
      categories
    }
  }
`;
