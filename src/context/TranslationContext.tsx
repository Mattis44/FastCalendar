import { createContext, useContext } from "react";
import { Translations } from "../types/translations";

export const TranslationContext = createContext<Partial<Translations>>({});

export const useTranslationContext = () => useContext(TranslationContext);
