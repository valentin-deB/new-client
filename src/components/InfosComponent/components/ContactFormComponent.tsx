//React imports
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
// MUI imports
import { TextField, Button, Stack } from '@mui/material';
import PhoneInput from "react-phone-input-2";
import DeleteIcon from '@mui/icons-material/Delete';


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
          name={`contacts[${index}].ClientForename`}
          control={control}
          defaultValue={contact.ClientForename}
          render={({ field }) => (
            <TextField {...field} label="Prénom" required />
          )}
        />
        <Controller
          name={`contacts[${index}].ClientName`}
          control={control}
          defaultValue={contact.ClientName}
          render={({ field }) => (
            <TextField {...field} label="Nom" required />
          )}
        />
      </Stack>
      <Controller
        name={`contacts[${index}].Phone`}
        control={control}
        defaultValue={contact.Phone}
        render={({ field }) => (
          <PhoneInput
            containerClass="c-form__phone"
            country={"be"}
            value={field.value}
            onChange={value => field.onChange(value)}
            inputProps={{
              required: true,
            }}
          />
        )}
      />
      <Controller
        name={`contacts[${index}].Email`}
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
        //ToDo: adapt on delete based on the project graphical component
          onClick={() => onDelete(index)}
        >
          <DeleteIcon />
        </Button>
      )}
    </Stack>
  );
};

export default ContactFormComponent;
