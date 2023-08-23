import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Link,
  Stack,
} from "@mui/material";

import InspirationLink from "./components/InspirationLinkComponent";
import InspirationImage from "./components/InspirationImageComponent";

const InspiComponent: React.FC = () => {

  const [inspirationLinks, setInspirationLinks] = useState([
    { title: "", description: "", link: "" },
  ]);

  const [inspirationImages, setInspirationImages] = useState<{ file: File, title: string, description: string }[]>([]);

  const addInspirationLink = () => {
    setInspirationLinks([...inspirationLinks, { title: "", description: "", link: "" }]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInspirationImages([...inspirationImages, ...Array.from(e.target.files).map(file => ({ file, title: "", description: "" }))]);
    }
  };

  return (
    <Box className="c-pagesection">
      <Box className="l-container l-container--small">
        <Stack gap={2}>
          <Typography variant="h4" className="c-form__title">
            Inspiration
          </Typography>
          <Typography variant="body1">
            N'hésitez pas à mettre un maximum d'éléments d'inspiration, pour me permettre de bien cerner vos envies. L'inspiration n'a pas nécessairement besoin d'être un design, elle peut être n'importe quoi, précisez juste dans la description ce que vous trouvez, bien, inspirant, dans celle-ci.
          </Typography>

          <Typography variant="body1">
            Voici quelques sites qui peuvent vous aider à trouver de l'inspiration :{" "}
              <Link href="https://dribbble.com/" target="_blank" rel="noopener noreferrer" color="inherit">
                Dribbble
              </Link>
              ,{" "}
              <Link href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" color="inherit">
                Pinterest
              </Link>
              ,{" "}
              <Link href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" color="inherit">
                Behance
              </Link>
              ,{" "}
              <Link href="https://www.awwwards.com/" target="_blank" rel="noopener noreferrer" color="inherit">
                Awwwards
              </Link>
              ,{" "}
              <Link href="https://www.designspiration.net/" target="_blank" rel="noopener noreferrer" color="inherit">
                Designspiration
              </Link>
          </Typography>
          <Stack marginTop={2} gap={2}>
            {inspirationLinks.map((inspiration, index) => (
              <InspirationLink
                key={index}
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
                key={index}
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
          <Box display="flex" gap={2}>
            <Button variant="contained" color="primary" onClick={addInspirationLink}>
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
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default InspiComponent;