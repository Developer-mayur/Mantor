import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import ThemeSlice from "./ThemeSlice";
import ScrollSlice from "./ScrollSlice";
import sectionReducer from "./SectionSlice"
import authReducer from "./authSlice";  

const store = configureStore({
  reducer: {
    User: UserSlice,
    Theme: ThemeSlice,
    Scroll: ScrollSlice,
    section: sectionReducer, 
    auth: authReducer,  

  },
});

export default store;
