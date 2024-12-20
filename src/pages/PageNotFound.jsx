import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <section className='not-found-page'>
      <h1>Sorry, the page you were looking for was not found!</h1>
      <Link to='..' relative='path' className='btn'>
        Back to previous page
      </Link>
    </section>
  );
}
