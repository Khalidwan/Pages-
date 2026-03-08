import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ReferralHandler() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // Store referral code in localStorage
      localStorage.setItem('adrocket_referral_code', code);
      
      // Redirect to signup/login page
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [code, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">جاري توجيهك...</p>
      </div>
    </div>
  );
}
