import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';


test('renders basic app with logos', () => {
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText(/DoseHelp/i);
  expect(linkElement.length).toEqual(3);
});

function logInUser(getByTestId) {
	fireEvent.change(getByTestId('email'), {target: {value: 'eman@email.com'}})
  fireEvent.change(getByTestId('password'), {target: {value: '123456'}})
	fireEvent.click(getByTestId('signin'))
}
describe('Sign Out button', () => {
	it('does not render Sign in button if  logged in user', () => {
		const {queryByTestId} = render(<App />)
		expect(queryByTestId('signin')).not.toBeInTheDocument()
	})
	it('does render Sign Out button when logged in user', async () => {
		const {getByTestId} = render(<App />)
		logInUser(getByTestId)
		const logoutButton = await getByTestId('logout')
		expect(logoutButton).toBeInTheDocument()
	})
})
test('renders signout when signedin user', () => {
  const { getAllByText } = render(<ResponsiveAppBar />);
  const linkElement = getAllByText(/DoseHelp/i);
  expect(linkElement.length).toEqual(3);
});
