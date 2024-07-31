import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getPostList } from "../../graphql/queries";
import { CustomPagination } from "./pagination";
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 5;

export function PostList() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const { loading, error, data, refetch } = useQuery(getPostList, {
    variables: {
      first: DEFAULT_PAGE_SIZE,
      skip: DEFAULT_PAGE_SIZE * (currentPage - 1),
    },
  });

  useEffect(() => {
    refetch({
      first: DEFAULT_PAGE_SIZE,
      skip: (currentPage - 1) * DEFAULT_PAGE_SIZE,
    });
  }, [currentPage, refetch]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error : {error.message}</p>;

  const totalPosts = data.postsConnection.aggregate.count;
  const totalPages = Math.ceil(totalPosts / DEFAULT_PAGE_SIZE);

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Grid container direction="column" style={{ minHeight: "80vh" }}>
        <Grid item xs>
          {data.posts.map(({ id, title, body }) => (
            <Box key={id} my={4}>
              <Typography variant="h5">{title}</Typography>
              <Typography>{body}</Typography>
            </Box>
          ))}
        </Grid>
        <Grid item container justifyContent="center">
          <CustomPagination
            page={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
