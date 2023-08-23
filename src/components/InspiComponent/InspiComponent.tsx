//React imports
import React, { useState } from "react";
import { useForm } from "react-hook-form";

//MUI imports
import { Button, Box, Typography, Link, Stack } from "@mui/material";

//Hooks imports


//Components imports
import InspirationLink from "./components/InspirationLinkComponent";
import InspirationImage from "./components/InspirationImageComponent";

const InspiComponent: React.FC = () => {
  const [inspirationLinks, setInspirationLinks] = useState<
    { title: string; description: string; link: string; projectId?: string }[]
  >([{ title: "", description: "", link: "" }]);

  const [inspirationImages, setInspirationImages] = useState<
    { file: File; title: string; description: string; projectId?: string }[]
  >([]);

  const { handleSubmit } = useForm();

  const addInspirationLink = () => {
    setInspirationLinks([
      ...inspirationLinks,
      { title: "", description: "", link: "" },
    ]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInspirationImages([
        ...inspirationImages,
        ...Array.from(e.target.files).map((file) => ({
          file,
          title: "",
          description: "",
        })),
      ]);
    }
  };

  //Save to Airtable

  const { saveToAirtable } = useSaveToAirtable("/project");

  const onSubmit = async (data: unknown) => {
    const projectResponse = await saveToAirtable("Projects", data);
    
    if (projectResponse && projectResponse.id) {
      const projectId = projectResponse.id;
  
      // Save associated links
      for (const link of inspirationLinks) {
        link.projectId = projectId;
        await saveToAirtable('InspirationLinks', link);
      }
  
      // Save associated images
      for (const image of inspirationImages) {
        image.projectId = projectId;
        await saveToAirtable('InspirationImages', image);
      }
    }
    else {
      // Handle errors
      console.error("Error saving project.");
    }
  };

  return (
    <Box className="c-pagesection">
      <Box className="l-container l-container--small">
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} gap={4}>
          <Stack gap={2}>
            <Typography variant="h4" className="c-form__title">
              Inspiration
            </Typography>
            <Typography variant="body1">
              N'hésitez pas à mettre un maximum d'éléments d'inspiration, pour
              me permettre de bien cerner vos envies. L'inspiration n'a pas
              nécessairement besoin d'être un design, elle peut être n'importe
              quoi, précisez juste dans la description ce que vous trouvez,
              bien, inspirant, dans celle-ci.
            </Typography>
            <Typography variant="body1">
              Voici quelques sites qui peuvent vous aider à trouver de
              l'inspiration :{" "}
              <Link
                href="https://dribbble.com/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                Dribbble
              </Link>
              ,{" "}
              <Link
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                Pinterest
              </Link>
              ,{" "}
              <Link
                href="https://www.behance.net/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                Behance
              </Link>
              ,{" "}
              <Link
                href="https://www.awwwards.com/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                Awwwards
              </Link>
              ,{" "}
              <Link
                href="https://www.designspiration.net/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                Designspiration
              </Link>
            </Typography>
            <Stack marginTop={2} gap={2}>
              {inspirationLinks.map((inspiration, index) => (
                <InspirationLink
                  key={index + "link"}
                  title={inspiration.title}
                  description={inspiration.description}
                  link={inspiration.link}
                  index={index}
                  removeLink={(index) => {
                    const newLinks = [...inspirationLinks];
                    newLinks.splice(index, 1);
                    setInspirationLinks(newLinks);
                  }}
                  updateLink={(index, updatedLink) => {
                    const newLinks = [...inspirationLinks];
                    Object.assign(newLinks[index], updatedLink);
                    setInspirationLinks(newLinks);
                  }}
                />
              ))}
              {inspirationImages.map((inspiration, index) => (
                <InspirationImage
                  key={index + "image"}
                  file={inspiration.file}
                  title={inspiration.title}
                  description={inspiration.description}
                  index={index}
                  removeImage={(index) => {
                    const newImages = [...inspirationImages];
                    newImages.splice(index, 1);
                    setInspirationImages(newImages);
                  }}
                  updateImage={(index, updatedImage) => {
                    const newImages = [...inspirationImages];
                    Object.assign(newImages[index], updatedImage);
                    setInspirationImages(newImages);
                  }}
                />
              ))}
            </Stack>
            <Stack flexDirection="row" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={addInspirationLink}
              >
                Ajouter un lien inspirant
              </Button>
              <Button variant="outlined" component="label">
                Upload une image inspirante
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
            </Stack>
          </Stack>
          <Button variant="contained" type="submit">
            Valider la création du projet
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default InspiComponent;
