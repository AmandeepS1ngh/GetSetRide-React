import { API_URL, getAuthHeaders } from './api';

// Upload single image
export const uploadSingleImage = async (file) => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) {
        throw new Error('You must be logged in to upload images');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload/single`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to upload image');
    }

    return data;
};

// Upload multiple images
export const uploadMultipleImages = async (files) => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) {
        throw new Error('You must be logged in to upload images');
    }

    const formData = new FormData();
    files.forEach((file) => {
        formData.append('images', file);
    });

    const response = await fetch(`${API_URL}/upload/multiple`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to upload images');
    }

    return data;
};

// Delete image by public ID
export const deleteImage = async (publicId) => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) {
        throw new Error('You must be logged in to delete images');
    }

    const response = await fetch(`${API_URL}/upload/${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to delete image');
    }

    return data;
};
