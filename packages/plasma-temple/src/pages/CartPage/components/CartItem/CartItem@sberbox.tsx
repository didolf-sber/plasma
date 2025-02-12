import React from 'react';
import styled from 'styled-components';
import { Body1, Footnote1, TextBox, Row, Col } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import {
    CartItemProps,
    imageContainerMixin,
    Present,
    priceMixin,
    QuantityButton,
    titleMixin,
    Price,
    StyledImage,
} from './CartItem@common';

const StyledTitleContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`;

const StyledRow = styled(Row)`
    margin-bottom: 0.5rem;
    align-items: center;
`;

const StyledLeftCol = styled(Col)`
    display: flex;
    align-items: center;
`;

const StyledTitle = styled(Body1)`
    ${titleMixin}
`;

const StyledPriceContainer = styled(Footnote1)`
    ${priceMixin};
`;

const StyledImageContainer = styled.div<{ backgroundColor?: string }>`
    ${imageContainerMixin({ padding: 0.4 })}

    min-width: 3.75rem;
    height: 3.75rem;
    margin-right: 1rem;
`;

const StyledNameDetails = styled.span`
    margin-left: 6px;
    color: ${secondary};
`;

export const CartItemSberBox: React.FC<CartItemProps> = ({
    item,
    currency,
    imageBackgroundColor,
    onItemClick,
    ...props
}) => {
    const { id, name, price, nameDetails, quantity, imageSrc = '', present } = item;

    const clickHandler = React.useCallback(() => onItemClick?.(item), [onItemClick, item]);

    return (
        <StyledRow data-cy="CartItem">
            <StyledLeftCol sizeXL={8}>
                <StyledImageContainer backgroundColor={imageBackgroundColor} onClick={clickHandler}>
                    <StyledImage imageSrc={imageSrc} />
                </StyledImageContainer>
                <TextBox>
                    <StyledTitleContainer>
                        <StyledTitle>{name}</StyledTitle>
                        <StyledNameDetails>{nameDetails}</StyledNameDetails>
                    </StyledTitleContainer>
                    <StyledPriceContainer>
                        <Price price={price} currency={currency} present={present} />
                    </StyledPriceContainer>
                </TextBox>
            </StyledLeftCol>
            <Col sizeXL={4}>{present ? <Present /> : <QuantityButton id={id} quantity={quantity} {...props} />}</Col>
        </StyledRow>
    );
};
