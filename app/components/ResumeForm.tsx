'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ResumeData } from '../types';

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void;
}

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ResumeData>({
    defaultValues: {
      workExperience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
      skills: { technical: [''], soft: [''] },
      accomplishments: [{ title: '', description: '' }],
      hobbies: ['']
    }
  });

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: 'workExperience'
  });

  const { fields: accomplishmentFields, append: appendAccomplishment, remove: removeAccomplishment } = useFieldArray({
    control,
    name: 'accomplishments'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto p-6">
      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              {...register('phone', { required: 'Phone is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
        <textarea
          {...register('summary', { required: 'Summary is required' })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Work Experience */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
        {workFields.map((field, index) => (
          <div key={field.id} className="mb-6 p-4 border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  {...register(`workExperience.${index}.company`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  {...register(`workExperience.${index}.position`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  {...register(`workExperience.${index}.startDate`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  {...register(`workExperience.${index}.endDate`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register(`workExperience.${index}.description`)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            {workFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeWork(index)}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => appendWork({ company: '', position: '', startDate: '', endDate: '', description: '' })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Work Experience
        </button>
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
            <textarea
              {...register('skills.technical')}
              placeholder="Enter skills separated by commas"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Soft Skills</label>
            <textarea
              {...register('skills.soft')}
              placeholder="Enter skills separated by commas"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Accomplishments */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Accomplishments</h2>
        {accomplishmentFields.map((field, index) => (
          <div key={field.id} className="mb-4 p-4 border rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                {...register(`accomplishments.${index}.title`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register(`accomplishments.${index}.description`)}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            {accomplishmentFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeAccomplishment(index)}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => appendAccomplishment({ title: '', description: '' })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Accomplishment
        </button>
      </div>

      {/* Hobbies */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Hobbies & Interests</h2>
        <textarea
          {...register('hobbies')}
          placeholder="Enter hobbies separated by commas"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generate Resume
        </button>
      </div>
    </form>
  );
}