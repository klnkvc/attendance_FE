import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Controller} from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {CloseOutlined} from "@mui/icons-material";
import dayjs from "dayjs";

const FormInputDate = ({name, control, label, rules})=>{
    const tomorrow = dayjs().add(1, 'day');
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value },
                             fieldState: { error },
                             formState, }) => (
                    <DatePicker
                        value={value??null}
                        onChange={onChange}
                        label={label}
                        disablePast
                        // minDate={tomorrow}
                        sx={{
                            width: '100%', // Make the input full width
                            '& .MuiInputBase-root': {
                                height: '40px', // Adjust the height as needed
                                display: 'flex',
                                alignItems: 'center', // Vertically center the input content
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '0.875rem', // Adjust font size if needed
                                padding: '8px 14px', // Adjust padding to ensure text fits well
                            },
                        }}
                        slotProps={{
                            textField: {
                                helperText: error ? error.message : null,
                            },
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    );
}

export default FormInputDate