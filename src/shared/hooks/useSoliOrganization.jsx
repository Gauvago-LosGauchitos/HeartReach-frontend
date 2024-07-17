import { useState } from 'react';
import { orgRequest } from '../../services/api.js';

const useSoliOrganization = () => {
    const [formData, setFormData] = useState({
        organizationName: '',
        description: '',
        address: '',
        phone: '',
        file: null,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
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
                images: formData.file,
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
    };
};

export default useSoliOrganization;
