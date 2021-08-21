import Link from 'next/link';

const NotFound = () => {
    return (
        <>
            <div className="not-found">
                <h1>404</h1>
                <hr />
                <h2>Page not found</h2>
                <Link href='/'><a>Homepage</a></Link>
            </div>
            
            
        </>
        
        
    )
}

export default NotFound;

