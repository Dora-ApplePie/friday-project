import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {requestLoginTC} from "./loginReducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../Routes/Routes";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Login = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.login.isLogin)
    const status = useAppSelector(state => state.app.status)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (status === 'loading') {
            e.preventDefault();
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(requestLoginTC(values))
            formik.resetForm();
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length <=8) {
                errors.password = 'Password should be more than 8 symbols';
            }
            return errors;
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <h2 style={{textAlign: "center"}}>Sign In</h2>
                            <TextField label="Email"
                                       margin="normal"
                                       color="secondary"
                                       disabled={status === 'loading'}
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}

                            <TextField type="password"
                                       label="Password"
                                       color="secondary"
                                       margin="normal"
                                       disabled={status === 'loading'}
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.touched.email && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}

                            <FormControlLabel label={'Remember me'} control={
                                <Checkbox
                                    color="secondary"
                                    disabled={status === 'loading'}
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}/>
                            }/>
                            <Button disabled={status === 'loading'} color="secondary" type={'submit'} variant={'contained'}>
                                Login
                            </Button>
                            <NavLink to={PATH.FORGOT_PASSWORD} onClick={handleClick}>Forgot Password</NavLink>
                            <div style={{color: "grey"}}>Don't have an account?</div>
                            <NavLink to={PATH.REGISTRATION} onClick={handleClick}>Sign Up</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
};

export default Login