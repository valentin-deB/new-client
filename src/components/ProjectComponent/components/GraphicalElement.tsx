// React import
import React, { useState, useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
// MUI import
import { TextField, Button, Box, Typography, Avatar } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
// Hooks import
import { useCloudinaryUpload } from "../../hooks/useCloudinaryUpload";

interface GraphicalElementFormProps {
  control: UseFormReturn["control"];
  index: number;
  onDelete: (index: number) => void;
  updateFileUrl: (index: number, url: string) => void;
}

const GraphicalElement: React.FC<GraphicalElementFormProps> = ({
  control,
  index,
  onDelete,
  updateFileUrl,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const { uploading, uploadedUrl, error, uploadToCloudinary } =
    useCloudinaryUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadToCloudinary(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (uploadedUrl) {
      updateFileUrl(index, uploadedUrl);
    }
  }, [uploadedUrl]);

  return (
    <Box>
      <Controller
        name={`graphicalElements[${index}].Title`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            required
            fullWidth
          />
        )}
      />
      <Controller
        name={`graphicalElements[${index}].File`}
        control={control}
        render={({ field }) => (
          <Box mt={2}>
            {filePreview && (
              <Box mt={2}>
                <Typography variant="body2">Aperçu:</Typography>
                <Avatar
                  src={filePreview}
                  variant="square"
                  sx={{ width: 60, height: 60, mb: 2 }}
                />
              </Box>
            )}
            <Box mb={2}>
              {uploading && (
                <Typography variant="body2">
                  Téléchargement en cours...
                </Typography>
              )}
              {uploadedUrl && (
                <Typography variant="body2">Téléchargement réussi !</Typography>
              )}
              {error && (
                <Typography variant="body2">
                  Erreur lors du téléchargement
                </Typography>
              )}
            </Box>
            <Button variant="contained" component="label" color="primary">
              Sélectionner un fichier
              <input
                type="file"
                accept=".pdf, image/*, .svg, .eps, .ai"
                hidden
                {...field}
                onChange={(e) => {
                  handleFileChange(e)
                }}
                value={undefined}
              />
            </Button>
            <Button
              variant="outlined"
              onClick={() => onDelete(index)}
              style={{ marginLeft: "10px" }}
            >
              <DeleteIcon/>
            </Button>
          </Box>
        )}
      />
    </Box>
  );
};

export default GraphicalElement;
