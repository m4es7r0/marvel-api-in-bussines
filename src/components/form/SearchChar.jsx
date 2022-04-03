import React from 'react'
import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import * as yup from "yup";

import '../../style/variables.scss'
import '../../style/button.scss'
import './SearchChar.scss'

export const SearchChar = () => {
    return (
        <div className="char__form">
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    amount: 100,
                    currency: '',
                    text: '',
                    terms: false
                }}
                validationSchema={yup.object({
                    name: yup.string()
                        .required('Required')

                })}
                onSubmit={values => console.log(JSON.stringify(values, null, 2))}
            >
                <Form>
                    <h2 className="form-title">Or find a character by name:</h2>
                    <div className='form-interact'>
                        <div className="form-interact__block">
                            <Field
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Enter name'
                            />

                            <button type='submit' className="button button__main">
                                <div className="inner">find</div>
                            </button>
                        </div>
                        <div className="form-interact__block">
                            <div className="form-interact__block-wrapp">
                                <div className="form-interact__text">
                                    There is! Visit $.name. page?                            </div>
                                <button type='submit' className="button button__secondary">
                                    <div className="inner">to page</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
