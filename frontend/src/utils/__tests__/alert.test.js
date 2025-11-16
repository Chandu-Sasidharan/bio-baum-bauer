import { describe, it, expect, vi } from 'vitest';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(),
  },
}));

import Swal from 'sweetalert2';
import showAlert from '../alert.js';

describe('showAlert', () => {
  it('invokes SweetAlert with the expected configuration', () => {
    showAlert('success', 'Hello', 'World', '<p>Hi</p>');

    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Hello',
      text: 'World',
      html: '<p>Hi</p>',
      customClass: {
        confirmButton: 'sweet-alert-btn',
        title: 'sweet-alert-title',
      },
      buttonsStyling: false,
    });
  });
});
