import {Controller} from "react-hook-form";
import {InputAdornment, TextField} from "@mui/material";
import {AttachFile} from "@mui/icons-material";

const FormInputFile =({ name, control, label })=>{
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref, ...rest } }) => (
                <TextField
                    margin={"dense"}
                    type="file"
                    inputRef={ref}
                    onChange={(event) => {
                        const file = event.target.files[0];
                        onChange(file); // Pass the file object to React Hook Form
                    }}
                    onBlur={onBlur}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachFile />
                            </InputAdornment>
                        ),
                    }}
                    label={label}
                    variant="outlined"
                    fullWidth
                    {...rest}
                />
            )}
        />
    )
}

export default FormInputFile