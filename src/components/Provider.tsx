'use client';
import { atomWithStorage } from 'jotai/utils';

export const userTokenAtom = atomWithStorage<any | null>('userToken', null);
export const userDataAtom = atomWithStorage<any | null>('userData', null);
export const sidebarShrinkAtom = atomWithStorage<boolean | null>('sidebarShrink', false);

export default function Provider({ children }: any) {
    return <>{children}</>;
}