import {Controller} from "react-hook-form";
import {FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const FormInputPass = ({name, control, label, showPassword, handleClickShowPassword, handleMouseDownPassword, rules}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                         field: { onChange, value },
                         fieldState: { error },
                         formState,
                     }) => (
                <FormControl variant="outlined" fullWidth size="small" error={!!error}>
                    <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
                    <OutlinedInput
                        id={`outlined-adornment-${name}`}
                        type={showPassword ? 'text' : 'password'}
                        onChange={onChange}
                        value={value ?? ""}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={label}
                    />
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
            )}
        />
    )
}


export default FormInputPass