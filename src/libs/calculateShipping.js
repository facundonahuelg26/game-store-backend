const calculateShipping = (shippingState) => {
    let shippingCost;
    switch(shippingState){
      case 'Cordoba':
      case 'Entre Ríos':
      case 'Santiago del Estero':
      case 'Chaco':
      case 'Corrientes':
      case 'Santa Fe':
        shippingCost = 1600;
      break;
      case 'Catamarca':
      case 'Ciudad Autónoma de Buenos Aires':
      case 'Buenos Aires':
      case 'San Luis':
      case 'San Juan':
      case 'La Rioja':
      case 'Tucumán':
      case 'La Pampa':
        shippingCost = 2450;
      break;
      case 'Chubut':
      case 'Río Negro':
      case 'Neuquén':
      case 'Mendoza':
        shippingCost = 3200;
      break;
      case 'Jujuy':
      case 'Salta':
      case 'Formosa':
      case 'Misiones':
      case 'Tierra del Fuego, Antártida e Islas del Atlántico Sur':
      case 'Santa Cruz':
        shippingCost = 3900;
      break;
      default:
        shippingCost = 600;
      break;
    }
    return shippingCost;
}

module.exports = calculateShipping;