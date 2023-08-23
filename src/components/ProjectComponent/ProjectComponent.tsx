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

//Components imports
import GraphicalElement from "./components/GraphicalElement";

export type ProjectData = {
  projectType?: string[]; 
  missionDescription?: string;
  optimalDate?: string;
  limitDate?: string;
  clientWebsite?: string;
  clientLogo?: FileList;
  [key: string]: unknown;
};

const ProjectComponent: React.FC = () => {
  
  const { control, handleSubmit, watch } = useForm<ProjectData>({
    defaultValues: {
      projectType: [],
    },
  });

  const [graphicElements, setGraphicElements] = useState([
    { title: "", file: null },
  ]);

  const addNewGraphicElement = () => {
    setGraphicElements([...graphicElements, { title: "", file: null }]);
  };

  const removeGraphicElement = (index: number) => {
    const updatedElements = graphicElements.filter((_, i) => i !== index);
    setGraphicElements(updatedElements);
  };

  const [otherProjectType, setOtherProjectType] = useState("");
  const projectTypes = watch("projectType");

  //Save to Airtable
  const { saveToAirtable } = useSaveToAirtable('/project');
  
  const onSubmit = (data: ProjectData) => {  
    saveToAirtable("Projects", data);
  };

  return (
    <Box className="c-pagesection">
      <Box className="l-container l-container--small">
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          gap={4}
        >
          <Stack
            gap={4}
          >
            <Stack gap={2}>
              <Typography variant="h4" className="c-form__title">
                Details sur le projet
              </Typography>
              {/* Type of Project */}
              <FormControl>
                <InputLabel>Type du projet</InputLabel>
                <Controller
                  name="projectType"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} multiple>
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
                  <Box>
                    <TextField
                      label="Précisez autre type"
                      value={otherProjectType}
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
                    name="missionDescription"
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
                        name="optimalDate"
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
                        name="limitDate"
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
              name="clientWebsite"
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
                  Ajoutez ici les éléments graphiques que vous avez déjà pour votre projet/entreprise. Cela pourrait inclure des
                  logos, des images, des illustrations, etc.
                </Typography>
                {graphicElements.map((_, index) => (
                  <GraphicalElement
                    key={index}
                    index={index}
                    control={control}
                    removeGraphicElement={() => removeGraphicElement(index)}
                  />
                ))}
                <Button
                  variant="outlined"
                  onClick={addNewGraphicElement}
                  style={{ marginTop: "10px" }}
                >
                  Ajouter un nouvel élément graphique
                </Button>
              </Stack>
            </Box>
            <Button variant="contained" type="submit">Sauver</Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectComponent;
