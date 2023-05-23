import Skeleton from './Skeleton';
import './skeleton.css';

export default function SkeletonPost() {
  return (
    <div className='skeleton-post'>
      <Skeleton classes='image' />

      <div>
        <Skeleton classes='title width-50' />
        <Skeleton classes='text width-50' />
        <Skeleton classes='text' />
        <Skeleton classes='text width-50' />
      </div>
    </div>
  );
}
