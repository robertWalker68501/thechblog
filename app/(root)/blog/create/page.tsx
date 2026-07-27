import CreatePostForm from '@/components/forms/CreatePostForm';
import GoBackButton from '@/components/GoBackButton';

const CreatePostPage = () => {
  return (
    <div className='page-wrapper py-10'>
      <div className='mb-10'>
        <GoBackButton
          href='/blog'
          text='Go Back'
        />
      </div>
      <CreatePostForm />
    </div>
  );
};

export default CreatePostPage;
