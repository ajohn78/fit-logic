import "../style.css"
import Link from 'next/link';

// last updated 09/28/2026 at 3:27pm by Ezekiel Turnbough

export default function Calculator(){
    return(
    <main>
        <div className='TopBar'>
        <div className='Title'> Fit Logic</div>
        <nav>
            <Link href="/">Home</Link>
            <Link href="/exercise">Exercises</Link>
            <h2>Calculator</h2>
            <h1>Placeholder</h1>
            <h1>Placeholder</h1>
        </nav>
        </div>
    </main>
    ); 
}