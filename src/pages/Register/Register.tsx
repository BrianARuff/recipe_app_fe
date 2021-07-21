import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Typography } from '@material-ui/core';
import axios from 'axios';

export default function Register(props: any) {
   const [formData, setFormData] = useState({
      user_email: '',
      user_password: '',
      user_name: '',
   });
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const handleSetFormData = (e: any) => {
      return setFormData(() => ({
         ...formData,
         [e.target.name]: e.target.value,
      }));
   };
   const handleSubmit = (e: any) => {
      e.preventDefault();
      setIsLoading(() => true);
      axios
         .post(
            'https://recipe-app-be.herokuapp.com/api/auth/register',
            formData
         )
         .then((res: any) => {
            console.log(res.data);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            setIsLoading(() => false);
            props.history.push('/');
         })
         .catch((err: any) => {
            setError(() => err.response.data.error);
            setIsLoading(() => false);
         });
   };

   return (
      <form onSubmit={handleSubmit}>
         <FormGroup>
            <Typography component={'h2'} variant={'h2'}>
               Register Here!
            </Typography>
            {error ? (
               <FormHelperText
                  style={{
                     color: 'tomato',
                     textAlign: 'center',
                     fontWeight: 'bold',
                  }}
                  className="m-3"
               >
                  {JSON.stringify(error, null, 2)}
               </FormHelperText>
            ) : null}
            <FormControl>
               <InputLabel>Username</InputLabel>
               <Input name="user_name" onChange={handleSetFormData} />
            </FormControl>
            <FormControl>
               <InputLabel>Email</InputLabel>
               <Input
                  name="user_email"
                  type="email"
                  onChange={handleSetFormData}
               />
            </FormControl>
            <FormControl>
               <InputLabel>Password</InputLabel>
               <Input
                  name="user_password"
                  type="password"
                  onChange={handleSetFormData}
               />
            </FormControl>
            <FormHelperText>
               Fill in this form to register to access this website's private
               content.
            </FormHelperText>
            <FormControl className="my-3">
               <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
               >
                  {isLoading ? 'Loading...' : 'Register'}
               </Button>
            </FormControl>
         </FormGroup>
      </form>
   );
}
