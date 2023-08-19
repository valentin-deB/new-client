import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProjectComponent: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm<{
    projectType: string[];
    missionDescription?: string;
    optimalDate?: string;
    limitDate?: string;
  }>({
    defaultValues: {
      projectType: [],
    },
  });

  const [otherProjectType, setOtherProjectType] = useState("");
  const projectTypes = watch("projectType");

  const onSubmit = (data: unknown) => {
    console.log(data);
    navigate("/infos");
  };

  return (
    <Box className="c-pagesection">
      <Box className="l-container l-container--small">
        <Box
          component="form"
          className="c-form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Box
            className="c-form__layout"
            display="flex"
            flexDirection="column"
            gap={4}
          >
            <Box display="flex" flexDirection="column" gap={2}>
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
                  className="c-tooltip"
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
                style={{fontSize: "14"}}
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
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" flexDirection="row" gap={2}>
                  {/* Optimal Date Field */}
                  <Tooltip
                    style={{fontSize: "14"}}
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
                    style={{fontSize: "14"}}
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
                  <Box display="flex" alignItems="center" marginLeft={2}>
                    <Tooltip
                      title="Avoir ces deux extrêmes permet de mieux évaluer le temps disponible, et donc le niveau de complexité et de précision vers lequel nous pouvons amener le projet."
                      arrow
                    >
                      <Info color="action" />
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Button type="submit">Sauver</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectComponent;
