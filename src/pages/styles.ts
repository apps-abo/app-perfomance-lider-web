import styled from '@emotion/styled';

export const MainPage = styled.div`
	background-attachment: fixed;
	background-color: #e5e5e5;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`;

export const DivImage = styled.div`
	background-image: url('images/login-back.png');
	width: 60.88%;
	height: 90vh;
	background-size: cover;
	background-position: center;
	border-radius: 13px;
	margin: 30px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const Card = styled.div`
	width: 39%;
	height: 100vh;
	padding: 2.5%;
	background-attachment: fixed;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const FlexWrap = styled.div`
	flex: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
`;
export const TextDev = styled.div`
	p {
		font-family: 'Roboto';
		font-size: 12px;
		opacity: 0.7;
	}
	display: flex;
	align-items: flex-end;
	justify-content: center;
`;

export const DivIcone = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	margin-top: 30%;
`;

export const DivOpl = styled.div<{ selected: boolean }>`
	margin-right: 15px;
	border-radius: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	filter: ${props => (props.selected ? 'blur(5px)' : 'blur(0)')};
`;

export const DivLider = styled(DivOpl)`
	margin-right: 0px;
	margin-left: 15px;
`;
