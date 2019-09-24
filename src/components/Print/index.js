import React from 'react';
import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import api from '../../api';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

export default function CustomizedMenus(Props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	function callApiPDF() {
		api.get(`${Props.ruta}`, { responseType: 'blob' }).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${Props.titulo}.pdf`);
			document.body.appendChild(link);
			link.click();
		});
	}

	function callApiCSV() {
		api.get(`${Props.csv}`, { responseType: 'blob' }).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${Props.titulo}.csv`);
			document.body.appendChild(link);
			link.click();
		});
	}

	return (
		<div>
			<Fab color="secondary" aria-label="Add" onClick={handleClick}>
				PRINT
			</Fab>
			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem>
					<ListItemText
						primary="PDF"
						onClick={() => {
							callApiPDF();
						}}
					/>
				</StyledMenuItem>
				<StyledMenuItem>
					<ListItemText
						primary="CSV"
						onClick={() => {
							callApiCSV();
						}}
					/>
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}
