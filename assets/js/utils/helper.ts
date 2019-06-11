import { ApolloError } from 'apollo-boost';

export function formatMoney(money: number, prefix = '') {
  if (Math.abs(money) / 1000000000 >= 1) {
    return Math.sign(money) === -1
      ? `-${prefix}${Math.floor((Math.abs(money) / 1000000000) * 100) / 100}B`
      : `${prefix}${Math.floor((Math.abs(money) / 1000000000) * 100) / 100}b`;
  }

  if (Math.abs(money) / 1000000 >= 1) {
    return Math.sign(money) === -1
      ? `-${prefix}${Math.floor((Math.abs(money) / 1000000) * 100) / 100}M`
      : `${prefix}${Math.floor((Math.abs(money) / 1000000) * 100) / 100}m`;
  }

  if (Math.abs(money) / 1000 >= 1) {
    return Math.sign(money) === -1
      ? `-${prefix}${Math.floor((Math.abs(money) / 1000) * 100) / 100}K`
      : `${prefix}${Math.floor((Math.abs(money) / 1000) * 100) / 100}k`;
  }

  return Math.sign(money) === -1
    ? `-${prefix}${Math.abs(money)}`
    : `${prefix}${Math.abs(money)}`;
}

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
