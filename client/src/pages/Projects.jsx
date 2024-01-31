import CallToAction from '../components/CallToAction.jsx';

export default function Projects() {
    return (
      <div className='flex justify-center items-center p-10 flex-col gap-2'>
        <h1 className="text-2xl font-bold text-center my-5">Projects</h1>
        <div className='max-w-3xl w-full mx-auto my-5'>
          <CallToAction />
        </div>
      </div>
    )
  }