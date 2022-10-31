import { useSnackbar } from "notistack";
import { useEffect } from "react";

export function useErrorSnack(isError: boolean, message: string) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [isError, message, enqueueSnackbar]);
}
