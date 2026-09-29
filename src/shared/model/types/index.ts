import type { ComponentType } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type TPagePreloader = () => Promise<{ default: ComponentType }>;
