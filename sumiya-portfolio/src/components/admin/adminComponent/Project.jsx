import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Project = () => {
    const [projectName, setProjectName] = useState('');
    const [image, setImage] = useState('');
    const [techStack, setTechStack] = useState('');
    const [description, setDescription] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [challenges, setChallenges] = useState('');
    const [improvements, setImprovements] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: projectsData, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await axios.get('https://official-portfolio-server.vercel.app/project');
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
            setImage(response.data.data.url);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const projectData = {
            projectName,
            image,
            techStack,
            description,
            liveLink,
            githubLink,
            challenges,
            improvements
        };

        try {
            await axios.post('https://official-portfolio-server.vercel.app/project', projectData);
            setIsModalOpen(false);
            refetch();
            // Reset form
            setProjectName('');
            setImage('');
            setTechStack('');
            setDescription('');
            setLiveLink('');
            setGithubLink('');
            setChallenges('');
            setImprovements('');
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Projects</h2>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
                    Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData?.map((project, index) => (
                    <div key={index} className="card bg-base-200 shadow-xl">
                        <figure className="px-4 pt-4">
                            <img src={project.image} alt={project.projectName} className="rounded-xl h-48 w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{project.projectName}</h2>
                            <p className="text-sm font-medium">Tech Stack: {project.techStack}</p>
                            <p className="text-sm">{project.description}</p>
                            <div className="flex gap-2 mt-2">
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Demo</a>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">GitHub</a>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-medium">Challenges:</h3>
                                <p className="text-sm">{project.challenges}</p>
                            </div>
                            <div className="mt-2">
                                <h3 className="font-medium">Future Improvements:</h3>
                                <p className="text-sm">{project.improvements}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Add New Project</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Project Name</label>
                                <input
                                    type="text"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Project Image</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                    required
                                />
                                {loading && <p className="text-sm mt-2">Uploading image...</p>}
                                {image && (
                                    <img src={image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg"/>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Tech Stack</label>
                                <input
                                    type="text"
                                    value={techStack}
                                    onChange={(e) => setTechStack(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="e.g. React, Node.js, MongoDB"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textarea textarea-bordered w-full h-32"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Live Project Link</label>
                                <input
                                    type="url"
                                    value={liveLink}
                                    onChange={(e) => setLiveLink(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub Repository Link</label>
                                <input
                                    type="url"
                                    value={githubLink}
                                    onChange={(e) => setGithubLink(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Challenges Faced</label>
                                <textarea
                                    value={challenges}
                                    onChange={(e) => setChallenges(e.target.value)}
                                    className="textarea textarea-bordered w-full h-32"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Future Improvements</label>
                                <textarea
                                    value={improvements}
                                    onChange={(e) => setImprovements(e.target.value)}
                                    className="textarea textarea-bordered w-full h-32"
                                    required
                                />
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
                                    disabled={loading}
                                >
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;
