import styled from 'styled-components';

export const Image = styled.div`
	width: 100%;
	height: 100%;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center center;
	background-image: url(${props => props.image});
`;
