import { configureStore } from "@reduxjs/toolkit";
import trainer from './slice/trainer.slice'

export default configureStore({
  reducer: {
      trainer    
  }
})