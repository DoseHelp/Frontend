import React from 'react';
import {fireEvent, render } from '@testing-library/react';
import App from '../components/App';

describe("login desribe statment",() => {
	test('login form should be in the document', () => {
		const component = render(<App />)
		  const inputNode = component.getByText("Email Address")
		expect (inputNode).toBeInTheDocument
	});
	
	test('login form should be in the document and have a password', () => {
		const component = render(<App />)
		  const passwordInput = component.getByText("Password")
		expect (passwordInput).toBeInTheDocument
	});
	
})


describe('renders Home', () => {
	it('renders landing link', () => {
		const {queryByText} = render(<App />)
		const landingLink = queryByText(/landing/i)
		expect(landingLink).toBeVisible()
	})
	it('renders patients List link', () => {
		const {queryByText} = render(<App />)
		const pokeListLink = queryByText(/patients list/i)
		expect(pokeListLink).toBeVisible()
	})
})



describe('/',() => {
	it('routes to Home', () => {
		const {queryByText} = render(<App />)
		const home = queryAllByText(/home/i)
		fireEvent.click(home[0])
		const homeHeader = queryByText(/Patientsr/i)
		expect(homeHeader).toBeVisible()
	})
}) 