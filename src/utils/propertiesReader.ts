import PropertiesReader from 'properties-reader';

const warehouseProperties = PropertiesReader('./src/testData/warehouse.properties');
const procurementProperties = PropertiesReader('./src/testData/procurement.properties');
const uocProperties = PropertiesReader('./src/testData/uoc.properties');

export const warehouseData = {
    name: warehouseProperties.get('warehouse.name') as string,
    description: warehouseProperties.get('warehouse.description') as string,
    active: warehouseProperties.get('warehouse.active') === 'true',
};
export const procurementData = {
    name: procurementProperties.get('procurement.name') as string,
    description: procurementProperties.get('procurement.description') as string,
    active: procurementProperties.get('procurement.active') === 'true',
};
export const uocData = {
    name: uocProperties.get('uoc.name') as string,
    description: uocProperties.get('uoc.description') as string,
    remarks: uocProperties.get('uoc.remarks') as string,
    active: uocProperties.get('uoc.active') === 'true',
};

