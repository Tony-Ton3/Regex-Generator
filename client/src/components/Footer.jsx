import { Footer } from "flowbite-react";

import {
  BsLinkedin,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-t-emerald-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <span className="px-2 py-1 bg-gradipx-2 py-1 bg-gradient-to-r from-emerald-500 to to-black rounded-lg text-white">
              Regex
            </span>
            Generator
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Follow me" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/Tony-Ton3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link href="#">LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy (place holder)</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions (place holder)</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Regex-Generator"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="https://www.linkedin.com/in/tony-ferriera/" icon={BsLinkedin} />
            <Footer.Icon href="https://github.com/Tony-Ton3" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
