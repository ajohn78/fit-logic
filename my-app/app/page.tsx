import "./style.css"
import Link from 'next/link';

// last updated 09/28/2026 at 3:27pm by Ezekiel Turnbough


export default function HomeScreen(){
    return(
    <main>
        <div className='TopBar'>
        <div className='Title'> Fit Logic</div>
        <nav>
            <h2>Home</h2>
            <Link href="/exercise">Exercises</Link>
            <Link href="/calculator">Calculator</Link>
            <h1>Placeholder</h1>
            <h1>Placeholder</h1>
        </nav>
        </div>
    </main>
    ); 
}