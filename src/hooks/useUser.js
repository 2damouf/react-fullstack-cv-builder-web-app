import {useQuery} from "react-query";
import { getUserInfo } from "../api";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userInfo = await getUserInfo();
        return userInfo;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnWindowFocus: false }
  );
  return { data, isLoading, isError, refetch };
};

export default useUser;
