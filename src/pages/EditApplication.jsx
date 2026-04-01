import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplications } from '../context/ApplicationContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Job role is required'),
  location: yup.string(),
  salary: yup.number().typeError('Salary must be a number'),
  platform: yup.string(),
  status: yup.string().required('Status is required'),
  appliedDate: yup.date().required('Applied date is required'),
});

export default function EditApplication() {
  const { id } = useParams();
  const { applications, updateApplication } = useApplications();
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Load existing application data
  useEffect(() => {
    const appToEdit = applications.find(app => app.id === id);
    if (appToEdit) {
      Object.keys(appToEdit).forEach(key => {
        if (key === 'appliedDate' && appToEdit[key]) {
          // Format date string for the HTML date input
          const d = new Date(appToEdit[key]);
          setValue(key, d.toISOString().split('T')[0]);
        } else {
          setValue(key, appToEdit[key]);
        }
      });
    } else {
      toast.error('Application not found');
      navigate('/applications');
    }
  }, [id, applications, setValue, navigate]);

 const onSubmit = (data) => {
    // Safely format the date depending on whether it's a String or a Date object
    let formattedDate = data.appliedDate;
    
    if (data.appliedDate instanceof Date) {
      formattedDate = data.appliedDate.toISOString().split('T')[0];
    } else if (typeof data.appliedDate === 'string' && data.appliedDate.includes('T')) {
      // Just in case a raw ISO string sneaks through
      formattedDate = data.appliedDate.split('T')[0];
    }

    const finalData = {
      ...data,
      appliedDate: formattedDate
    };

    updateApplication(id, finalData);
    toast.success('Application updated successfully!');
    navigate('/applications');
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Application</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="font-medium">Company Name *</label>
          <input {...register('company')} className="border p-2 w-full rounded mt-1" />
          <p className="text-red-500 text-sm mt-1">{errors.company?.message}</p>
        </div>

        <div>
          <label className="font-medium">Job Role *</label>
          <input {...register('role')} className="border p-2 w-full rounded mt-1" />
          <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Salary Range</label>
            <input type="number" {...register('salary')} className="border p-2 w-full rounded mt-1" />
          </div>
          <div>
            <label className="font-medium">Status *</label>
            <select {...register('status')} className="border p-2 w-full rounded mt-1">
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-medium">Applied Date *</label>
          <input type="date" {...register('appliedDate')} className="border p-2 w-full rounded mt-1" />
          <p className="text-red-500 text-sm mt-1">{errors.appliedDate?.message}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-blue-600 text-white p-2 rounded flex-1 hover:bg-blue-700">
            Update Application
          </button>
          <button type="button" onClick={() => navigate('/applications')} className="bg-gray-300 text-gray-800 p-2 rounded flex-1 hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}