import axios from 'axios';

export const configurationService = {
    postConfiguration,
}

const ENDPOINT = 'http://localhost:6010/wirschiffendas/optionalequipment/analysis';

function postConfiguration(config) {
    let header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    axios.post(ENDPOINT, config, header).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    });
}