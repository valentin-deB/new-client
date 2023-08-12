import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { TextField, Box, Button } from '@mui/material';
import PhoneInput from "react-phone-input-2";

interface ContactFormProps {
  control: UseFormReturn['control'];
  contact: { clientForename: string; clientName: string; email: string; phone: string };
  index: number;
  onDelete: (index: number) => void;
  contactsLength: number;
}

const ContactFormComponent: React.FC<ContactFormProps> = ({ control, contact, index, onDelete, contactsLength }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="row" gap={1}>
        <Controller
          name={`contacts[${index}].clientForename`}
          control={control}
          defaultValue={contact.clientForename}
          render={({ field }) => (
            <TextField {...field} label="Prénom" required />
          )}
        />
        <Controller
          name={`contacts[${index}].clientName`}
          control={control}
          defaultValue={contact.clientName}
          render={({ field }) => (
            <TextField {...field} label="Nom" required />
          )}
        />
      </Box>
      <PhoneInput
        containerClass="c-form__phone"
        country={"be"}
        value={contact.phone}
        inputProps={{
            required: true,
          }}
      />
      <Controller
        name={`contacts[${index}].email`}
        control={control}
        defaultValue={contact.email}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email du contact"
            required
            type="email"
          />
        )}
      />
      {contactsLength > 1 && (
        <Button
          onClick={() => onDelete(index)}
        >
          Supprimer le contact
        </Button>
      )}
    </Box>
  );
};

export default ContactFormComponent;
