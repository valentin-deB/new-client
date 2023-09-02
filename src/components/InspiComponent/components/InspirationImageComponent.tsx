import React, { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { TextField, Button, Stack, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useCloudinaryUpload } from "../../hooks/useCloudinaryUpload";

type InspirationImageProps = {
  control: UseFormReturn["control"];
  index: number;
  onDelete: (index: number) => void;
  updateFileUrl: (index: number, url: string) => void;
};

const InspirationImage: React.FC<InspirationImageProps> = ({
  control,
  index,
  onDelete,
  updateFileUrl,
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const { uploadedUrl, uploadToCloudinary } =
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
    <Stack flexDirection="row" gap={1} width={"100%"} alignItems={"center"}>
      <Stack gap={1} width={"100%"}>
        <Controller
          name={`inspirationImages[${index}].Title`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Title" required fullWidth />
          )}
        />

        {/* Description */}
        <Controller
          name={`inspirationImages[${index}].Description`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              required
              fullWidth
              multiline
              rows={3}
            />
          )}
        />
      </Stack>
      <Stack alignItems={"center"}>
        {filePreview && (
          <Avatar
            style={{border: "1px solid #0000003B", borderRadius: "4px"}}
            src={filePreview}
            variant="square"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
        )}
        <Stack flexDirection="row" gap={1}>
          <Controller
            name={`inspirationImages[${index}].File`}
            control={control}
            render={({ field }) => (
              <Button variant="contained" component="label" color="primary">
                <FileUploadIcon />
                <input
                  type="file"
                  accept=".pdf, image/*, .svg, .eps, .ai"
                  hidden
                  {...field}
                  onChange={handleFileChange}
                  value={undefined}
                />
              </Button>
            )}
          />
          <Button
            variant="outlined"
            onClick={() => onDelete(index)}
          >
            <DeleteIcon />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InspirationImage;
