import { useSelector } from "react-redux";
import type { RootState } from "../../../appRedux/store";

const useAppSideBar = () => {
  const { width } = useSelector(({ common }: RootState) => common);

  return { width };
};

export default useAppSideBar;
