import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    data: [],
    id: "",
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            console.log(action.payload)
        },
        deleteExpense(state, action) {
            console.log(action.payload)
            state.id = action.payload
        },
        updateExpense() {},
    }
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;