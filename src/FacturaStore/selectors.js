export const revisarCabecera = state => state.getIn(['factura', 'revisarFactura']);
export const checkCorrecto = state => state.getIn(['factura', 'banderaCabecera']);
export const listaDetalleFactura = state => state.getIn(['factura', 'detalleFactura']);
export const Cabecera = state => state.getIn(['factura', 'cabeceraFactura']);
