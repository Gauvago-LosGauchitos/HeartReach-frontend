import { useState } from 'react';
import { orgRequest } from '../../services/api.js';

const useSoliOrganization = () => {
    const [formData, setFormData] = useState({
        organizationName: '',
        description: '',
        address: '',
        phone: '',
        images: null,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, images } = e.target;
        setFormData({
            ...formData,
            [name]: images ? images[0] : value
        });
    };

    const handleImagesChange = (e) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({
                ...formData,
                images: reader.result
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        let validationErrors = {};
        if (!formData.organizationName) validationErrors.organizationName = "El nombre de la organización es requerido";
        if (!formData.description) validationErrors.description = "La descripción es requerida";
        if (!formData.address) validationErrors.address = "La dirección es requerida";
        if (!formData.phone) validationErrors.phone = "El teléfono es requerido";
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await orgRequest({
                name: formData.organizationName,
                description: formData.description,
                address: formData.address,
                phone: formData.phone,
                images: formData.images,
            });
            console.log(response); 
            setSubmitSuccess(true);
        } catch (error) {
            console.error(error); 
            setErrors({ apiError: error.message || 'Error al enviar la solicitud' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        submitSuccess,
        handleChange,
        handleSubmit,
        handleImagesChange
    };
};

export default useSoliOrganization;
