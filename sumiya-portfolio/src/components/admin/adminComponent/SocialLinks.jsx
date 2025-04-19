import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const SocialLinks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLink, setNewLink] = useState({ name: '', url: '', logo: '' });

    const iconMap = {
        'GitHub': <FaGithub className="w-6 h-6" />,
        'LinkedIn': <FaLinkedin className="w-6 h-6" />,
        'Twitter': <FaTwitter className="w-6 h-6" />,
        'Facebook': <FaFacebook className="w-6 h-6" />,
        'Instagram': <FaInstagram className="w-6 h-6" />,
        'Gmail': <SiGmail className="w-6 h-6" />
    };

    const { data: socialLinksData, refetch } = useQuery({
        queryKey: ['socialLinks'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/social-links');
            return res.data;
        }
    });

    const handleLinkChange = (field, value) => {
        setNewLink(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:5000/social-links', newLink);
            setIsModalOpen(false);
            setNewLink({ name: '', url: '', logo: '' });
            refetch();
        } catch (error) {
            console.error('Error adding social link:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/social-links/${id}`);
            refetch();
        } catch (error) {
            console.error('Error deleting social link:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Social Links</h2>
            
            <div className="bg-base-200 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4">
                    {socialLinksData?.map((link) => (
                        <div key={link._id} className="flex items-center justify-between bg-base-100 p-4 rounded-lg">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-grow mr-4">
                                {iconMap[link.name] || <img src={link.logo} alt={link.name} className="w-6 h-6 mr-2" />}
                                {link.name}
                            </a>
                            <button 
                                onClick={() => handleDelete(link._id)}
                                className="btn btn-error btn-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                Add New Social Link
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4">Add New Social Link</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Platform</label>
                                <select
                                    value={newLink.name}
                                    onChange={(e) => handleLinkChange('name', e.target.value)}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">Select Platform</option>
                                    <option value="GitHub">GitHub</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Twitter">Twitter</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Gmail">Gmail</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">URL</label>
                                <input
                                    type="url"
                                    value={newLink.url}
                                    onChange={(e) => handleLinkChange('url', e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Enter profile URL"
                                    required
                                />
                            </div>
                            
                            {newLink.name === 'Other' && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">Logo URL</label>
                                    <input
                                        type="url"
                                        value={newLink.logo}
                                        onChange={(e) => handleLinkChange('logo', e.target.value)}
                                        className="input input-bordered w-full"
                                        placeholder="Enter logo image URL"
                                        required
                                    />
                                    {newLink.logo && <img src={newLink.logo} alt="Logo Preview" className="mt-2 w-10 h-10 object-cover"/>}
                                </div>
                            )}

                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    className="btn btn-ghost"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                >
                                    Add Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialLinks;
