import { createSlice } from '@reduxjs/toolkit';

export const informationSlice = createSlice({
    name: 'information',
    initialState: {
        user_id: null,
        user_Name: '',
        email: '',
        password: '',
        token: '',
        role_id: null
    },
    reducers: {
        setInformation: (state, action) => {
            const { user_id, user_Name, email, password, token, role_id } = action.payload;
            state.user_id = user_id;
            state.user_Name = user_Name;
            state.email = email;
            state.password = password;
            state.token = token;
            state.role_id = role_id;
        },
        clearInformation: (state) => {
            state.user_id = null;
            state.user_Name = '';
            state.email = '';
            state.password = '';
            state.token = '';
            state.role_id = null;
        }
    }
});

export const { setInformation, clearInformation } = informationSlice.actions;
export default informationSlice.reducer;
