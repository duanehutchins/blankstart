/**
 * Verifies lead submission does not show success UI when persistence fails.
 */
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  appendLead: vi.fn(() => false),
}));

vi.mock('./lib/storage', () => ({
  appendCompletedSession: vi.fn(() => true),
  appendLead: mocks.appendLead,
  clearLeads: vi.fn(() => true),
  getStorageStatus: vi.fn(() => ({ available: true, message: 'ok' })),
  loadSnapshot: vi.fn(() => ({
    schemaVersion: '1.0.0',
    leads: [],
    analytics: { completedSessions: [] },
  })),
}));

import App from './App';

describe('App lead persistence failure handling', () => {
  beforeEach(() => {
    mocks.appendLead.mockReset();
    mocks.appendLead.mockReturnValue(false);
  });

  it('keeps visitor on lead form and does not add lead when save fails', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /start challenge/i }));

    await user.click(screen.getByRole('button', { name: /no boundaries/i }));
    await user.click(screen.getByRole('button', { name: /merge ai code quickly/i }));
    await user.click(screen.getByRole('button', { name: /build all three in-house/i }));
    await user.click(screen.getByRole('button', { name: /ignore outages for now/i }));
    await user.click(screen.getByRole('button', { name: /tackle debt only/i }));

    await user.click(screen.getByRole('button', { name: /continue to lead capture/i }));

    await user.type(screen.getByLabelText(/name/i), 'Taylor Founder');
    await user.type(screen.getByLabelText(/email/i), 'taylor@example.com');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /submit & finish/i }));

    expect(mocks.appendLead).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/couldn’t save your info on this device/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: /get your startup tech next-step plan/i })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: /thanks — you’re all set/i })).toBeNull();

  });
});
