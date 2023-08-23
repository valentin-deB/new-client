import { useNavigate } from "react-router-dom";

export const useGoToPage = (nextRoute: string) => {
  const navigate = useNavigate();

  const goToPage = () => {
    navigate(nextRoute);
  };

  return { goToPage };
};