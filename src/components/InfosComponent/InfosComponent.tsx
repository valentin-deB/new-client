import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';



const InfosBasicComponent: React.FC = () => {
    const { control, handleSubmit, watch } = useForm();
    const isSameContact = watch("isSameContact", false);

    const onSubmit = (data: unknown) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Company Details</h2>
            <Controller
                name="companyName"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Company Name" required />}
            />
            <Controller
                name="shortDescription"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Short Description" required />}
            />

            <Controller
                name="companyPhoneNumber"
                control={control}
                render={({ field }) => <PhoneInput {...field} defaultCountry="BE" />}
            />

            <h2>Client Contact</h2>
            <Controller
                name="clientName"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Client Name" required />}
            />
            {/* ... other client details ... */}

            <FormControlLabel
                control={
                    <Controller
                        name="isSameContact"
                        control={control}
                        render={({ field }) => <Switch {...field} />}
                    />
                }
                label="Use the same contact as factuation"
            />

            {!isSameContact && (
                <>
                    {/* Form fields for different contact details */}
                </>
            )}

            <Button type="submit">Submit</Button>
        </form>
    );
};

export default InfosBasicComponent;
