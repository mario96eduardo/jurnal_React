export const file_upload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/mario93edu/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'hi8oa5eb');
    formData.append('file', file);
    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (resp.ok) {
            const { secure_url } = await resp.json();
            return secure_url;
        } else {
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }
}