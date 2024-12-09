import Skeleton from './Skeleton';

export default function SkeletonForm() {
  return (
    <div className='skeleton-form'>
      <Skeleton classes='label' />

      <div>
        <Skeleton classes='input' />
        <Skeleton classes='input' />
        <Skeleton classes='input' />
        <Skeleton classes='text-area' />
      </div>
    </div>
  );
}
