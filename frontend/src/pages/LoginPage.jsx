import React, { useState } from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Login")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const { login } = useContext(AuthContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return
    }

    setIsLoading(true);
    try {
      await login(currState == "Sign up" ? 'signup' : 'login', { fullName, email, password, bio })
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly
    max-sm:flex-col backdrop-blur-2xl'>
      {/*-----left----*/}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
      {/*-----right----*/}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}

          {isDataSubmitted &&
            <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
          }
        </h2>
        {currState == "Sign up" && !isDataSubmitted && (
          <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />

        )}

        {!isDataSubmitted && (
          <>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
              type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />

            <input onChange={(e) => setPassword(e.target.value)} value={password}
              type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />

          </>
        )}

        {
          currState == "Sign up" && isDataSubmitted && (
            <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a short Bio....'></textarea>
          )
        }

        <button type='submit' disabled={!isAgreed || isLoading} className={`py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md flex items-center justify-center gap-2 ${!isAgreed || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
          {isLoading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isLoading ? "Please wait..." : (currState == "Sign up" ? "Create Account" : "Login Now")}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} />
          <p>Agree to the <span onClick={() => setShowTerms(true)} className='text-violet-400 underline cursor-pointer hover:text-violet-300'>terms of use & privacy policy</span>.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account? <span onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
          ) : (
            <p className='text-sm text-gray-600'>Create an account <span onClick={() => setCurrState("Sign up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
          )}

        </div>

      </form>

      {/* Terms of Use & Privacy Policy Modal */}
      {showTerms && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm' onClick={() => setShowTerms(false)}>
          <div className='bg-gray-900 border border-gray-700 text-white rounded-xl shadow-2xl w-[90vw] max-w-lg max-h-[80vh] flex flex-col' onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className='flex items-center justify-between p-5 border-b border-gray-700'>
              <h3 className='text-lg font-semibold'>Terms of Use & Privacy Policy</h3>
              <button type='button' onClick={() => setShowTerms(false)} className='text-gray-400 hover:text-white text-2xl leading-none cursor-pointer'>&times;</button>
            </div>

            {/* Scrollable Content */}
            <div className='p-5 overflow-y-auto text-sm text-gray-300 leading-relaxed space-y-4 flex-1'>
              <h4 className='text-white font-semibold text-base'>Terms of Use</h4>
              <p>Welcome to our chat application. By accessing or using this service, you agree to be bound by the following terms and conditions.</p>

              <p><strong className='text-white'>1. Acceptance of Terms</strong><br />
                By creating an account and using this application, you confirm that you accept these terms and agree to comply with them. If you do not agree, please do not use the service.</p>

              <p><strong className='text-white'>2. User Accounts</strong><br />
                You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information during registration and to keep your profile updated.</p>

              <p><strong className='text-white'>3. Acceptable Use</strong><br />
                You agree not to use this service to send spam, harass other users, share illegal content, or engage in any activity that violates applicable laws or regulations.</p>

              <p><strong className='text-white'>4. Content</strong><br />
                You retain ownership of the content you share. However, by using this service you grant us permission to store and transmit your messages for the purpose of providing the chat service.</p>

              <p><strong className='text-white'>5. Termination</strong><br />
                We reserve the right to suspend or terminate accounts that violate these terms without prior notice.</p>

              <hr className='border-gray-700 my-2' />

              <h4 className='text-white font-semibold text-base'>Privacy Policy</h4>
              <p>We value your privacy and are committed to protecting your personal data.</p>

              <p><strong className='text-white'>1. Information We Collect</strong><br />
                We collect your name, email address, profile bio, and messages sent through the platform to provide the service.</p>

              <p><strong className='text-white'>2. How We Use Your Data</strong><br />
                Your data is used solely for operating the chat service, authenticating your identity, and delivering messages to intended recipients.</p>

              <p><strong className='text-white'>3. Data Storage & Security</strong><br />
                Your data is stored securely and we implement industry-standard measures to protect it from unauthorized access.</p>

              <p><strong className='text-white'>4. Third-Party Sharing</strong><br />
                We do not sell or share your personal information with third parties, except as required by law.</p>

              <p><strong className='text-white'>5. Your Rights</strong><br />
                You may request deletion of your account and associated data at any time by contacting us.</p>
            </div>

            {/* Footer */}
            <div className='p-4 border-t border-gray-700'>
              <button type='button' onClick={() => setShowTerms(false)} className='w-full py-2 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer hover:opacity-90 transition-opacity'>I Understand</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginPage