// React imports
import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";

// MUI imports
import { TextField, Button, Box, Typography, Avatar } from "@mui/material";

// Types imports
import { ProjectData } from "../ProjectComponent";

// Hooks imports
import {useCloudinaryUpload} from '../../hooks/useCloudinaryUpload';

interface GraphicalElementProps {
  index: number;
  control: Control<ProjectData>;
  removeGraphicElement: () => void;
  updateFileUrl: (index: number, url: string) => void;
}

const GraphicalElement: React.FC<GraphicalElementProps> = ({
  index,
  control,
  removeGraphicElement,
  updateFileUrl,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const { uploading, uploadedUrl, error, uploadToCloudinary } = useCloudinaryUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadToCloudinary(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (uploadedUrl) {
        updateFileUrl(index, uploadedUrl);
      }
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
            {uploading && <Typography variant="body2">Téléchargement en cours...</Typography>}
            {uploadedUrl && <Typography variant="body2">Téléchargement réussi !</Typography>}
            {error && <Typography variant="body2">Erreur lors du téléchargement</Typography>}
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
