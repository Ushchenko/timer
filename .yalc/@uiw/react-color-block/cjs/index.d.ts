import React from 'react';
import { type HsvaColor, type ColorResult } from '@uiw/color-convert';
export interface BlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'color'> {
    prefixCls?: string;
    showTriangle?: boolean;
    showMainBlock?: boolean;
    flexCenter?: boolean;
    showSmallBlock?: boolean;
    color?: string | HsvaColor;
    colors?: string[];
    widthBlock?: string | number;
    inputWidth?: string | number;
    swatchStyle?: React.HTMLAttributes<HTMLDivElement>;
    onChange?: (color: ColorResult, env?: React.SyntheticEvent<HTMLElement>) => void;
}
declare const Block: React.ForwardRefExoticComponent<BlockProps & React.RefAttributes<HTMLDivElement>>;
export default Block;
