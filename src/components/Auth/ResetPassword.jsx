import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fireToast } from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../State/Authentication/Action";

function ResetPassword() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            fireToast("Passwords do not match", "error");
            return;
        }
        const req = { token, password };
        dispatch(resetPassword(req));
        setTimeout(() => {
            console.log(auth);
            if (auth.resetPassword.success !== null) {
                fireToast(auth.resetPassword.success.message, "success");
                setTimeout(() => {
                    navigate("/account/login");
                }, 5000);
            } else {
                fireToast(
                    auth.resetPassword.error?.response.data.message ||
                        auth.resetPassword.error?.message,
                    "error"
                );
            }
        }, 1500);
    };
    return (
        <div className="h-[92vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Your Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please enter your new password.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="sr-only"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
