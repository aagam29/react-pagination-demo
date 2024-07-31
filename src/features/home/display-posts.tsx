import { getPostList } from "../../graphql/queries";
import { usePaginatedQuery } from "../../hooks/usePaginatedQuery";
import { CustomPagination } from "./pagination";
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
  Box,
  Pagination,
} from "@mui/material";

export function DisplayPosts() {
  const {
    loading,
    error,
    data,
    currentPage,
    totalPages,
    handlePageChange,
    handlePageChangeMui,
  } = usePaginatedQuery(getPostList, "postsConnection", {});

  if (loading) return <CircularProgress />;
  if (error) return <p>Error : {error.message}</p>;

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
          <Pagination
            page={currentPage}
            count={totalPages}
            onChange={handlePageChangeMui}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
