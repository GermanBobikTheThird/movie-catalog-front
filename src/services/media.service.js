import $api from '../api';

const MediaService = {
    async getAll(params) {
        const response = await $api.get('media/', { params });
        return response.data;
    },

    async getGenres() {
        const response = await $api.get('genres/');
        return response.data;
    },

    async getCountries() {
        const response = await $api.get('countries/');
        return response.data;
    },

    async getMediaTypes() {
        const response = await $api.get('media-types/');
        return response.data;
    },

    async getListStatuses() {
        const response = await $api.get('list-statuses/');
        return response.data;
    },

    async getInfo() {
        const response = await $api.get('media/info/');
        return response.data;
    },

    async getById(id) {
        const response = await $api.get(`media/${id}/`);
        return response.data;
    },

    async getUserStatus(mediaId) {
        const response = await $api.get(`user-media/?media=${mediaId}`);
        return response.data.length > 0 ? response.data[0] : null;
    },

    async addToList(mediaId, statusId) {
        const response = await $api.post('user-media/', {
            media: mediaId,
            status: statusId,
        });
        return response.data;
    },

    async updateListStatus(recordId, statusId) {
        const response = await $api.patch(`user-media/${recordId}/`, {
            status: statusId,
        });
        return response.data;
    },

    async removeFromList(recordId) {
        await $api.delete(`user-media/${recordId}/`);
    },

    async getUserMedia() {
        const response = await $api.get('user-media/');
        return response.data;
    },
};

export default MediaService;
