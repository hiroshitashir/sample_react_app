import axios from 'axios';

const API_URL = 'http://localhost:5000/businesslogic';

class BusinessLogicService {
  async get(id) {
    const result = await axios
    .get(`${API_URL}/${id}`);
    return result.data;
  }

  async create(data) {
    const result = await axios
    .post(API_URL, data);
    return result.data;
  }

  async update(data) {
    const result = await axios
    .put(`${API_URL}/${data.id}`, data);
    return result.data;
  }
}

export default new BusinessLogicService();