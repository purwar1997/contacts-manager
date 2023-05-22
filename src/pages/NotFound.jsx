import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className='not-found-page'>
      <h1>Sorry, the page you were looking for wa not found.</h1>
      <Link to='..' relative='path'>
        Back to previous page
      </Link>
    </section>
  );
}
