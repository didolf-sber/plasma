import React from 'react';

import { SSRProvider } from '../SSRProvider';
import { actionWithPersistedEvent, ShowcaseComponentGrid, InSpacingDecorator } from '../../helpers';

import { Checkbox } from '.';

export default {
    title: 'Controls/Checkbox',
    component: Checkbox,
    decorators: [InSpacingDecorator],
};

const onChange = actionWithPersistedEvent('onChange');
const onFocus = actionWithPersistedEvent('onFocus');
const onBlur = actionWithPersistedEvent('onBlur');

const labelWithLink = (
    <div>
        Label 5 with <a href="/#">link</a>
    </div>
);

const rows = [
    [
        { name: 'check', value: 1, label: 'Checkbox 1', disabled: false },
        { name: 'check', value: 2, label: 'Checkbox 2', disabled: false },
    ],
    [
        { name: 'check', value: 3, label: 'Checkbox 3', disabled: true },
        { name: 'check', value: 4, label: 'Checkbox 4', disabled: true },
        {
            name: 'check',
            value: 5,
            label: labelWithLink,
        },
    ],
];

const Showcase = ({ render, withLabels = true }) => (
    <ShowcaseComponentGrid>
        <SSRProvider>
            {rows.map((items) =>
                items.map((item, j) => render({ ...item, label: withLabels ? item.label : '' }, `item:${j}`)),
            )}
        </SSRProvider>
    </ShowcaseComponentGrid>
);

/* eslint-disable prefer-rest-params */
export function Default() {
    const [values, setValues] = React.useState([2, 4]);

    return (
        <Showcase
            {...arguments[0]}
            render={(props, key) => (
                <Checkbox
                    key={key}
                    style={{ margin: 0 }}
                    name={props.name}
                    value={props.value}
                    label={props.label}
                    disabled={props.disabled}
                    checked={values.indexOf(props.value) !== -1}
                    onChange={(event) => {
                        setValues(
                            [...values, props.value].filter((val) => event.target.checked || val !== props.value),
                        );
                        onChange(event);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )}
        />
    );
}
/* eslint-enable prefer-rest-params */
