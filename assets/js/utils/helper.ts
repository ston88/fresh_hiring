import { ApolloError } from 'apollo-boost';

export function getErrorMessage(error: ApolloError) {
  if (error.graphQLErrors) {
    return (
      error.graphQLErrors.reduce((prev, curr, i) => {
        if (i === 0) {
          return `${prev}${curr.message}`;
        }
        return `${prev} ${curr.message}`;
      }, '') || 'Oops! Something went wrong.'
    );
  }

  return 'Oops! Something went wrong.';
}
