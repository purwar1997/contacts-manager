import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();

  return (
    <section className='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured</p>
      <p className='error-message'>{error.message}</p>
    </section>
  );
}
