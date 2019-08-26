export const revisarCabecera = state => state.getIn(['factura', 'revisarFactura']);
export const checkCorrecto = state => state.getIn(['factura', 'banderaCabecera']);
export const listaDetalleFactura = state => state.getIn(['factura', 'detalleFactura']);
