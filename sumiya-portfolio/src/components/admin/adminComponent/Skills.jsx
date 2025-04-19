import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Skills = () => {
    const [skillName, setSkillName] = useState('');
    const [skillLogo, setSkillLogo] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: skillsData, refetch } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const res = await axios.get('https://official-portfolio-server.vercel.app/skills');
            return res.data;
        }
    });

    const handleLogoUpload = async (e) => {
        const logoFile = e.target.files[0];
        const formData = new FormData();
        formData.append('image', logoFile);
        
        try {
            setLoading(true);
            const response = await axios.post(
                `https://official-portfolio-server.vercel.app/upload-image`,
                formData,
                {
                    params: {
                        key: process.env.REACT_APP_IMGBB_API_KEY,
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setSkillLogo(response.data.data.url);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading logo:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const skillData = {
            name: skillName,
            logo: skillLogo
        };

        try {
            await axios.post('https://official-portfolio-server.vercel.app/skills', skillData);
            setIsModalOpen(false);
            setSkillName('');
            setSkillLogo('');
            refetch();
        } catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Skills</h2>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                    Add New Skill
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skillsData?.map((skill) => (
                    <div key={skill._id} className="bg-base-200 p-4 rounded-lg flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
                        <img 
                            src={skill.logo} 
                            alt={skill.name} 
                            className="w-16 h-16 object-contain mb-2"
                        />
                        <p className="text-center font-medium">{skill.name}</p>
                    </div>
                ))}
            </div>

            {/* Add Skill Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add New Skill</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Skill Name</label>
                                <input
                                    type="text"
                                    value={skillName}
                                    onChange={(e) => setSkillName(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Skill Logo</label>
                                <input
                                    type="file"
                                    onChange={handleLogoUpload}
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                    required
                                />
                                {loading && <p className="text-sm mt-2">Uploading logo...</p>}
                                {skillLogo && (
                                    <img 
                                        src={skillLogo} 
                                        alt="Preview" 
                                        className="mt-2 w-16 h-16 object-contain"
                                    />
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Adding...' : 'Add Skill'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;
