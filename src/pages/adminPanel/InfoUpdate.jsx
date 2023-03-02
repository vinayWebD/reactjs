import React, { useEffect } from 'react';
import '../../assets/css/infoUpdate.scss';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { addUserData } from '../../store/reducers/authentication/authentication';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function InfoUpdate() {
  const loginUserInfo = useSelector((state) => state.authentication.userInfo);
  const usersListsArray = useSelector((state) => state.authentication.usersList);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason != 'clickaway') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (loginUserInfo.type == 'user') {
      navigate('/login');
    }
    let data = usersListsArray.find((obj) => obj.id == params.id);
    data ? formik.setValues(data) : '';
  }, []);

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      status: 'approved',
      type: 'user',
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 6 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
    onSubmit: (values) => {
      let parsedArray = JSON.parse(JSON.stringify(usersListsArray));
      if (params.id) {
        let updatedArray = parsedArray.map((obj) => {
          if (obj.email == values.email) {
            obj.userName = values.userName;
            obj.password = values.password;
            obj.status = values.status;
            obj.type = values.type;
          }
          return obj;
        });
        dispatch(addUserData(updatedArray));
        navigate('/dashboard');
      } else {
        let found = false;
        usersListsArray.forEach((obj) => {
          if (obj.email == values.email) {
            found = true;
            setOpen(true);
          }
        });
        if (!found) {
          const date = new Date();
          let nextId = date.getTime();
          let userDataObj = {
            id: nextId++,
            userName: values.userName,
            email: values.email,
            password: values.password,
            type: values.type,
            status: values.status,
          };
          parsedArray.push(userDataObj);
          dispatch(addUserData(parsedArray));
          navigate('/dashboard');
        }
      }
    },
  });
  return (
    <div className="infoUpdatePageWrapper">
      <h2>{params.id ? 'Update' : 'Create'} User</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="wrapperContent">
          <label>Username</label>
          <TextField
            sx={{
              my: 1,
            }}
            variant="standard"
            name="userName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            placeholder="Enter your Username"
            fullWidth
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div
              style={{
                color: 'red',
                paddingTop: '10px',
              }}
            >
              {formik.errors.userName}
            </div>
          ) : null}
        </div>
        <div className="wrapperContent">
          <label>Email</label>
          <TextField
            sx={{
              my: 1,
            }}
            variant="standard"
            name="email"
            disabled={params.id ? true : false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter your Email"
            fullWidth
          />
          {formik.touched.email && formik.errors.email ? (
            <div
              style={{
                color: 'red',
                paddingTop: '10px',
              }}
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="wrapperContent">
          <label>Password</label>
          <Input
            sx={{
              my: 1,
            }}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            autoComplete="on"
            value={formik.values.password}
            placeholder="Enter your Password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && formik.errors.password ? (
            <div
              style={{
                color: 'red',
                paddingTop: '10px',
              }}
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="wrapperContent">
          <label>Status</label>
          <Select
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
              },
              '.css-1h9nf3d-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused': {
                borderWidth: 0,
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            label="Status"
            fullWidth
          >
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="not approved">Not Approved</MenuItem>
          </Select>
        </div>
        <div className="wrapperContent">
          <label>Type</label>
          <Select
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
              },
              '.css-1h9nf3d-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused': {
                borderWidth: 0,
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="type"
            disabled={loginUserInfo.type == 'admin'}
            onChange={formik.handleChange}
            value={formik.values.type}
            label="Type"
            fullWidth
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </div>
        <div className="wrapperFooter">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outlined"
            color="error"
            sx={{
              mr: 2,
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Save
          </Button>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            width: '100%',
          }}
        >
          Email Already exist!
        </Alert>
      </Snackbar>
    </div>
  );
}
