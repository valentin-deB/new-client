//React imports
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
//MUI imports
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material";
import { Info } from "@mui/icons-material";
//Hooks imports
import { useGoToPage } from "../hooks/useGoToPage";
//Services imports
import { addRecord } from "../services/airtableService";
//Components imports
import GraphicalElement from "./components/GraphicalElement";


interface GraphicalElement {
  Title: string;
  File: string | null;
}

type ProjectData = {
  ProjectType: string[];
  OtherProjectType?: string;
  MissionDescription?: string;
  OptimalDate?: string;
  LimitDate?: string;
  ClientWebsite?: string;
  graphicalElements?: GraphicalElement[];
};

const ProjectComponent: React.FC = () => {

  const defaultGraphicalElement: GraphicalElement = {
    Title: "",
    File: "",
  };

  const { control, handleSubmit, watch } = useForm<ProjectData>({
    defaultValues: {
      ProjectType: [],
      OtherProjectType: "",
      MissionDescription: "",
      OptimalDate: new Date().toISOString().slice(0, 10),
      LimitDate: new Date().toISOString().slice(0, 10),
      ClientWebsite: "",
      graphicalElements: [defaultGraphicalElement],
    },
  });
  
  const [graphicalElements, setGraphicalElements] = useState<GraphicalElement[]>([defaultGraphicalElement]);

  const { goToPage } = useGoToPage("/inspirations");


  const updateFileUrl = (index: number, url: string) => {
    const updatedElements = [...graphicalElements];
    updatedElements[index].File = url;
    setGraphicalElements(updatedElements);
  };

  const [OtherProjectType, setOtherProjectType] = useState("");
  const projectTypes = watch("ProjectType");

  const onSubmit = async (data: ProjectData) => {
    // Create project
    console.log("ProjectType:", data.ProjectType)
    const projectData = {
      ProjectType: data.ProjectType,
      OtherProjectType: data.OtherProjectType,
      MissionDescription: data.MissionDescription,
      OptimalDate: data.OptimalDate,
      LimitDate: data.LimitDate,
      ClientWebsite: data.ClientWebsite,
    };
    console.log("Project data:", projectData)
    const projectResponse = await addRecord("Projects", projectData);
    console.log("Project saved:", projectResponse);

    const projectId = projectResponse.id;

    // Save Graphical Elements
    if (data.graphicalElements !== undefined){
      for (const element of data.graphicalElements) {
        const elementData = {
          Title: element.Title,
          File: element.File,
          Project: [projectId],
        };
        const elementResponse = await addRecord("GraphicalElements", elementData);
        console.log("Graphical Element saved:", elementResponse);
      }
    }
    // Go to next page
    // goToPage();
  };

  return (
    <Box className="c-pagesection">
      <Box className="l-container l-container--small">
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} gap={4}>
          <Stack gap={4}>
            <Stack gap={2}>
              <Typography variant="h4" className="c-form__title">
                Details sur le projet
              </Typography>
              {/* Type of Project */}
              <FormControl>
                <InputLabel>Type du projet</InputLabel>
                <Controller
                  name="ProjectType"
                  control={control}
                  render={({ field }) => (
                    <Select required {...field} multiple>
                      {[
                        "Design",
                        "Branding",
                        "Web design",
                        "Web development",
                        "Photo",
                        "Motion design",
                        "Vidéo",
                        "Autre",
                      ].map((type) => (
                        <MenuItem key={type} value={type}>
                          <Checkbox checked={projectTypes?.includes(type)} />
                          <span>{type}</span>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              {projectTypes?.includes("Autre") && (
                <Tooltip
                  arrow
                  title="Vous avez sélectionné autre, quel type de projet voulez-vous réaliser avec moi ?"
                >
                  <Box width="fit-content">
                    <TextField
                      name="OtherProjectType"
                      label="Précisez autre type"
                      value={OtherProjectType}
                      onChange={(e) => setOtherProjectType(e.target.value)}
                    />
                  </Box>
                </Tooltip>
              )}

              {/* Description of the Mission */}
              <Tooltip
                arrow
                title="Décrivez précisément votre projet, la place que j'y prendrai et ce que vous attendez de moi"
              >
                <Box>
                  <Controller
                    name="MissionDescription"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description de la mission"
                        required
                        multiline
                        rows={3}
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                </Box>
              </Tooltip>
              <Stack gap={2}>
                <Stack flexDirection="row" gap={2}>
                  {/* Optimal Date Field */}
                  <Tooltip
                    arrow
                    title="Dans un monde parfait, pour quand doit-on finir ce projet ?"
                  >
                    <Box>
                      <Controller
                        name="OptimalDate"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Date optimale de fin"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Tooltip>
                  {/* Limit Date Field */}
                  <Tooltip
                    arrow
                    title="Date à partir de laquelle nous sommes obligés d'avoir terminé votre projet"
                  >
                    <Box>
                      <Controller
                        name="LimitDate"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Date limite de fin"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Tooltip>
                  {/* Info button */}
                  <Stack flexDirection="row" alignItems="center" marginLeft={2}>
                    <Tooltip
                      arrow
                      title={
                        <Typography variant="body2">
                          Avoir ces deux extrêmes permet de mieux évaluer le
                          temps disponible, et donc le niveau de complexité et
                          de précision vers lequel nous pouvons amener le
                          projet.
                        </Typography>
                      }
                    >
                      <Info color="action" />
                    </Tooltip>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            {/* Client's Website */}
            <Controller
              name="ClientWebsite"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Site internet" fullWidth />
              )}
            />

            {/* Graphical Elements */}
            <Box>
              <Stack gap={2}>
                <Typography variant="h4" className="c-form__title">
                  Éléments graphiques
                </Typography>
                <Typography variant="body1">
                  Ajoutez ici les éléments graphiques que vous avez déjà pour
                  votre projet/entreprise. Cela pourrait inclure des logos, des
                  images, des illustrations, etc.
                </Typography>
                {graphicalElements.map((_, index) => (
                  <GraphicalElement
                    key={index}
                    index={index}
                    control={control}
                    graphicElement={graphicalElements}
                    onDelete={(idx) => {
                      const updatedgraphicalElements = [...graphicalElements];
                      updatedgraphicalElements.splice(idx, 1);
                      setGraphicalElements(updatedgraphicalElements);
                    }}
                    updateFileUrl={updateFileUrl}
                  />
                ))}
                <Button
                  variant="outlined"
                  onClick={() => {
                    setGraphicalElements([
                      ...graphicalElements,
                      {
                        Title: "",
                        File: "",
                      },
                    ]);
                  }}
                  style={{ marginTop: "10px" }}
                >
                  Ajouter un nouvel élément graphique
                </Button>
              </Stack>
            </Box>
            <Button variant="contained" type="submit">
              Sauver
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectComponent;
