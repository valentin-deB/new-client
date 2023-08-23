import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

interface GraphicalElementProps {
  index: number;
  control: Control<
    {
      [key: string]: unknown;
      projectType: string[];
      missionDescription?: string | undefined;
      optimalDate?: string | undefined;
      limitDate?: string | undefined;
      clientWebsite?: string | undefined;
      clientLogo?: FileList | undefined;
    },
    Record<string, unknown>
  >;
  removeGraphicElement: () => void;
}

const GraphicalElement: React.FC<GraphicalElementProps> = ({
  index,
  control,
  removeGraphicElement,
}) => {
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
                value={undefined}
              />
            </Button>
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
