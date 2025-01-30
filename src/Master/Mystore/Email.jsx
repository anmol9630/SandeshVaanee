import React, { useState } from 'react';
import axios from 'axios';

const EmailGrid = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null); // State for the attachment
  
  // Sample JSON data for the grid
  const users = [
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' },
    { id: 3, email: 'user3@example.com' },
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (email, isChecked) => {
    setSelectedEmails(prevEmails => {
      if (isChecked) {
        return [...prevEmails, email];
      } else {
        return prevEmails.filter(e => e !== email);
      }
    });
  };

  // Handle attachment change
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]); // Save the selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('emails', selectedEmails);
    formData.append('subject', subject);
    formData.append('description', description);
    if (attachment) {
      formData.append('pdf', attachment); // Append the PDF file
    }

    try {
      const response = await axios.post('http://localhost:5000/send-email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type for file upload
        },
      });
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-3xl">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Send Email with PDF Attachment</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Email Recipients</h2>
            <div className="space-y-3">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(user.email, e.target.checked)}
                    id={user.id}
                    className="w-5 h-5"
                  />
                  <label htmlFor={user.id} className="text-gray-600">{user.email}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subject"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="attachment" className="block text-gray-700 font-semibold mb-2">Attach PDF</label>
            <input
              type="file"
              id="attachment"
              onChange={handleFileChange}
              accept="application/pdf"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailGrid;
