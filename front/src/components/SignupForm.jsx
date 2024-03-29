import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required').positive('Age must be a positive number'),
    email: Yup.string().email('Invalid email').required('Email is required').matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Invalid email format'
    ),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SignupForm = () => {
    const handleSubmit = (values, { setSubmitting }) => {
        // Submit your form data here, e.g., send a request to your backend
        console.log(values);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{ name: '', age: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form action="/signup" method="post">
                    <div className="relative mx-28 text min-w-[200px]">
                        <Field
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="peer h-full text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500" />

                        <Field
                            type="number"
                            name="age"
                            placeholder="Age"
                            className="peer h-full text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="age" component="div" className="text-red-500" />

                        <Field
                            type="text"
                            name="email"
                            placeholder="E-mail"
                            className="peer h-full text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />

                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="peer h-full text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500" />

                        <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="peer h-full text-[#FB2576] placeholder-[#FB2576] w-full border-b border-[#FB2576] bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal outline outline-0 transition-all focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative inline-block pl-8 pr-8 my-8 px-4 py-2 font-medium group left-1/2 transform -translate-x-1/2"
                        >
                            <span className="absolute inset-0 w-full h-full bg-[#FB2576] border-2 border-white group-hover:bg-black"></span>
                            <span className="relative text-white group-hover:text-white px-2">SIGN UP</span>
                        </button>
                        <div className="bottom-0 w-full text-left ml-10 mb-12">
                            <h1 className="text-bold text-[#FB2576] text-xl uppercase">already have an account ? <a href="login" className="hover:underline">log in</a></h1>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignupForm;