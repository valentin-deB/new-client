// React imports
import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";

// MUI imports
import { TextField, Button, Box, Typography, Avatar } from "@mui/material";

// Types imports
import { ProjectData } from "../ProjectComponent";

interface GraphicalElementProps {
  index: number;
  control: Control<ProjectData>;
  removeGraphicElement: () => void;
}

const GraphicalElement: React.FC<GraphicalElementProps> = ({
  index,
  control,
  removeGraphicElement,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Controller
        name={`elementTitle${index}`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Titre de l'élément (Par exemple: Logo)"
            fullWidth
          />
        )}
      />
      <Controller
        name={`elementFile${index}`}
        control={control}
        render={({ field }) => (
          <Box style={{ marginTop: "10px" }}>
            <Button variant="contained" component="label" color="primary">
              Sélectionner un fichier
              <input
                type="file"
                accept=".pdf, image/*, .svg, .eps, .ai"
                hidden
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleFileChange(e);
                }}
                value={undefined}
              />
            </Button>
            {filePreview && (
              <Box mt={2}>
                <Typography variant="body2">Aperçu:</Typography>
                <Avatar src={filePreview} variant="square" sx={{ width: 60, height: 60 }} />
              </Box>
            )}
            <Button
              variant="outlined"
              onClick={removeGraphicElement}
              style={{ marginLeft: "10px" }}
            >
              Supprimer
            </Button>
          </Box>
        )}
      />
    </Box>
  );
};

export default GraphicalElement;
