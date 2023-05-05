import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";

const Home = () => {
  const [openTaskInput, setOpenTaskInput] = useState(false);
  const [open, setOpen] = useState(false);
  const [workMin, setWorkMin] = useState(45);
  const [breakMin, setBreakMin] = useState(15);
  const inputRef = useRef(null);
  const [remainingTime, setRemainingTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
  });

  const handleTaskButton = () => {
    setOpenTaskInput(true);
    inputRef.current.focus();
  };

  const handleSettings = () => {
    setOpen(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });

    const intervalID = setInterval(() => {
      // console.log("yes")
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <section className="text-white pt-10 pb-20">
      <div>Home</div>
    </section>
  );
};

export default Home;
