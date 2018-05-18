import utils from './utils';
import axios from 'axios';


export function message(update, type, id, text) {
    return axios.post(`/api/messages/${type}/${id}`, { text })
        .then(({ data: messages }) => {
            update(model => {
                model.organisation[type + 's'].find(group => group.id == id).messages = messages;
                return model;
            });
        })
        .catch(console.log);
}

export function channel(update, organisation_id, name, _private) {
    return axios.post(`/api/channel/${organisation_id}`, { name, _private })
        .then(({ data: channel }) => {
            update(model => {
                if (model.organisation.id === organisation_id) model.organisation.channels.push(channel);
                return model;
            });
        })
        .catch(console.log);
}
