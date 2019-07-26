import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
});

// Create Document Component
const MyDocument = () => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Section #1</Text>
			</View>
			<View style={styles.section}>
				<Text>Section #2</Text>
			</View>
		</Page>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Page 2</Text>
			</View>
			<View style={styles.section}>
				<Text>Section #2</Text>
			</View>
		</Page>
	</Document>
);

class ReduxEjemplo extends React.Component {
	state = { url: null };

	onRender = ({ blob }) => {
		this.setState({ url: URL.createObjectURL(blob) });
	};

	render() {
		return (
			<div>
				Download your PDF here:
				<PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
					{({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download!')}
				</PDFDownloadLink>
			</div>
		);
	}
}

export default ReduxEjemplo;
