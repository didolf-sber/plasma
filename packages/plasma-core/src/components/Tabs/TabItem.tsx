import React, { forwardRef, useRef, useContext, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { useForkRef } from '../../hooks';
import { applyEllipsis } from '../../mixins';
import { AsProps } from '../../types';

import { TabsContext } from './TabsContext';

interface StyledTabItemProps {
    isActive?: boolean;
    isChildren?: boolean;
    isContentLeft?: boolean;
}

export interface TabItemProps extends AsProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Активность элемента списка
     */
    isActive?: boolean;
    /**
     * Слот для контента слева, например `Icon`
     */
    contentLeft?: React.ReactNode;
}

/**
 * Без этого спана баг - контент (например, иконка)
 * сжимался в угоду текстового контента,
 * при чем ширина иконки игнорируется.
 */
const StyledTabItemContentLeft = styled.span`
    display: flex;
`;

/**
 * Этот спан нужен для сокращения
 * текстового контента и отступов.
 */
const StyledTabItemText = styled.span`
    display: inline;

    ${applyEllipsis}

    /* stylelint-disable-next-line */
    ${StyledTabItemContentLeft} ~ & {
        margin-left: 0.375rem;
    }
`;

export const StyledTabItem = styled.button<StyledTabItemProps>`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    border: 0 none;
    background: none;
    color: inherit;

    letter-spacing: inherit;
    text-align: center;

    cursor: pointer;

    &:focus {
        outline: 0 none;
    }

    /**
    * Не передали контент => квадратная кнопка.
    */
    ${({ isChildren }) =>
        !isChildren &&
        css`
            width: var(--tab-item-height);
            padding-left: 0;
            padding-right: 0;
        `}

    /**
    * Для центрирования иконки, нужно уменьшить вертикальные паддинги.
    */
    ${({ isContentLeft }) =>
        isContentLeft &&
        css`
            padding-top: var(--tab-item-padding-y-reduced);
            padding-bottom: var(--tab-item-padding-y-reduced);
        `}
`;

/**
 * Элемент списка, недопустимо использовать вне компонента Tabs.
 */
// eslint-disable-next-line prefer-arrow-callback
export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(function TabItem(
    { children, contentLeft, isActive, role = 'tab', ...rest },
    outerRef,
) {
    const innerRef = useRef<HTMLButtonElement>(null);
    const ref = useForkRef(outerRef, innerRef);
    const { refs } = useContext(TabsContext);

    useEffect(() => {
        refs?.register(innerRef);
        return () => refs?.unregister(innerRef);
    }, [refs]);

    return (
        <StyledTabItem
            ref={ref}
            isChildren={!!children}
            isContentLeft={!!contentLeft}
            isActive={isActive}
            aria-selected={isActive}
            role={role}
            {...rest}
        >
            {contentLeft && <StyledTabItemContentLeft aria-hidden>{contentLeft}</StyledTabItemContentLeft>}
            {children && <StyledTabItemText tabIndex={-1}>{children}</StyledTabItemText>}
        </StyledTabItem>
    );
});
