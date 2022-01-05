export * from "./theme";
export * from "./context";

export const encodeRoute = (data: string) => {
  return data.replace(/\//g, "=");
};

export const decodeRoute = (enco: string) => {
  return enco.replace(/=/g, "/");
};
