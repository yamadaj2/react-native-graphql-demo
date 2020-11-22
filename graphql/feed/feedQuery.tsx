import gql from 'graphql-tag';

export const FEED_QUERY = gql`
    query Feed($categoryId: ID) {
        feed(categoryId: $categoryId) {
            id
            title
            description
            category {
                id
                title
            }
            imageUrl
        }
    }
`;