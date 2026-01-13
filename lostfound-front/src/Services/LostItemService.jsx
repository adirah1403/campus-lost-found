import axios from 'axios';

axios.defaults.withCredentials = true;

const LOST_URL='http://localhost:9595/lostfound/lost';
const ID_URL='http://localhost:9595/lostfound/lost-id';
const USR_URL='http://localhost:9595/lostfound/lost-user';

export const saveLostItem = (lostItem) => axios.post(LOST_URL, lostItem);
export const getAllLostItems = () => axios.get(LOST_URL);
export const getLostItemById = (id) => axios.get(`${LOST_URL}/${id}`);
export const deleteLostItemById = (id) => axios.delete(`${LOST_URL}/${id}`);
export const updateLostItem = (lostItem) => axios.put(LOST_URL, lostItem);
export const generateId = () => axios.get(ID_URL);
export const getLostItemsByUsername = () => axios.get(USR_URL);
