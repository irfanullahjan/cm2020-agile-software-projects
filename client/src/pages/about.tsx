import Link from 'next/link';

const title = 'About EasyHomes';

export default function About() {
  return (
    <>
      <h1>About EasyHomes</h1>
      <p>
        EasyHomes is a concept web application for real estate customers. It is
        designed to build trust with the users by focusing on features such as
        ability to verify the profiles of those who post properties, report
        suspicious properties etc.
      </p>
      <p>
        This application was designed, built and improvement with the user at
        the center. Built by a team of 4 from the BSc. Computer Science program
        of University of London, UK.
      </p>
      <p>
        The source code maybe found on{' '}
        <span className="text-primary">
          <Link href="https://github.com/irfanullahjan/cm2020-agile-software-projects">
            Github
          </Link>
          .
        </span>
      </p>
    </>
  );
}

About.title = title;
