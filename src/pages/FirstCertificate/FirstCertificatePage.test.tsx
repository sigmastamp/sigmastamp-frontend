import { render, screen } from '@testing-library/react';
import React from 'react';
import { FirstCertificatePage } from './FirstCertificatePage';

test('renders name of the project', () => {
    render(<FirstCertificatePage />);
    const linkElement = screen.getByText(/Sigmastamp/i);
    expect(linkElement).toBeInTheDocument();
});

// TODO: Make better and more complex integration tests. Probbably with Cypress.
