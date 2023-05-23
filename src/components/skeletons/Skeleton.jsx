import './skeleton.css';

export default function Skeleton({ classes }) {
  return <div className={`skeleton ${classes} animate-pulse`}></div>;
}
