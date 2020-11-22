import gql from 'graphql-tag';

export const PROFILE_QUERY = gql`
    query {
        currentUser {
            id
            username
            email
            votes {
                id
                movie {
                    id
                    title
                    imageUrl
                    description
                    category {
                        id
                        title
                    }
                }
            }
        }
    }
`;