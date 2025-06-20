import { API } from "aws-amplify";
import { listNotes } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { ListNotesQuery } from "../API";

export const getNotesService = async (): Promise<
  GraphQLResult<ListNotesQuery> | undefined
> => {
  return (await API.graphql({
    query: listNotes,
  })) as GraphQLResult<ListNotesQuery>;
};
