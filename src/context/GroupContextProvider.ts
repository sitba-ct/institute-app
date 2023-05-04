import IGroup from "../services/group/IGroup";
import { createContext } from "react";

export const GroupContext = createContext<GroupContextType>(undefined!);

export type GroupContextType = {
  group: IGroup;
  setGroup: (value: IGroup) => void;
};
