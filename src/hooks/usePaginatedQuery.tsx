import { useState, useEffect } from "react";
import { DocumentNode, useQuery } from "@apollo/client";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 5;

export function usePaginatedQuery(
  query: DocumentNode,
  totalCountPath: string,
  variables: Record<string, unknown>
) {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const { loading, error, data, refetch } = useQuery(query, {
    variables: {
      ...variables,
      first: DEFAULT_PAGE_SIZE,
      skip: DEFAULT_PAGE_SIZE * (currentPage - 1),
    },
  });

  useEffect(() => {
    refetch({
      ...variables,
      first: DEFAULT_PAGE_SIZE,
      skip: (currentPage - 1) * DEFAULT_PAGE_SIZE,
    });
  }, [currentPage, refetch, variables]);

  const totalCount = data?.[totalCountPath].aggregate.count || 0;
  const totalPages = Math.ceil(totalCount / DEFAULT_PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageChangeMui = (_, page: number) => {
    setCurrentPage(page);
  };

  return {
    loading,
    error,
    data,
    currentPage,
    totalPages,
    handlePageChange,
    handlePageChangeMui,
  };
}
