import styled from 'styled-components';

export const Root = styled.div`
	display: flex;
`;

export const Content = styled(Root)`
	margin: 10px;
	width: 100%;
`;

export const MainContent = styled.main`
	margin-top: 75px;
	width: 100%;
`;

export const TableContainer = styled.div`
	table,
	th,
	td {
		border: none;
	}

	table {
		width: 100%;
		display: table;
		border-collapse: collapse;
		border-spacing: 0;

		&.striped {
			tr {
				border-bottom: none;
			}

			> tbody {
				> tr:nth-child(odd) {
					background-color: rgba(242, 242, 242, 0.5);
				}

				> tr > td {
					border-radius: 0;
				}
			}
		}

		&.highlight > tbody > tr {
			transition: background-color 0.25s ease;
			&:hover {
				background-color: rgba(242, 242, 242, 0.5);
			}
		}

		&.centered {
			thead tr th,
			tbody tr td {
				text-align: center;
			}
		}
	}

	tr {
		border-bottom: 1px solid rgba(0, 0, 0, 0.12);
	}

	td,
	th {
		padding: 15px 5px;
		display: table-cell;
		text-align: left;
		vertical-align: middle;
		border-radius: 2px;
	}
`;
