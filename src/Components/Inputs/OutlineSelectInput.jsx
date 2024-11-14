import {Controller} from "react-hook-form";
import {MenuItem, TextField} from "@mui/material";

const OutlineSelectInput = ({name, control, label, defaultValue, rules, disable = false, options})=>{
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({
                         field: { onChange, value },
                         fieldState: { error },
                         formState,
                     }) => (
                <TextField
                    helperText={error ? error.message : null}
                    select
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value ?? ""}
                    fullWidth
                    label={label}
                    variant="outlined"
                    disabled={disable}
                    margin={"dense"}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    )
}
export default OutlineSelectInput