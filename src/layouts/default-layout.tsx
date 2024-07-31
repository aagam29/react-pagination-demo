import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <>
      <Container disableGutters>
        <Outlet />
      </Container>
    </>
  );
}
