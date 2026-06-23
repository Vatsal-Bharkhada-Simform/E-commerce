import { createContext } from "react";
import type { FilterContextType } from "../types/contextTypes";

export const FilterContext = createContext<FilterContextType | null>(null);
