import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import CardSlider from "../components/CardSlider";

import Navbar from "../components/Navbar";
import { getUserLikedMovies } from "../redux/NetflixSlice";
import { firebaseAuth } from "../utils/firebase";
import NotAvailable from "./NotAvailable";

const MyList = () => {
  const [email, setEmail] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const myList = useSelector((state) => state.netflix.myList);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) dispatch(getUserLikedMovies({ email }));
  }, [email]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset > 0 ? true : false);
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <div>
      <Navbar isScrolled={isScrolled} />

      <div className="mt-20 md:mt-36 ml-7">
        {myList.length === 0 ? (
          <NotAvailable />
        ) : myList.length > 0 && myList.length < 5 ? (
          <>
            <h1 className="text-3xl mb-5">My List</h1>
            <div className="flex flex-wrap items-center justify-start gap-4">
              {myList.map((movie) => (
                <div key={movie.id} className="w-[10rem] md:w-[15rem]">
                  <Card movieData={movie} isLiked />
                </div>
              ))}
            </div>
          </>
        ) : (
          <CardSlider title="My List" data={myList} isLiked />
        )}
      </div>
    </div>
  );
};

export default MyList;
