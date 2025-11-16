import { describe, it, expect } from 'vitest';
import axiosInstance from '../axios.js';

describe('axios instance', () => {
  it('configures base URL and credentials', () => {
    expect(axiosInstance.defaults.withCredentials).toBe(true);
    expect(axiosInstance.defaults.baseURL).toBe(
      import.meta.env.VITE_API_BASE_URL,
    );
  });
});
