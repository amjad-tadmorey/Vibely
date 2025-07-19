import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SignupModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState()


  function handleCreateUser () {

  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-white/10 backdrop-blur-md">
      <div className="bg-white rounded-t-lg sm:rounded-lg shadow-lg p-6 max-w-sm w-full transform animate-slideUp">
        <h2 className="text-2xl font-bold text-green-600 text-center mb-4">🎉 Signup Successful!</h2>
        <p className="text-center text-gray-700 mb-6">You’ve successfully created your account.</p>
        <form action="" className='mb-12'>
          <Input
                name="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
          />
        </form>

        <div className="flex justify-center">
          <Button type="submit" onClick={handleCreateUser}>
            Submit
          </Button>
          <Button type="" onClick={onClose}>
            Dissmis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
