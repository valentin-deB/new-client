// React import
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
// MUI import
import { TextField, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type InspirationLinkProps = {
  control: UseFormReturn["control"];
  index: number;
  onDelete: (index: number) => void;
};

const InspirationLink: React.FC<InspirationLinkProps> = ({
  control,
  index,
  onDelete,
}) => {
  return (
    <Stack flexDirection="row" gap={1} width={"100%"} alignItems={"center"}>
      <Stack gap={1} width={"100%"}>
        <Stack flexDirection="row" gap={1}>
          <Controller
            name={`inspirationLinks[${index}].Title`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Titre" required style={{ width: "100%" }}  />
            )}
          />
          <Controller
            name={`inspirationLinks[${index}].Link`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Link" required style={{ width: "100%" }} />
            )}
          />
        </Stack>
        <Controller
          name={`inspirationLinks[${index}].Description`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Qu'est ce qui est inspirant ?"
              multiline
              rows={3}
            />
          )}
        />
      </Stack>
      <Button variant="outlined" style={{aspectRatio: "1/1"}} onClick={() => onDelete(index)}>
        <DeleteIcon />
      </Button>
    </Stack>
  );
};

export default InspirationLink;
