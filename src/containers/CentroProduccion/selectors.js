export const dataFactura = state => state.getIn(['facturaInformacion', 'data']);
export const dataProduccion = state => state.getIn(['facturaInformacion', 'dataProduccion']);
export const dataDetalleProduccion = state => state.getIn(['facturaInformacion', 'detalleProduccion']);
export const stateModal = state => state.getIn(['facturaInformacion', 'activateModal']);
export const stateToast = state => state.getIn(['facturaInformacion', 'activateToast']);
