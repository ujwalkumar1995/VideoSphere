'use client'
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({isSignin, isModalOpen} : {isSignin: boolean, isModalOpen: boolean}) {
  const [open, setOpen] = useState(true);
  console.log("AA",open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInputs({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      password: ''
    })
    setOpen(false)
  };
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: ''
  })
//   const {signin, signup} = useAuth();
//   const {loading, data, error} = useContext(AuthenticationContext);
  useEffect(() => {
    if (isSignin){
      if (inputs.password && inputs.email){
        return setDisabled(false);
      }
    }
    else {
      if (inputs.password && inputs.email  && inputs.city  && inputs.phone  && inputs.firstName  && inputs.lastName){
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs])
  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  } 

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = () => {
    // if (isSignin){
    //   signin({email: inputs.email, password: inputs.password}, handleClose)
    // }
    // else {
    //   signup(inputs, handleClose)
    // }
  }

  return (
    <div>
      <Modal
        open={open && isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
              <div className="p-2 h-[500px]">
                  <div className="uppercase font-bold pb-2 text-center border-b mb-2">
                      <p className='text-sm'>
                          {renderContent("Sign in", "Create Account")}
                      </p>
                  </div>
                  <div className='m-auto'>
                      <h2 className='text-2xl font-light text-center'>
                          {renderContent('Log into your account', 'Create your OpenTable Account')}
                      </h2>
                      <AuthModalInputs isSignin={isSignin} handleChangeInput={handleChangeInput} inputs={inputs}/>
                      <button 
                        className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm pb-3 disabled:bg-gray-400' 
                        disabled={disabled}
                        onClick={handleClick}
                      >
                        {renderContent('Sign in', 'Create Account')}
                      </button>
                  </div>
              </div> 
        </Box>
      </Modal>
    </div>
  );
}
