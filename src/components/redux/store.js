import { configureStore } from '@reduxjs/toolkit'
import tableReducerFactory from './reducers/table'

export const storeFactory = (defaultColumns, defaultRows) => {
  return configureStore({
    reducer: tableReducerFactory(defaultColumns, defaultRows),
  })
}
