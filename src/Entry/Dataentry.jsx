import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const itemData = [
  { id: 1, name: 'Item A' },
  { id: 2, name: 'Item B' },
  { id: 3, name: 'Item C' },
];

const Dataentry = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    age: Yup.number()
      .required('Age is required')
      .min(18, 'You must be at least 18 years old')
      .max(100, 'Age must be under 100'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
    volume: Yup.number()
      .min(0, 'Volume cannot be less than 0')
      .max(100, 'Volume cannot be more than 100')
      .required('Volume is required'),
    date: Yup.date()
      .required('Date is required')
      .nullable(),
    itemName: Yup.string()
      .required('Item name is required'),
    radioOption: Yup.string()
      .required('Please select an option'),
  });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Data_Entry</h2>

        <Formik
          initialValues={{
            name: '',
            email: '',
            age: '',
            acceptTerms: false,
            volume: 30,
            date: '',
            itemName: '',
            radioOption: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <Field
                type="number"
                id="age"
                name="age"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="age" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <Field
                type="date"
                id="date"
                name="date"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
              <Field as="select" name="itemName" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select an item</option>
                {itemData.map(item => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="itemName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select an option</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <Field type="radio" name="radioOption" value="yes" className="form-radio text-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <Field type="radio" name="radioOption" value="no" className="form-radio text-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
              <ErrorMessage name="radioOption" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            
            <div className="mb-4">
              <label className="inline-flex items-center">
                <Field type="checkbox" name="acceptTerms" className="form-checkbox text-blue-500" />
                <span className="ml-2 text-sm text-gray-700">I accept the terms and conditions</span>
              </label>
              <ErrorMessage name="acceptTerms" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Volume</label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Volume Down</span>
                <Field
                  type="range"
                  id="volume"
                  name="volume"
                  min="0"
                  max="100"
                  className="w-full mx-2"
                />
                <span className="text-sm text-gray-600">Volume Up</span>
              </div>
              <ErrorMessage name="volume" component="div" className="text-red-500 text-xs mt-1" />
            </div>



            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Dataentry;


