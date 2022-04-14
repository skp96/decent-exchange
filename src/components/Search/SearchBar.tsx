import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Coin } from '../interfaces';

export const SearchBar: React.FC<{ coins: Coin[]; }> = ({ coins }) => {
    return (
        <Stack spacing={2} sx={{ width: 300 }} >
            <Autocomplete
                freeSolo={true}
                id="coin-search"
                data-testid="autocomplete-search"
                options={coins}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                    />
                )}
            />
        </Stack>
    );
};
