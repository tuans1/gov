import { TextField } from "@mui/material";

interface InputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function BaseInput(props: InputProps) {
  return (
    <>
      <TextField
        id="standard-basic"
        label={props.label}
        variant="standard"
        fullWidth
      />
    </>
  );
}
