import React from 'react';
import {fireEvent, render } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

describe("login desribe statment",() => {

    test ("should be abel to submit form login ", ()=>{
        const mockFn = jest.fn();
        const { getByRole } = render (<LoginForm handleSubmit ={mockFn}/>)
        const buttonNode = getByRole("button",{ name: /Sign In/i })
        fireEvent.submit(buttonNode)
        expect(mockFn).toHaveBeenCalled()
    })
})