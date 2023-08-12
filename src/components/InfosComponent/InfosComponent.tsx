import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import "react-phone-input-2/lib/material.css";

import ContactFormComponent from "./ContactFormComponent/ContactFormComponent";

const InfosBasicComponent: React.FC = () => {
    const { control, handleSubmit } = useForm();
    const [contacts, setContacts] = useState([
      { clientForename: "", clientName: "", email: "", phone: "" },
    ]);
  
    const onSubmit = (data: unknown) => {
      console.log(data);
    };
  

  return (
    <div className="l-container">
      <form className="c-form" onSubmit={handleSubmit(onSubmit)}>
        <Box
          className="c-form__layout"
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <h2 className="c-form__title">Details sur l'entreprise</h2>
            <Controller
              name="companyName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Nom de l'entreprise" required />
              )}
            />
            <Controller
              name="shortDescription"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description courte de vôtre activité"
                  required
                  multiline
                  rows={3}
                />
              )}
            />
            <Controller
              name="tvaNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Numéro de TVA" />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Adresse de l'entreprise"
                  required
                />
              )}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <h2>Client Contact</h2>
            {contacts.map((contact, index) => (
              <ContactFormComponent
                control={control}
                contact={contact}
                index={index}
                key={index}
                onDelete={(idx) => {
                  const updatedContacts = [...contacts];
                  updatedContacts.splice(idx, 1);
                  setContacts(updatedContacts);
                }}
                contactsLength={contacts.length}
              />
            ))}
            <Button
              onClick={() => {
                setContacts([
                  ...contacts,
                  { clientForename: "", clientName: "", email: "", phone: "" },
                ]);
              }}
            >
              Ajouter un autre contact
            </Button>
          </Box>
          <Button type="submit">Sauver</Button>
        </Box>
      </form>
    </div>
  );
};

export default InfosBasicComponent;
