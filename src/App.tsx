import { useMembersQuery } from "./generated/graphql";

export const App = () => {
  const { error, data, fetchMore, networkStatus } = useMembersQuery({ variables: { first: 11 } });

  console.log(data)

  return (
    <p>Test</p>
  );
};
