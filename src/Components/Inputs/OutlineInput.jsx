import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";

const OutlineInput = ({name, control, label, defaultValue, rules, disable, inputType = "text"})=>{
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({
                         field: { onChange, value },
                         fieldState: { error },
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
                    disabled={disable}
                    margin={"dense"}
                    type={inputType}
                />
            )}
        />
    )
}
export default OutlineInput