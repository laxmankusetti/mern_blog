import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsPinterest } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full sm:flex justify-between md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="whitespace-nowrap self-center text-sm sm:text-xl dark:text-white font-semibold"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 rounded-lg text-white">
                Laxman&apos;s
              </span>
              Blog
            </Link>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:grid-gap-6 mt-5">
            <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener norefferer"
                  >
                    E-commerce Projects
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener norefferer"
                  >
                    Laxman&apos;s Blog
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            <div>
                <Footer.Title title="Follow Us" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener norefferer"
                  >
                    Github
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener norefferer"
                  >
                    LinkedIn
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            <div>
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                  >
                    Privacy Policy
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                  >
                    Terms &amp; Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:items-center">
            <Footer.Copyright href="#" by="Laxman's blog" year={new Date().getFullYear()}/>
            <div className="flex sm:mt-5 mt-0 justify-center gap-6">
                <Footer.Icon href="#" icon={BsFacebook}/>
                <Footer.Icon href="#" icon={BsTwitter}/>
                <Footer.Icon href="#" icon={BsLinkedin}/>
                <Footer.Icon href="#" icon={BsPinterest}/>
                <Footer.Icon href="#" icon={BsInstagram}/>
            </div>
        </div>
      </div>
    </Footer>
  );
}
