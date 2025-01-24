import { useState, useRef } from 'react';
import { Label, TextInput, FileInput, Button } from 'flowbite-react';
import { MdDoubleArrow } from 'react-icons/md';
import Swal from 'sweetalert2';
import axios from '@/utils/axios';
const AddToGallery = () => {
  const [errors, setErrors] = useState([]);
  const titleImg = useRef(null);
  const gallImage = useRef(null);
  const onSubmitForm = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const res = await axios.post('/api/gallery/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Try :', res.response);
      if (res.status === 201) {
        setErrors([]);
        Swal.fire({
          icon: 'success',
          title: 'The Image was successfully Uploaded',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
          confirmButtonColor: '#5cb85c',
        });
        titleImg.current.value = '';
        gallImage.current.value = '';
      }
    } catch (error) {
      setErrors([]);
      if (error.response.status === 400) {
        setErrors(error.response.data.errors);
        console.log('E:-', error.response.data.errors);
      }
    }
  };

  return (
    <div className='mt-10 flex flex-col items-center justify-center'>
      {/* {uploadedImage && <img src={uploadedImage} />} */}

      <h2 className='mb-8 text-4xl'>Upload a Image for Gallery</h2>
      <br />
      <div className='container mx-auto flex items-center justify-center'>
        <ul>
          {errors.map((error, index) => (
            <li
              key={error.path + index}
              className='flex items-center text-red-700'
            >
              <MdDoubleArrow /> <span>&nbsp;{error.msg}</span>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <form
        onSubmit={onSubmitForm}
        encType='multipart/form-data'
        className='flex max-w-md flex-col gap-6'
      >
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='title' value='Image Title' />
          </div>
          <TextInput
            id='title'
            type='text'
            ref={titleImg}
            name='title'
            placeholder='Our Farm View'
          />
        </div>
        {/* <input type="file" name="image" multiple={false} /> */}
        <div id='fileUpload' className='max-w-md'>
          <div className='mb-2 block'>
            <Label htmlFor='file' value='Select Image' />
          </div>
          <FileInput
            name='image'
            ref={gallImage}
            id='file'
            multiple={false}
            helperText='Upload image less than 3MB'
          />
        </div>
        <Button className='custom-button-style' type='submit'>
          Upload
        </Button>
      </form>
    </div>
  );
};
export default AddToGallery;
