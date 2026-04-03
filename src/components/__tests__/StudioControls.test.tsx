/* global describe, it, expect */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StudioControls } from '../StudioControls';

const defaultProps = {
  scenarioName: 'UX Interview Practice',
  scenarioFocus: 'Technical Communication',
  scenarioLevel: 'beginner' as const,
};

describe('StudioControls', () => {
  it('renders the component without crashing', () => {
    const { container } = render(<StudioControls {...defaultProps} />);
    expect(container.firstChild).toBeDefined();
  });

  it('renders scenarioName text in the document', () => {
    render(<StudioControls {...defaultProps} />);
    expect(screen.getByText('UX Interview Practice')).toBeDefined();
  });

  it('renders scenarioFocus text in the document', () => {
    render(<StudioControls {...defaultProps} />);
    expect(screen.getByText(/Technical Communication/)).toBeDefined();
  });

  it('renders "Scenario Settings" accordion trigger text', () => {
    render(<StudioControls {...defaultProps} />);
    // "Scenario Settings" appears in both the accordion trigger and the settings card heading
    const matches = screen.getAllByText('Scenario Settings');
    expect(matches.length).toBeGreaterThan(0);
  });

  it('renders "Audio Output" accordion trigger text', () => {
    render(<StudioControls {...defaultProps} />);
    expect(screen.getByText('Audio Output')).toBeDefined();
  });

  it('renders "Microphone Input" accordion trigger text', () => {
    render(<StudioControls {...defaultProps} />);
    expect(screen.getByText('Microphone Input')).toBeDefined();
  });

  it('renders "A/V Recording" accordion trigger text', () => {
    render(<StudioControls {...defaultProps} />);
    expect(screen.getByText('A/V Recording')).toBeDefined();
  });

  it('renders "Display Timer" accordion trigger text', () => {
    render(<StudioControls {...defaultProps} />);
    expect(screen.getByText('Display Timer')).toBeDefined();
  });

  it('renders "Hide Interviewers" accordion trigger text', () => {
    render(<StudioControls {...defaultProps} />);
    expect(screen.getByText('Hide Interviewers')).toBeDefined();
  });
});
