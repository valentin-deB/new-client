import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { TextField, Button, Stack } from '@mui/material';
import PhoneInput from "react-phone-input-2";

interface ContactFormProps {
  control: UseFormReturn['control'];
  contact: { ClientForename: string; ClientName: string; Email: string; Phone: string };
  index: number;
  onDelete: (index: number) => void;
  contactsLength: number;
}

const ContactFormComponent: React.FC<ContactFormProps> = ({ control, contact, index, onDelete, contactsLength }) => {
  return (
    <Stack gap={2}>
      <Stack flexDirection="row" gap={1}>
        <Controller
          name={`contacts[${index}].clientForename`}
          control={control}
          defaultValue={contact.ClientForename}
          render={({ field }) => (
            <TextField {...field} label="Prénom" required />
          )}
        />
        <Controller
          name={`contacts[${index}].clientName`}
          control={control}
          defaultValue={contact.ClientName}
          render={({ field }) => (
            <TextField {...field} label="Nom" required />
          )}
        />
      </Stack>
      <PhoneInput
        containerClass="c-form__phone"
        country={"be"}
        value={contact.Phone}
        inputProps={{
            required: true,
          }}
      />
      <Controller
        name={`contacts[${index}].email`}
        control={control}
        defaultValue={contact.Email}
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
    </Stack>
  );
};

export default ContactFormComponent;
