// React Imports
import React, { useState } from "react";
import { useForm, Controller, Control, FieldValues } from "react-hook-form";
// MUI imports
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import "react-phone-input-2/lib/material.css";
// Company data context imports
import { useCompanyDataContext } from '../../context/CompanyDataContext';
//Components imports
import ContactFormComponent from "./components/ContactFormComponent";
//Hooks imports
import { useGoToPage } from "../hooks/useGoToPage";
//Services imports
import { addRecord } from "../services/airtableService";

interface Contact {
  ClientForename: string;
  ClientName: string;
  Email: string;
  Phone: string;
}

interface CompanyData {
  CompanyName: string;
  ShortDescription: string;
  TvaNumber: string;
  Address: string;
  contacts: Contact[];
}

const IntroComponent: React.FC = () => {
  
  const defaultContact: Contact = {
    ClientForename: "",
    ClientName: "",
    Email: "",
    Phone: "",
  };

  const { control, handleSubmit } = useForm<CompanyData>({
    defaultValues: {
      CompanyName: "",
      ShortDescription: "",
      TvaNumber: "",
      Address: "",
      contacts: [defaultContact],
    },
  });

  const [contacts, setContacts] = useState<Contact[]>([defaultContact]);
  const { goToPage } = useGoToPage("/project");

  const { updateCompanyData } = useCompanyDataContext()

  const onSubmit = async (data: CompanyData) => {
    const companyData = {
      CompanyName: data.CompanyName,
      ShortDescription: data.ShortDescription,
      TvaNumber: data.TvaNumber,
      Address: data.Address,
    };

    const companyResponse = await addRecord("Companies", companyData);
    console.log("Company saved:", companyResponse);

    const companyId = companyResponse.id;

    for (const contact of data.contacts) {
      const contactData = {
        ClientForename: contact.ClientForename,
        ClientName: contact.ClientName,
        Email: contact.Email,
        Phone: contact.Phone,
        Company: [companyId],
      };
      const contactResponse = await addRecord("Contacts", contactData);
      console.log("Contact saved:", contactResponse);

      updateCompanyData({
        CompanyName: data.CompanyName,
        ShortDescription: data.ShortDescription,
        TvaNumber: data.TvaNumber,
        Address: data.Address,
        contacts: data.contacts,
        CompanyId: companyId,
      });
    }
    goToPage();
  };

  return (
    <Box className="c-pagesection">
      <Box className="l-container l-container--small">
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} gap={4}>
          <Stack gap={4}>
            <Stack gap={2}>
              <Typography variant="h4" className="c-form__title">
                Details sur l'entreprise
              </Typography>
              <Controller
                name="CompanyName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Nom de l'entreprise" required />
                )}
              />
              <Controller
                name="ShortDescription"
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
                name="TvaNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Numéro de TVA" />
                )}
              />
              <Controller
                name="Address"
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
            </Stack>
            <Stack gap={2}>
              <Typography variant="h4" className="c-form__title">
                Personne de contact
              </Typography>
              {contacts.map((contact, index) => (
                <ContactFormComponent
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  control={control as unknown as Control<FieldValues, any>}
                  contact={contact}
                  index={index}
                  key={index}
                  onDelete={() => {
                    const updatedContacts = [...contacts];
                    updatedContacts.splice(index, 1);
                    setContacts(updatedContacts);
                  }}
                  contactsLength={contacts.length}
                />
              ))}
              <Button
                variant="outlined"
                onClick={() => {
                  setContacts([
                    ...contacts,
                    {
                      ClientForename: "",
                      ClientName: "",
                      Email: "",
                      Phone: "",
                    },
                  ]);
                }}
              >
                Ajouter un autre contact
              </Button>
            </Stack>
            <Button variant="contained" type="submit">
              Sauver les informations
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default IntroComponent;
