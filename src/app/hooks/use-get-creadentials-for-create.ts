import { useAppSelector } from "../app-hooks";

export const useGetCredentialsForCreate = () => {
  const auth = useAppSelector((state) => state.auth);

  const creatorName = auth?.username || "";
  const creatorRole = auth?.role || "";

  return [creatorName, creatorRole];
};
