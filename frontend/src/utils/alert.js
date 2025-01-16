import Swal from 'sweetalert2';

export default function showAlert(icon, title, text, html = null) {
  Swal.fire({
    icon,
    title,
    text,
    html,
    customClass: {
      confirmButton: 'btn-custom-class',
      title: 'title-class',
    },
    buttonsStyling: false,
  });
}
