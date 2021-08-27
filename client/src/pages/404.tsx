import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <div>
        <h1>404</h1>
        <hr />
        <h2>Page not found</h2>
        <Link href="/">
          <a>Homepage</a>
        </Link>
      </div>
      <style jsx>{`
        div {
          color: #707070;
          background: #fff;
          text-align: center;
          margin: 60px auto;
          animation-duration: 2s;
          animation-name: slideup;
          animation-delay: 1s;
          animation-fill-mode: backwards;
        }
        h1 {
          font-family: 'Merriweather', serif;
          font-size: 120px;
        }
        p {
          font-size: 18px;
          line-height: 20px;
        }
        hr {
          width: 15%;
          margin: 40px auto;
          border-color: #d5d7de;
        }
      `}</style>
    </>
  );
};

export default NotFound;
