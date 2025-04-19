import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const AboutMe = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [programmingJourney, setProgrammingJourney] = useState('');
    const [workInterests, setWorkInterests] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [personality, setPersonality] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: aboutData, refetch } = useQuery({
        queryKey: ['aboutMe'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/about-me');
            return res.data;
        }
    });

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);
        
        try {
            setLoading(true);
            const response = await axios.post(
                `http://localhost:5000/upload-image`,       
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
            setImage(response.data.data.url);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updateData = {
            description,
            image,
            programmingJourney,
            workInterests,
            hobbies,
            personality
        };

        try {
            const aboutId = aboutData[0]?._id;
            if (!aboutId) {
                await axios.post('http://localhost:5000/about-me', updateData);
            } else {
                await axios.patch(`http://localhost:5000/about-me/${aboutId}`, updateData);
            }
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error updating about data:', error);
        }
    };

    const openModal = () => {
        setDescription(aboutData?.[0]?.description || '');
        setImage(aboutData?.[0]?.image || '');
        setProgrammingJourney(aboutData?.[0]?.programmingJourney || '');
        setWorkInterests(aboutData?.[0]?.workInterests || '');
        setHobbies(aboutData?.[0]?.hobbies || '');
        setPersonality(aboutData?.[0]?.personality || '');
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">About Me Information</h2>
            
            {aboutData && aboutData.length > 0 ? (
                <div className="bg-base-200 p-6 rounded-lg mb-6">
                    <img src={aboutData[0].image} alt="Profile" className="w-48 h-48 object-cover rounded-lg mb-4"/>
                    <p className="text-base-content mb-4">{aboutData[0].description}</p>
                    
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold">Programming Journey</h4>
                            <p className="text-base-content">{aboutData[0].programmingJourney}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold">Work Interests</h4>
                            <p className="text-base-content">{aboutData[0].workInterests}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold">Hobbies & Interests</h4>
                            <p className="text-base-content">{aboutData[0].hobbies}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No information available. Please add your details.</p>
            )}

            <button onClick={openModal} className="btn btn-primary">
                {aboutData && aboutData.length > 0 ? 'Update Information' : 'Add Information'}
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">
                            {aboutData && aboutData.length > 0 ? 'Update About Me' : 'Add About Me'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textarea textarea-bordered w-full h-32"
                                    placeholder="Enter description about yourself"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Programming Journey</label>
                                <textarea
                                    value={programmingJourney}
                                    onChange={(e) => setProgrammingJourney(e.target.value)}
                                    className="textarea textarea-bordered w-full h-32"
                                    placeholder="Share your programming journey"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Work Interests</label>
                                <textarea
                                    value={workInterests}
                                    onChange={(e) => setWorkInterests(e.target.value)}
                                    className="textarea textarea-bordered w-full h-32"
                                    placeholder="What type of work do you enjoy?"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Hobbies & Interests</label>
                                <textarea
                                    value={hobbies}
                                    onChange={(e) => setHobbies(e.target.value)}
                                    className="textarea textarea-bordered w-full h-32"
                                    placeholder="Share your hobbies and interests outside programming"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Profile Image</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                />
                                {loading && <p className="text-sm mt-2">Uploading image...</p>}
                                {image && <img src={image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded"/>}
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
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutMe;
