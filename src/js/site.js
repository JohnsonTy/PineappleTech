import './general';
import './navbar';
import './sidebar';
import techNavbar from './navbar';
import techSidebar from './sidebar';


class Pineapple {
  constructor() {
    this.title = 'Computer Choices';
    this.content = 'Here are great prebuilt computers:';
  }
}

const container = document.getElementById('computers');

const url =
  'https://amazon-web-scraping-api.p.rapidapi.com/products/search?criteria=Prebuilt%20Computer&page=1&countryCode=US&languageCode=EN';

const options = {
  url,
  method: 'GET',
  dataType: 'json',
  mode: 'cors',
  headers: {
    'X-RapidAPI-Key': '0b0dc02e31msheb40fae5b7fe801p1b3890jsn97abcb3d73a3',
    'X-RapidAPI-Host': 'amazon-web-scraping-api.p.rapidapi.com',
  },
};

document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname.includes('pc')) {
  fetch(url, options)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      displayProductCards(result.products);
    })
    .catch(error => {
      console.error(error);
      document.getElementById('computers').textContent = 'Error retrieving data.';
    });
  }
});

/* For testing some DATA
const data = {
  page: 1,
  pageCount: 16,
  products: [
    {
      name: 'Gaming HP RGB Desktop PC, Intel Quad I5 up to 3.6GHz, GeForce RTX 2060 6G GDDR6, 32GB DDR4, 128G SSD + 3TB, WiFi & Bluetooth, RGB Keyboard & Mouse, Win 10 Pro (Renewed)',
      leftInStock: null,
      image: {
        url: 'https://m.media-amazon.com/images/I/61tiPv3AkAL._AC_UY218_.jpg',
        description: 'Gaming HP RGB Desktop PC, Intel Quad I5 up to 3.6GHz, GeForce RTX 2060 6G GDDR6, 32GB DDR4, 128G SSD + 3TB, WiFi & Bluetoo...',
      },
      totalReviews: 21,
      rating: 4.15,
      sponsored: false,
      amazonChoice: false,
      bestSeller: false,
      amazonPrime: false,
      price: {
        discounted: false,
        priceSymbol: '$',
        currentPrice: 439.99,
        priceFraction: '99',
        beforePrice: null,
      },
      asin: 'B089QX3MFF',
      url: 'https://www.amazon.com/dp/B089QX3MFF',
      position: 1,
    },
    // Add more product objects here...
  ],
}; */ 

// Formats the price good
function formatPrice(price) {
  if (price.discounted) {
    return `Sale: ${price.priceSymbol}${price.currentPrice}`;
  } else {
    return `${price.priceSymbol}${price.currentPrice}`;
  }
}

// Helps with the stock availability
function formatStock(stock) {
  return stock ? stock : 'Out of stock';
}

// Creates the computer HTML "card"
function createProductCard(product) {
	const card = document.createElement('div');
	card.classList.add('product-card');
	
	card.appendChild(document.createElement('br')); // Good line break
	
	const name = document.createElement('h2');
	name.textContent = product.name;
	card.appendChild(name);
	
	const image = document.createElement('img');
	image.src = product.image.url;
	image.alt = product.image.description;
	card.appendChild(image);
	
	const price = document.createElement('p');
	price.textContent = formatPrice(product.price);
	card.appendChild(document.createElement('br')); // Another cool line break
	price.style = 'font-weight: bold; color: green';
	card.appendChild(price);

	const rating = document.createElement('p');
	rating.textContent = `Rating: ${product.rating}`;
	card.appendChild(rating);

	if (product.leftInStock) {
	const stock = document.createElement('p');
	stock.textContent = formatStock(product.leftInStock);
	card.appendChild(stock);
	stock.style = 'color: red';
	}

	const totalReviews = document.createElement('p');
	totalReviews.textContent = `Total Reviews: ${product.totalReviews}`;
	card.appendChild(totalReviews);

	const link = document.createElement('a');
	link.href = product.url;
	link.textContent = 'View on Amazon';
	card.appendChild(link);
	
	return card;
}

// Displays the product cards
function displayProductCards(products) {
  products.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

window.onload = () => {document.getElementById("topNav").innerHTML = techNavbar();
document.getElementById("sideNav").innerHTML = techSidebar();
};