import { Button, ButtonGroup } from "@mui/material";

interface ICustomPaginationProps {
  totalPages: number;
  page: number;
  onChange: (pageNumber: number) => void;
}

export function CustomPagination({
  totalPages,
  page,
  onChange,
}: ICustomPaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <ButtonGroup variant="outlined" aria-label="Basic button group">
      {pageNumbers.map((number) => {
        const buttonColor = number === page ? "primary" : "inherit";
        return (
          <Button
            key={number}
            onClick={() => onChange(number)}
            color={buttonColor}
          >
            {number}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
