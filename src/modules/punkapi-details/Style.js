import styled from 'styled-components';
import media from 'styled-media-query';

export const Image = styled.div`
	width: 100%;
	height: 100vh;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center center;
	background-image: url(${props => props.image});
	${media.lessThan('medium')`
        width: 320px;
        height: 250px;
  `}
`;
