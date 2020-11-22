import gql from 'graphql-tag';

export const ADD_VOTE = gql`
    mutation AddVote($movieId: ID!) {
        addVote(movieId: $movieId)
    }
`;

export const REMOVE_VOTE = gql`
    mutation RemoveVote ($movieId: ID!) {
        removeVote(movieId: $movieId)
    }
`;