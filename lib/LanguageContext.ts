import { createContext } from 'react';
import type { Lang } from './types';

export const LanguageContext = createContext<Lang>(`en`);
