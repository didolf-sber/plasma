import React from 'react';
import styled, { css } from 'styled-components';
import { buttonAccent, accent, buttonWarning, whitePrimary, blackSecondary } from '@sberdevices/plasma-tokens';

export const uiColor = {
    active: buttonAccent,
    highlight: accent,
    blank: whitePrimary,
    accent: buttonWarning,
    index: blackSecondary,
};

const sizeMap = {
    s: 40,
    m: 56,
    l: 72,
};

type ActionButtonSize = keyof typeof sizeMap;
type ActionButtonColor = keyof typeof uiColor;

export interface ActionButtonProps {
    size?: ActionButtonSize;
    onClick?: (event: React.SyntheticEvent<HTMLSpanElement>) => void;
    className?: string;
    color?: ActionButtonColor;
}

interface StyledRootProps {
    size: number;
    color: ActionButtonColor;
}

const StyledRoot = styled.span<StyledRootProps>`
    ${({ color, size }) => css`
        align-items: center;
        background-color: ${uiColor[color]};
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        transition: opacity 0.2s ease-in-out;
        border-radius: 50%;
        border: none;
        height: ${size}px;
        width: ${size}px;
    `}
`;

export const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    className,
    onClick,
    size = 'm',
    color = 'active',
}) => {
    return (
        <StyledRoot onClick={onClick} className={className} size={sizeMap[size]} color={color}>
            {children}
        </StyledRoot>
    );
};
