import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplications } from '../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';
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

export default function AddApplication() {
  const { addApplication } = useApplications();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { status: 'Applied' }
  });

  const onSubmit = (data) => {
    // Convert the JavaScript Date object back to a YYYY-MM-DD string
    const finalData = {
      ...data,
      appliedDate: data.appliedDate.toISOString().split('T')[0]
    };

    addApplication(finalData);
    toast.success('Application added successfully!');
    navigate('/applications');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Application</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
        <div>
          <label>Company Name *</label>
          <input {...register('company')} className="border p-2 w-full rounded" />
          <p className="text-red-500 text-sm">{errors.company?.message}</p>
        </div>

        <div>
          <label>Job Role *</label>
          <input {...register('role')} className="border p-2 w-full rounded" />
          <p className="text-red-500 text-sm">{errors.role?.message}</p>
        </div>

        <div>
          <label>Status *</label>
          <select {...register('status')} className="border p-2 w-full rounded">
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Applied Date *</label>
          <input type="date" {...register('appliedDate')} className="border p-2 w-full rounded" />
          <p className="text-red-500 text-sm">{errors.appliedDate?.message}</p>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700">
          Save Application
        </button>
      </form>
    </div>
  );
}