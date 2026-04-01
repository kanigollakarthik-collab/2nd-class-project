import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ApplicationContext = createContext();

export function useApplications() {
  return useContext(ApplicationContext);
}

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('job-applications', []);

  const addApplication = (app) => {
    setApplications([...applications, { ...app, id: Date.now().toString(), bookmarked: false }]);
  };

  const updateApplication = (id, updatedApp) => {
    setApplications(applications.map(app => app.id === id ? { ...app, ...updatedApp } : app));
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
    ));
  };

  return (
    <ApplicationContext.Provider value={{ 
      applications, 
      addApplication, 
      updateApplication, 
      deleteApplication,
      toggleBookmark
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};