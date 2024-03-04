import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex flex-col justify-center flex-1">
            <h1 className="text-2xl">Want to learn more about JAVASCRIPT?</h1>
            <p className="text-gray-500 my-2">
                check out my projects and follow for updates!!!
            </p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none">
                <a href="https://laxmankusetti.github.io/portfolio/">Check out updates</a>
            </Button>
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewFJxkgofm7SIekFKMBs0vJIWqwJjno3K5g&usqp=CAU" alt="js image" className="flex-1 object-cover" />
    </div>
  );
}
