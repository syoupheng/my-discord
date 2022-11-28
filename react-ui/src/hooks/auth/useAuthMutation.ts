import { DocumentNode, MutationHookOptions, OperationVariables, useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const useAuthMutation = <TData = any, TVariables = OperationVariables>(mutation: DocumentNode, options?: MutationHookOptions<TData, TVariables>) => {
  const navigate = useNavigate();
  const client = useApolloClient();
  return useMutation<TData, TVariables>(mutation, {
    ...options,
    onError:
      options?.onError ??
      ((error) => {
        if ("graphQLErrors" in error) {
          if (error.graphQLErrors.some((err) => err.extensions.code === "UNAUTHENTICATED")) {
            client.resetStore();
            navigate("/login");
          }
        }
        throw error;
      }),
  });
};

export default useAuthMutation;
