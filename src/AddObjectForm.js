import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddObjectForm = () => {
    const [formData, setFormData] = useState({
        region_id: '',
        city_id: '',
        building_type_id: '',
        street_id: '',
        house: '',
        corpus: '',
        latitude: '',
        longitude: '',
        status: 'on_moderation',
    });

    const [references, setReferences] = useState({
        regions: [],
        cities: [],
        building_types: [],
        streets: [],
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // Добавлено состояние для сообщения

    // Загрузка справочников
    useEffect(() => {
        const fetchReferenceData = async () => {
            try {
                const response = await axios.get('http://localhost:8876/api/reference-data');
                setReferences(response.data);
            } catch (err) {
                console.error('Error fetching reference data:', err);
                setError('Failed to load reference data.');
            }
        };

        fetchReferenceData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8876/api/moderator-objects', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Object added:', response.data);
            setError(null); // Сбрасываем ошибку при успешной отправке
            setSuccessMessage('Данные отправлены на модерацию'); // Устанавливаем сообщение об успехе
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred.');
            console.error('Error adding object:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Добавить Местоположение</h2>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Уведомление об успехе */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Регион</label>
                    <select
                        name="region_id"
                        value={formData.region_id}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    >
                        <option value="">Выберите регион...</option>
                        {references.regions.map((region) => (
                            <option key={region.id} value={region.id}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Город</label>
                    <select
                        name="city_id"
                        value={formData.city_id}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    >
                        <option value="">Выберите город...</option>
                        {references.cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Тип Здания</label>
                    <select
                        name="building_type_id"
                        value={formData.building_type_id}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    >
                        <option value="">Выберите тип здания...</option>
                        {references.building_types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Улица</label>
                    <select
                        name="street_id"
                        value={formData.street_id}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    >
                        <option value="">Выберите улицу...</option>
                        {references.streets.map((street) => (
                            <option key={street.id} value={street.id}>
                                {street.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Дом</label>
                    <input
                        type="text"
                        name="house"
                        value={formData.house}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Корпус</label>
                    <input
                        type="text"
                        name="corpus"
                        value={formData.corpus}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Широта</label>
                    <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Долгота</label>
                    <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
                Отправить
            </button>
        </form>
    );
};

export default AddObjectForm;
