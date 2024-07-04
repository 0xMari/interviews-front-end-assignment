import './cool-search.css'

import React, { useState, useEffect } from 'react';


const TypewriterPlaceholderInput = ({ words }) => {
  const [placeholder, setPlaceholder] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (deleting) {
        if (charIndex > 0) {
          setPlaceholder(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        if (charIndex < currentWord.length) {
          setPlaceholder(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 1000); // Pause before deleting
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, deleting ? 50 : 100);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, deleting, wordIndex, words]);

  return (
    <input
        className='cool-input'
        type="text"
        placeholder={placeholder}
    />
  );
};

//export default TypewriterPlaceholderInput;


export function CoolSearch(){
    
    const words = ['vegetarian', 'italian', 'korean', 'pescatarian', 'indian', 'japanese'];

    return(
        <>
        <div className='search-bar-wrap'>
            <h1 className='search-bar-copy'>
                What are you <span className='cool'>craving</span> today?
            </h1>
            <div className='search-bar'>
                <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                </svg>
                <TypewriterPlaceholderInput words={words} />       
            </div>
        </div>
        </>
    )
}