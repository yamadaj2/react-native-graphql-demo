import gql from 'graphql-tag';

export const CATEGORY_QUERY = gql`
    query {
        categories {
            id
            title
        }
    }
`