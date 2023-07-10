import { useState, useEffect, useRef } from 'react';

function App() {
  const colors = {
    indianRed: '#db5461',
    sandyBrown: '#ec9e57',
    celadon: '#CBC5EA',
    feldgrau: '#4c5b5c',
    blueMunsell: '#3891a6',
    cambridgeBlue: '#80B192',
    paynesGrey: '#586F7C',
  };
  const quoteBox = useRef(null);
  const body = useRef(null);
  const btns = useRef(null);
  const [quoteTxt, setQuoteTxt] = useState('Random Quote Generator');
  const quote = useRef(null);
  const [authorTxt, setAuthorTxt] = useState('author');
  const author = useRef(null);
  const btn_quote = useRef(null);
  const [tweet, setTweet] = useState('');

  useEffect (() => {
    newQuote();
  }, []);

  const newQuote = () => {
    btn_quote.current.classList.add('disabled');
    changeColor();
    changeQuote();
  }
  const changeColor = () => {
    const colorsArr = Object.values(colors);
    const randomColor = colorsArr[Math.floor(Math.random() * colorsArr.length)];
    body.current.style.backgroundColor = randomColor;
    Array.from(btns.current.children).forEach(btn => btn.style.backgroundColor = randomColor);
  }
  const changeQuote = () => {
    quote.current.classList.add('animate');
    author.current.classList.add('animate');
    quoteBox.current.classList.add('.container-height');
    setTimeout(() => {
      fetch('https://api.quotable.io/random')
        .then(res => res.json())
          .then(data => {
            setQuoteTxt(data.content);
            setAuthorTxt(data.author);
            setTweet(`https://twitter.com/intent/tweet?text=${data.content} ${data.author}`);
          }).then(() => {
            author.current.classList.remove('animate');
            quote.current.classList.remove('animate');
            btn_quote.current.classList.remove('disabled');
          });
        }, 500);
  }

      

  return (
    <div className='body' ref={body}>
      <div id="quote-box" className="container" ref={quoteBox}>
        <q id="text" className="quote" ref={quote}>{quoteTxt}</q>
        <p id="author" className="author" ref={author}>{authorTxt}</p>
        <div className="buttons" ref={btns}>
           <a id="tweet-quote" target="_blank" className="btn" href={tweet} rel="noopener noreferrer"> {/* En codepen el target debe ser _top */}
            <i className="fa fa-twitter"></i>
          </a>
          <button id="new-quote" className="btn" onClick={newQuote} ref={btn_quote}>New Quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;
