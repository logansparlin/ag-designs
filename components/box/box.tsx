import styled from 'styled-components';
import { 
    border,
    BorderProps,
    color,
    ColorProps,
    flexbox,
    FlexboxProps,
    grid,
    GridProps,
    layout,
    LayoutProps,
    position,
    PositionProps,
    shadow,
    ShadowProps,
    space,
    SpaceProps,
    typography,
    TypographyProps,
    compose 
} from 'styled-system';

type Props = BorderProps
    & ColorProps
    & FlexboxProps  
    & GridProps
    & LayoutProps
    & PositionProps
    & ShadowProps
    & SpaceProps
    & TypographyProps;

const system = compose(
    border,
    color,
    flexbox,
    grid,
    layout,
    position,
    shadow,
    space,
    typography,
    compose
);

const Box = styled.div<Props>`
    ${system};
    text-transform: ${(props) => props.textTransform};
    cursor: ${(props) => props.cursor};
    transform: ${(props) => props.transform};
`;

export default Box;