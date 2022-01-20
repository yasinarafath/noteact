import React from "react";

import Head from "next/head";

import Note from "../components/Note";

import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function Home() {
  let addBtn = React.useRef();

  let [popout, setpopout] = React.useState(false);

  let handlePop = () => {
    setpopout(true);
  };

  React.useEffect(() => {
    window.onload = () => {
      var promptEvent;
      // Capture event and defer
      window.addEventListener("beforeinstallprompt", function (e) {
        e.preventDefault();
        promptEvent = e;
        listenToUserAction();
      });
      // listen to install button clic
      function listenToUserAction() {
        addBtn.current?.addEventListener("click", presentAddToHome);
        setpopout(true);
      }
      // present install prompt to user
      function presentAddToHome() {
        promptEvent.prompt(); // Wait for the user to respond to the prompt
        promptEvent.userChoice.then((choice) => {
          if (choice.outcome === "accepted") {
            console.log("User accepted");
          } else {
            console.log("User dismissed");
          }
        });
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Note App</title>
      </Head>

   

      <div id="outer-container">
        <div className="note-app min-h-[96vh]">
          <main id="page-wrap">
            <Note />
          </main>
        </div>
        <footer>
          <p className="text-center text-white mt-8">
            Developed by
            <Link href="https://www.linkedin.com/in/yasin-arafath-80ab22207/">
              <a className="text-orange-400 hover:text-orange-600">
                {" "}
                Yasin Arafath
              </a>
            </Link>
          </p>
        </footer>
      </div>
      {popout ? (
        <></>
      ) : (
        <div className="a2hsPop popinstall will-change-transform">
          <button
            onClick={handlePop}
            className="text-white active:text-red-700 p-2 absolute top-0 right-0"
          >
            <FaTimes />
          </button>
          <h2 className="text-white text-2xl">
            For better experience install in mobile
          </h2>
          <button
            ref={addBtn}
            className="text-white bg-blue-800 active:bg-blue-900 px-4 py-1 text-xl rounded mt-2"
          >
            Install
          </button>
        </div>
      )}
    </>
  );
}
