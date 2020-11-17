/**
 * Пропсы для отрицательного сдвига компонента
 * вправо и влево на величину его паддинга.
 */
export interface ShiftProps {
    /**
     * Отрицательный сдвиг влево на величину, равную паддингу компонента
     */
    shiftLeft?: boolean;
    /**
     * Отрицательный сдвиг вправо на величину, равную паддингу компонента
     */
    shiftRight?: boolean;
}
