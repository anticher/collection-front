import { IAuthState, initialState } from "../auth.slice";

export const setLocalStorageAuthDefault = () => {
  Object.keys(initialState).forEach((key) => localStorage.setItem(key, ""));
};

export const setLocalStorageAuth = (values: IAuthState) => {
  Object.entries(values).forEach(([key, value]) =>
    localStorage.setItem(key, value)
  );
};

export const getLocalStorageUsername = () => {
  localStorage.getItem("username")
}
