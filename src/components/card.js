import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  //CREATE OUR ELEMENTS
  let card = document.createElement('div');
  let headline = document.createElement('div');
  let author = document.createElement('div');
  let imgContainer = document.createElement('div');
  let img = document.createElement('img');
  let authorName = document.createElement('span');

  //ADD OUR CLASSES
  card.classList.add('card');
  headline.classList.add('headline');
  author.classList.add('author');
  imgContainer.classList.add('img-container');
  
  //ADD TEXTCONTENT & ATTRIBUTES
  headline.textContent = article.headline;
  img.setAttribute('src', article.authorPhoto);
  authorName.textContent = article.authorName;

  //ADD EVENT LISTENER TO OUR ARTICLES

  card.addEventListener('click', () => {
    console.log(headline.textContent);
  })

  //PUT THE PIECES TOGETHER
  card.append(headline);
  card.append(author);
  author.append(imgContainer);
  imgContainer.append(img);
  author.append(authorName);

  return card;

  // Below, my preferred method for solving this kind of problem, building components with vanilla JavaScript. V

  // let card = document.createElement('div');
  // card.classList.add('card');
  // card.innerHTML = `
  //    <div class="headline">${ article.headline }</div>
  //    <div class="author">
  //      <div class="img-container">
  //        <img src=${ article.authorPhoto }>
  //      </div>
  //      <span>By ${ article.authorName }</span>
  //   </div>
  // `;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get('https://lambda-times-api.herokuapp.com/topics')
  .then(res => {
    res.data.topics.forEach(topic => {

      axios.get('https://lambda-times-api.herokuapp.com/articles')
      .then(res => {
        let target = document.querySelector(selector);
        
        if(topic === 'node.js'){
          topic = 'node';
        } 
        let cardData = (res.data.articles[topic])
        
        for(let i = 0; i < cardData.length; i++){
          target.append(Card(cardData[i]));
        }
      })
    })
  })
}

export { Card, cardAppender }
