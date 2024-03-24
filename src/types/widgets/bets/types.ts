import { ReactNode } from "react";

export type checkedComponentType = Record<'all' | 'my' | 'top', { component: ReactNode }>

export type OptionsType = {
    name: string;
    text: string;
    isActive: boolean;
};

export type BetType = {
    name: string,
    sum: number,
    bet: number,
    isWin: boolean,
    color: string,
}