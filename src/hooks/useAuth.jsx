import { useContext } from "react";
import { AdminContext } from "./AdminContext";

export function useAuth() {
  return useContext(AdminContext);
}

export default useAuth;
