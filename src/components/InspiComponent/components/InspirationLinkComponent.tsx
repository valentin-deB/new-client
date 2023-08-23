import React from "react";
import { TextField, Button, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type InspirationLinkProps = {
  title: string;
  description: string;
  link: string;
  index: number;
  removeLink: (index: number) => void;
  updateLink: (
    index: number,
    updatedLink: { title?: string; description?: string; link?: string }
  ) => void;
};

const InspirationLink: React.FC<InspirationLinkProps> = ({
  title,
  description,
  link,
  index,
  removeLink,
  updateLink,
}) => {
  return (
    <Stack gap={2}>
      <Stack flexDirection="row" gap={1}>
        <TextField
          label="Titre"
          value={title}
          onChange={(e) => updateLink(index, { title: e.target.value })}
        />
        <TextField
          label="Lien"
          value={link}
          onChange={(e) => updateLink(index, { link: e.target.value })}
        />
      </Stack>
      <TextField
        label="Description"
        value={description}
        multiline
        onChange={(e) => updateLink(index, { description: e.target.value })}
      />
      <Button variant="outlined" startIcon={<DeleteIcon />}  onClick={() => removeLink(index)}>Retirer</Button>
    </Stack>
  );
};

export default InspirationLink;
