import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Eye, EyeOff } from 'react-feather';

import './Register.css';
import FirebaseContext from '../../contexts/firebaseContext';
import * as ROUTE from '../../constants/routes';
import { Text } from '../../components';

function Register() {
    const { firebase } = useContext(FirebaseContext);
    const history = useHistory();
    const location = useLocation();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [error, setError] = useState({
        fullnameError: '',
        emailError: '',
        passwordError: '',
    });
    const fullnameRegex = /^[a-zA-Z ]*$/;
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const db = firebase.firestore();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    var uid = userCredential.user.uid;

                    db.collection('account')
                        .doc(uid)
                        .set({
                            fullname: fullname,
                            post_created: [],
                            email: email,
                        })
                        .then(() => {
                            history.push(location.state.intendedPage);
                        });
                });
        } catch (error) {
            console.log(error);
            const errorPrompt = error.code.split('/')[1];

            if (errorPrompt === 'email-already-in-use') {
                setError({
                    ...error,
                    emailError: `This email is already taken.`,
                });
            }
            if (errorPrompt === 'week-password') {
                setError({
                    ...error,
                    emailError: `Password must be at least 6 characters.`,
                });
            }
        }
    };

    const fullnameValidation = ({ target }) => {
        setFullname(target.value);
        if (target.value.length == 0) {
            setError({ ...error, fullnameError: 'Please Enter Your FullName.' });
        } else if (!fullnameRegex.test(String(target.value).toLowerCase())) {
            setError({
                ...error,
                fullnameError: 'Your Name Must Only Contain Alphabets and Space.',
            });
        } else {
            setError({ ...error, fullnameError: '' });
        }
    };

    const emailValidation = ({ target }) => {
        setEmail(target.value);
        if (target.value.length == 0) {
            setError({ ...error, emailError: 'Please Enter Your Email.' });
        } else if (!emailRegex.test(String(target.value).toLowerCase())) {
            setError({ ...error, emailError: 'Please Enter a Valid Email.' });
        } else {
            setError({ ...error, emailError: '' });
        }
    };

    const passwordValidation = ({ target }) => {
        setPassword(target.value);
        if (target.value.length == 0) {
            setError({ ...error, passwordError: 'Please Enter Your Password.' });
        } else {
            setError({ ...error, passwordError: '' });
        }
    };

    return (
        <form onSubmit={handleLogin} className="register__wrapper" autoComplete="off">
            <div className="register__container">
                <Text textSize="lg" textType="basic" textColor="#000" textAlign="center">
                    Lorem ipsum dolor
                </Text>
                <Text textSize="sm" textType="basic" textColor="#000" textAlign="center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta, libero
                    vel porttitor accumsan
                </Text>
                <div className="register__input">
                    <input
                        type="text"
                        value={fullname}
                        onChange={fullnameValidation}
                        placeholder="FullName"
                    />
                </div>
                <Text textSize="sm" textType="basic" textColor="#FF2727" textAlign="l">
                    {error.fullnameError}
                </Text>
                <div className="register__input">
                    <input
                        type="text"
                        value={email}
                        onChange={emailValidation}
                        placeholder="Email"
                    />
                </div>
                <Text textSize="sm" textType="basic" textColor="#FF2727" textAlign="center">
                    {error.emailError}
                </Text>
                <div className="register__input">
                    <input
                        type={isPasswordHidden ? 'password' : 'text'}
                        value={password}
                        onChange={passwordValidation}
                        placeholder="Password"
                    />
                    <div
                        className="register__input--icon"
                        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                    >
                        {isPasswordHidden ? <Eye strokeWidth={1} /> : <EyeOff strokeWidth={1} />}
                    </div>
                </div>
                <Text textSize="sm" textType="basic" textColor="#FF2727" textAlign="center">
                    {error.passwordError}
                </Text>

                <button type="submit">Register</button>
                <Text textSize="sm" textType="basic">
                    Already have an account?
                </Text>
                <button
                    onClick={() =>
                        history.push({
                            pathname: ROUTE.LOG_IN,
                            state: { intendedPage: location.state.intendedPage },
                        })
                    }
                    className="login__switch"
                >
                    Sign in
                </button>
            </div>
        </form>
    );
}

export default Register;
