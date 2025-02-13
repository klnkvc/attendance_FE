import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";

const FormInputMultiline = ({name, control, label})=>{
    return (
        <Controller
            name={name}
            control={control}
            render={({
                         field: { onChange, value },
                         fieldState: { error },
                         formState,
                     }) => (
                <TextField
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value ?? ""}
                    fullWidth
                    label={label}
                    variant="outlined"
                    multiline
                    rows={5}
                />
            )}
        />
    )
}

export default FormInputMultiline