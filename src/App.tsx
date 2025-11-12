import './App.css'
import GithubIcon from './assets/icons/github'
import ImageToPPT from './components/ImageToPPT'

function App() {

// text-shadow: 10px 10px 0px #FF63F5;
 
  return (
    <main className='min-h-100dvh w-full'>
      <header className='w-full text-center mt-8 my-14'>
        <h1 className='animate-fade-in select-none text-[6em] md:text-[11em] font-primary-display text-shadow-primary text-shadow-xl'>photopptx</h1>
      </header>
      <div className="w-full margin-auto flex justify-center items-center">
        <ImageToPPT/>
      </div>
      <footer>
        <div className="fixed bottom-0 left-0 p-5">
          <a href="https://github.com/suyious/photopptx"><GithubIcon width='35'/></a>
        </div>
      </footer>
    </main>
  )
}

export default App
