//React imports
import React, { useState } from "react";
import { useForm, FieldValues, Control } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
//MUI imports
import { Button, Box, Typography, Link, Stack } from "@mui/material";
// Data context imports
import { useCompanyDataContext } from "../../context/CompanyDataContext";
//Hooks imports
import { useGoToPage } from "../hooks/useGoToPage";

//Services imports
import { addRecord } from "../services/airtableService";
// Utils imports
import { handleDeleteElement } from "../utils/handleDeleteElement";
//Components imports
import InspirationLink from "./components/InspirationLinkComponent";
import InspirationImage from "./components/InspirationImageComponent";

type InspirationLink = {
  Title: string;
  Description: string;
  Link: string;
  Project: string;
  id: string;
};

type InspirationImage = {
  Title: string;
  Description: string;
  File: string;
  Project: string;
  id: string;
};

type InspirationData = {
  inspirationLinks: InspirationLink[];
  inspirationImages: InspirationImage[];
};

const InspiComponent: React.FC = () => {
  const { goToPage } = useGoToPage("/end");

  const { companyData } = useCompanyDataContext();
  //eslint-disable-next-line
  let projectId = (companyData as any)?.ProjectId;
  if (!projectId) {
    projectId = "no project data found";
  }

  const defaultInspirationLink: InspirationLink = {
    Title: "",
    Description: "",
    Link: "",
    id: uuidv4(),
    Project: projectId,
  };

  const defaultInspirationImage: InspirationImage = {
    Title: "",
    Description: "",
    File: "",
    id: uuidv4(),
    Project: projectId,
  };

  const [inspirationLinks, setInspirationLinks] = useState<InspirationLink[]>([
    defaultInspirationLink,
  ]);
  const [inspirationImages, setInspirationImages] = useState<
    InspirationImage[]
  >([defaultInspirationImage]);

  const handleDeleteLink = (elementIdToDelete: string) => {
    handleDeleteElement(
      inspirationLinks,
      setInspirationLinks,
      elementIdToDelete
    );
  };
  const handleDeleteImage = (elementIdToDelete: string) => {
    handleDeleteElement(
      inspirationImages,
      setInspirationImages,
      elementIdToDelete
    );
  };

  const { control, handleSubmit, setValue } = useForm<InspirationData>();

  const updateFileUrl = (index: number, url: string) => {
    const newInspirationImages = [...inspirationImages];
    newInspirationImages[index].File = url;
    setInspirationImages(newInspirationImages);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fieldName = `inspirationImages[${index}].File` as any;
    setValue(fieldName, url);
  };

  //Save to Airtable

  const onSubmit = async (data: InspirationData) => {
    // Save Inspiration Links
    if (data.inspirationLinks !== undefined) {
      for (const element of data.inspirationLinks) {
        const elementData = {
          Title: element.Title,
          Link: element.Link,
          Description: element.Description,
          Project: projectId,
        };
        console.log("elementData:", elementData);
        const elementResponse = await addRecord(
          "InspirationLinks",
          elementData
        );
        console.log("Inspiration Links saved:", elementResponse);
      }
    }
    // Save Inspiration Images
    if (data.inspirationImages !== undefined) {
      for (const element of data.inspirationImages) {
        const elementData = {
          Title: element.Title,
          File: element.File,
          Description: element.Description,
          Project: projectId,
        };
        console.log("elementData:", elementData);
        const elementResponse = await addRecord(
          "InspirationImages",
          elementData
        );
        console.log("Inspiration Images saved:", elementResponse);
      }
    }

    // Go to next page
    goToPage();
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
              {inspirationLinks.map((element, index) => (
                <InspirationLink
                  key={element.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  control={control as unknown as Control<FieldValues, any>}
                  index={index}
                  onDelete={() => {
                    handleDeleteLink(element.id);
                  }}
                />
              ))}
              {inspirationImages.map((element, index) => (
                <InspirationImage
                  key={element.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  control={control as unknown as Control<FieldValues, any>}
                  index={index}
                  onDelete={() => {
                    handleDeleteImage(element.id);
                  }}
                  updateFileUrl={updateFileUrl}
                />
              ))}
            </Stack>
            <Stack flexDirection="row" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setInspirationLinks([
                    ...inspirationLinks,
                    {
                      Title: "",
                      Description: "",
                      Link: "",
                      Project: projectId,
                      id: uuidv4(),
                    },
                  ]);
                }}
              >
                Ajouter un lien inspirant
              </Button>
              <Button variant="outlined" component="label">
                Ajouter une image inspirante
                <Button
                  onClick={() => {
                    setInspirationImages([
                      ...inspirationImages,
                      {
                        Title: "",
                        Description: "",
                        File: "",
                        Project: projectId,
                        id: uuidv4(),
                      },
                    ]);
                  }}
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
