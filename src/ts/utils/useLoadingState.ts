import { useState } from "react";

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return {
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    error,
    setError,
  };
}
