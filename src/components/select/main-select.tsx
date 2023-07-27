import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MainSelect = ({
  items,
  selectedItem = 0,
  setSelectedItem,
  title,
  width = "100%",
}: {
  items: {
    id: any;
    name: string;
  }[];
  selectedItem: number | null;
  setSelectedItem: any;
  title: string;
  width?: number | string
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedItem>) => {
    const {
      target: { value },
    } = event;
    setSelectedItem(value);
  };
  return (
    <FormControl color="secondary" sx={{ m: 1, width: width, margin:0 }}>
      <InputLabel color="secondary">{title}</InputLabel>
      <Select
        value={selectedItem === null ? 0 : selectedItem}
        onChange={handleChange}
        input={<OutlinedInput value="1" color="secondary" label={title} />}
        MenuProps={MenuProps}
        color="secondary"
        displayEmpty
        defaultValue={0}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MainSelect;
