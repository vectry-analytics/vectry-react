import { IContextProvider } from "@vectry/js-core";

export const DefaultContextProvider = async (): Promise<IContextProvider> => {
  return {
    veripass_username: "system",
    app_id: "react-app",
    session_id: `sess-${Date.now().toString(36)}`,
  };
};
