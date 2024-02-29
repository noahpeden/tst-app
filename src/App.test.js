/* eslint-disable testing-library/prefer-presence-queries */
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  const setup = () => {
    render(<App />);
    const usernameInput = () => screen.getByPlaceholderText('Username');
    const passwordInput = () => screen.getByPlaceholderText('Password');
    const confirmPasswordInput = () =>
      screen.getByPlaceholderText('Confirm Password');
    const submitButton = () => screen.getByText('Submit');
    return {
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
      ...screen,
    };
  };
  describe('Render', () => {
    test('renders the form with username, password, and confirm password input fields', () => {
      const { usernameInput, passwordInput, confirmPasswordInput } = setup();
      expect(usernameInput()).toBeInTheDocument();
      expect(passwordInput()).toBeInTheDocument();
      expect(confirmPasswordInput()).toBeInTheDocument();
    });
  });
  describe('actions', () => {
    test('validates that password and confirm password match', () => {
      const { passwordInput, confirmPasswordInput } = setup();

      fireEvent.change(passwordInput(), {
        target: { value: 'password123' },
      });
      fireEvent.change(confirmPasswordInput(), {
        target: { value: 'password123' },
      });
      fireEvent.click(screen.getByText('Submit'));
      expect(screen.queryByText('all good!')).toBeInTheDocument();
    });

    test('shows error message when passwords do not match', () => {
      const { passwordInput, confirmPasswordInput } = setup();

      fireEvent.change(passwordInput(), {
        target: { value: 'password123' },
      });
      fireEvent.change(confirmPasswordInput(), {
        target: { value: 'password456' },
      });
      fireEvent.click(screen.getByText('Submit'));
      expect(screen.queryByText('passwords dont match')).toBeInTheDocument();
    });

    test('prevents form submission and logs message on submit', () => {
      setup();
      console.log = jest.fn();

      fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));

      expect(console.log).toHaveBeenCalledWith('Form submitted');
    });
  });
});
