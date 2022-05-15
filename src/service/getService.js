const axios = require("axios");


const getService = async (id) => {

    const ENDPOINT = `https://api.mercadopago.com/v1/payments/${id}`;

    try {
        const payment = await axios.get(ENDPOINT, 
          {headers:{
            'Content-Type': 'application/json',     
            Authorization: 'Bearer APP_USR-5953966560535637-041400-24c944a1520b7ea47a758a04944fb8ee-1106746310'
          }},
        )
        return payment.data

    } catch (error) {
        
    }
}

module.exports = getService;