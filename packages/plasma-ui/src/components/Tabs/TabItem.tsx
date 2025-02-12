import React, { FC, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { TabItem as BaseTabItem, button2, buttonFocused } from '@sberdevices/plasma-core';
import type { TabItemProps as BaseTabItemProps, AsProps } from '@sberdevices/plasma-core';

import { useTabsAnimationContext } from './TabsAnimationContext';
import { StyledSlider, activeItemStyle } from './TabsSlider';

export interface TabItemProps extends AsProps, BaseTabItemProps {
    animated?: boolean;
}

/**
 * Элемент списка, недопустимо импользовать вне компонента Tabs.
 */
export const StyledTabItem = styled(BaseTabItem)<TabItemProps>`
    ${button2};

    position: relative;

    /**
    * Определенные на компоненте Tabs css vars испольуем тут,
    * потому что у айтемов нет свойства size,
    * чтобы не приходилось передавать кучу пропсов
    * на компонентах контейнере (Tabs) и элементах (TabItem).
    */
    height: var(--tab-item-height);
    padding: var(--tab-item-padding-y) var(--tab-item-padding-x);

    border-radius: var(--tab-item-border-radius);
    transition: background-color 0.3s ease-in-out, transform 0.1s ease-in-out;

    /**
    * При нажатии слайдер также прожимается
    */
    &:active ~ ${StyledSlider} {
        transform: scale(0.96);
    }

    /**
    * Если анимация отключена
    */
    ${({ animated, isActive }) =>
        !animated &&
        isActive &&
        css`
            ${activeItemStyle}
        `}

    &::before {
        content: '';

        position: absolute;
        top: -0.125rem;
        left: -0.125rem;
        right: -0.125rem;
        bottom: -0.125rem;

        display: block;
        box-sizing: content-box;

        border: 0.125rem solid transparent;
        border-radius: var(--tab-item-outline-radius);

        transition: box-shadow 0.2s ease-in-out;

        pointer-events: none;
    }

    &.focus-visible,
    &[data-focus-visible-added] {
        &::before {
            box-shadow: 0 0 0 0.125rem ${buttonFocused};
        }
    }
`;

/**
 * Элемент списка вкладок, недопустимо импользовать вне компонента Tabs.
 */
export const TabItem: FC<TabItemProps> = (props) => {
    const ref = useRef<HTMLElement>(null);
    const { refs } = useTabsAnimationContext();

    useEffect(() => {
        refs?.register(ref);
        return () => refs?.unregister(ref);
    }, [refs]);

    return <StyledTabItem ref={ref} {...props} />;
};
