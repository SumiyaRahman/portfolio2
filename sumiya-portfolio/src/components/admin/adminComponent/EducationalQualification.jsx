import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const EducationalQualification = () => {
    const [instituteName, setInstituteName] = useState('');
    const [yearRange, setYearRange] = useState('');
    const [image, setImage] = useState('');
    const [degree, setDegree] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: educationData, refetch } = useQuery({
        queryKey: ['education'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/educational-qualification');
            return res.data;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const educationData = {
            instituteName,
            yearRange,
            image,
            degree
        };

        try {
            await axios.post('http://localhost:5000/educational-qualification', educationData);
            setIsModalOpen(false);
            refetch();
            setInstituteName('');
            setYearRange('');
            setImage('');
            setDegree('');
        } catch (error) {
            console.error('Error adding education:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Educational Qualifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {educationData?.map((edu, index) => (
                    <div key={index} className="bg-base-200 p-4 rounded-lg">
                        <img src={edu.image} alt={edu.instituteName} className="w-full h-48 object-cover rounded-lg mb-4"/>
                        <h3 className="text-lg font-semibold">{edu.instituteName}</h3>
                        <p className="text-base-content mb-2">{edu.degree}</p>
                        <p className="text-base-content">{edu.yearRange}</p>
                    </div>
                ))}
            </div>

            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                Add Education
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Educational Qualification</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Institute Name</label>
                                <input
                                    type="text"
                                    value={instituteName}
                                    onChange={(e) => setInstituteName(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Enter institute name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Degree</label>
                                <input
                                    type="text"
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Enter degree name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Year Range</label>
                                <input
                                    type="text"
                                    value={yearRange}
                                    onChange={(e) => setYearRange(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="e.g. 2019-2023"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Institute Image URL</label>
                                <input
                                    type="url"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Enter image URL"
                                    required
                                />
                                {image && (
                                    <img 
                                        src={image} 
                                        alt="Preview" 
                                        className="mt-2 w-32 h-32 object-cover rounded-lg"
                                    />
                                )}
                            </div>

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
                                    Add Education
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EducationalQualification;
