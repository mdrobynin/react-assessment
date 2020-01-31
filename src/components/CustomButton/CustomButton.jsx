import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    outline: none;
    min-height: 30px;
    min-width: 100px;
    font-size: 16px;
    font-weight: 600;
    background: transparent;
    border-radius: 3px;
    text-transform: uppercase;
    padding: 5px 15px;
    margin: 5px;
    transition: background .1s ease-in;
    cursor: pointer;

    &:active {
        transform: scale(0.95, 0.95);
    }

    ${
        props => {
            const { primary, fontColorLight, hoverColorDark, hoverColorLight } = props.theme;

            switch(props.type) {
                case 'dark': {
                    return `
                        color: ${primary};
                        border: 1px solid ${primary};

                        &:hover {
                            background: ${hoverColorDark};
                        }
                    `;
                }
                case 'light': {
                    return `
                        color: ${fontColorLight};
                        border: 1px solid ${fontColorLight};

                        &:hover {
                            background: ${hoverColorLight};
                        }
                    `;
                }
                default: {
                    return '';
                }
            }
        }
    }
`;

export function CustomButton({ children, onClick = () => {}, theme = 'dark' }) {
    return (
        <StyledButton type={theme} onClick={onClick}>
            { children }
        </StyledButton>
    )
}
