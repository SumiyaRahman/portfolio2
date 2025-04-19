import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Achievement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const queryClient = useQueryClient();

    const { data: achievements = [], isLoading } = useQuery({
        queryKey: ['achievements'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/achievements');
            return res.data;
        }
    });

    const addMutation = useMutation({
        mutationFn: async (newAchievement) => {
            return axios.post('http://localhost:5000/achievements', newAchievement);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['achievements']);
            setIsModalOpen(false);
            setFormData({ name: '', description: '' });
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (achievement) => {
            return axios.put(`http://localhost:5000/achievements/${achievement._id}`, achievement);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['achievements']);
            setIsModalOpen(false);
            setEditingAchievement(null);
            setFormData({ name: '', description: '' });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return axios.delete(`http://localhost:5000/achievements/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['achievements']);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingAchievement) {
            updateMutation.mutate({ ...formData, _id: editingAchievement._id });
        } else {
            addMutation.mutate(formData);
        }
    };

    const handleEdit = (achievement) => {
        setEditingAchievement(achievement);
        setFormData({ name: achievement.name, description: achievement.description });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this achievement?')) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="text-center text-white">Loading...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Achievements</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-primary rounded-lg text-white hover:opacity-90"
                >
                    <FaPlus /> Add Achievement
                </button>
            </div>

            <div className="grid gap-4">
                {achievements.map((achievement) => (
                    <motion.div
                        key={achievement._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-800 p-4 rounded-lg"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{achievement.name}</h3>
                                <p className="text-gray-300">{achievement.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(achievement)}
                                    className="p-2 text-blue-400 hover:text-blue-300"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(achievement._id)}
                                    className="p-2 text-red-400 hover:text-red-300"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">
                            {editingAchievement ? 'Edit Achievement' : 'Add Achievement'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-white mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2 rounded bg-gray-700 text-white h-32"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingAchievement(null);
                                        setFormData({ name: '', description: '' });
                                    }}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gradient-to-r from-secondary to-primary text-white rounded hover:opacity-90"
                                >
                                    {editingAchievement ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Achievement;
