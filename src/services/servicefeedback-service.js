import axios from 'axios';

export const serviceFeedbackService = {
    listenForFeedback,
}

const ENDPOINT = 'http://localhost:6010/wirschiffendas/optionalequipment/servicefeedback';

function listenForFeedback() {
    return axios.get(ENDPOINT).then(res => {
        return res.data;
    }).catch(e => {
        return e;
    });
}