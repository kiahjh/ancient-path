import { createContext } from 'react';
import { Lang } from './types';

export const LanguageContext = createContext<Lang>('en');
