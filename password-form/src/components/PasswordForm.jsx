import React, { useState } from 'react';
import axios from 'axios';
import { PASSWORD_CHECKER_LINK } from '../config';

function PasswordForm() {
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(PASSWORD_CHECKER_LINK, { password })
            .then((response) => {
                const { stepsToMakePwdStrong, message } = response.data;

                setResponse({ stepsToMakePwdStrong, message });
            })
            .catch((error) => {
                console.error(error);
                setResponse(null);
            });
    };

    return (
        <div className="password-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div className="response">
                    {response.stepsToMakePwdStrong === 0 ? (
                        <p>Password is strong</p>
                    ) : (
                        <p>
                            Minimum number of steps to make the password strong:
                            {response.stepsToMakePwdStrong}
                        </p>
                    )}
                    {/* <p>{response.message}</p> */}
                </div>
            )}
        </div>
    );
}

export default PasswordForm;
