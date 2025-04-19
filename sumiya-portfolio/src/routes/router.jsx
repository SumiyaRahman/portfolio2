import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../components/admin/dashboard/Dashboard';
import BannerIntro from '../components/admin/adminComponent/BannerIntro';
import AboutMe from '../components/admin/adminComponent/AboutMe';
import SocialLinks from '../components/admin/adminComponent/SocialLinks';
import Skills from '../components/admin/adminComponent/Skills';
import EducationalQualification from '../components/admin/adminComponent/EducationalQualification';
import Achievement from '../components/admin/adminComponent/Achievement';
import Project from '../components/admin/adminComponent/Project';
import Home from '../pages/Home';
import ViewDetails from '../pages/ViewDetails';
const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "project/:id",
          element: <ViewDetails></ViewDetails>,
        }
      ],
    },
    {
        path: "admin/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "banner-intro",
            element: <BannerIntro></BannerIntro>,
          },
          {
            path: "about-me",
            element: <AboutMe></AboutMe>,
          },
          {
            path: "social-links",
            element: <SocialLinks></SocialLinks>,   
          },
          {
            path: "skills",
            element: <Skills></Skills>,
          },    
          {
            path: "educational-qualification",
            element: <EducationalQualification></EducationalQualification>,
          },
          {
            path: "achievement",
            element: <Achievement></Achievement>,
          },
          {
            path: "project",
            element: <Project></Project>,
          },
        ],
      },
  ]);

export default router;