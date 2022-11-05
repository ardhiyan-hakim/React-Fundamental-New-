import { BASE_URL } from "../constant";

export const getRoute = (path) => {
  return `${BASE_URL}/${path}`;
};
