import React from "react";
import { TextField, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type InspirationImageProps = {
  file: File;
  title: string;
  description: string;
  index: number;
  removeImage: (index: number) => void;
  updateImage: (
    index: number,
    updatedImage: { title?: string; description?: string }
  ) => void;
};

const InspirationImage: React.FC<InspirationImageProps> = ({
  file,
  title,
  description,
  index,
  removeImage,
  updateImage,
}) => {
  return (
    <Stack gap={2}>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <img
          src={URL.createObjectURL(file)}
          alt="Inspiration"
          style={{ maxWidth: "120px", maxHeight: "120px", borderRadius: "5px", border: "1px solid #C4C4C4"}}
        />
        <Stack flexDirection="column" gap={1}  width="100%">
          <TextField
            label="Title"
            value={title}
            style={{ display: "inline" }}
            onChange={(e) => updateImage(index, { title: e.target.value })}
          />
          <TextField
            label="Description"
            value={description}
            multiline
            fullWidth
            onChange={(e) =>
              updateImage(index, { description: e.target.value })
            }
          />
        </Stack>
      </Stack>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={() => removeImage(index)}
      >
        Retirer
      </Button>
    </Stack>
  );
};

export default InspirationImage;
