import { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  Label,
  Select,
  TextInput,
  FileInput,
  Button,
  Textarea,
} from 'flowbite-react';
import { MdDoubleArrow } from 'react-icons/md';
import Swal from 'sweetalert2';
import axios from '@/utils/axios';

const AddToNewArticle = () => {
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);
  const [newsContent, setNewsContent] = useState('');
  const newsTitle = useRef(null);
  const newsDescription = useRef(null);
  const newsImage = useRef(null);

  const handleEditorChange = content => {
    console.log('Content was updated:', content);
    setNewsContent(content);
  };
  const onSubmitForm = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('content', newsContent);
    console.log('FormData: ', formData.get('content'));
    try {
      const res = await axios.post('/api/newsArticle/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('RES :', res.response);
      if (res.status === 201) {
        setErrors([]);
        Swal.fire({
          icon: 'success',
          title: 'Image was Uploaded and Data was saved!',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
          confirmButtonColor: '#5cb85c',
        });
        newsTitle.current.value = '';
        newsDescription.current.value = '';
        newsImage.current.value = '';
        setNewsContent('');
      }
    } catch (error) {
      setErrors([]);
      if (error.response.status === 400) {
        setErrors(error.response.data.errors);
        console.log('ERROR:', error.response.data.errors);
      }
    }
  };

  const getAllUsers = () => {
    try {
      axios.get('/api/users/get-all-users').then(response => {
        const data = response.data.users.filter(
          user => user.userType === 'ADMIN'
        );
        setUsers(data);
      });
    } catch (error) {
      console.log('EEEE', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className='mt-10 flex flex-col items-center justify-center'>
      {/* {uploadedImage && <img src={uploadedImage} />} */}

      <h2 className='mb-8 text-4xl'>Add New Article of News</h2>
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
        className='mb-5 flex flex-col gap-6'
      >
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='users' value='Select the writer of this article' />
          </div>
          <Select id='users' name='writerId'>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.firstName}&nbsp;{user.lastName}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='title' value='News Title' />
          </div>
          <TextInput
            id='title'
            type='text'
            ref={newsTitle}
            name='title'
            placeholder='Inter Title of News'
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='description' value='News Description' />
          </div>
          <Textarea
            id='description'
            name='description'
            placeholder='Leave a description...'
            ref={newsDescription}
            rows={4}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='content' value='News content' />
          </div>
          <Editor
            initialValue='<p>This paragraph is set as initial content of the news article, you can remove it </p>'
            init={{
              height: 600,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help',
              content_style:
                'body { font-family: Arial, sans-serif; font-size: 16px; }',
              paste_data_images: true, // Enable pasting of images
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div id='fileUpload'>
          <div className='mb-2 block'>
            <Label htmlFor='newsImage' value='Select an Image for News' />
          </div>
          <FileInput
            name='newsImage'
            ref={newsImage}
            id='newsImage'
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
export default AddToNewArticle;
