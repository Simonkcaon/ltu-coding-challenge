import { API } from "aws-amplify";
import { listNotes } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { ListNotesQuery, ModelNoteFilterInput } from "../API";

export const getNotesService = async (
  archived: boolean
): Promise<GraphQLResult<ListNotesQuery> | undefined> => {
  const filter: ModelNoteFilterInput = {
    archived: { ne: true },
  };

  if (archived) {
    filter.archived = { eq: true };
  }

  return (await API.graphql({
    query: listNotes,
    variables: { filter: filter },
  })) as GraphQLResult<ListNotesQuery>;
};
