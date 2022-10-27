import JsonDecoder from "./JsonDecoder.js";

const str = `
{
   "products": [
     {
       "id": 1,
       "title": "iPhone 9",
       "description": "An apple mobile which is nothing like apple",
       "price": 549,
       "discountPercentage": 12.96,
       "rating": 4.69,
       "stock": 94,
       "brand": "Apple",
       "category": "smartphones",
       "thumbnail": "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
       "images": [
         "https://dummyjson.com/image/i/products/1/1.jpg",
         "https://dummyjson.com/image/i/products/1/2.jpg",
         "https://dummyjson.com/image/i/products/1/3.jpg",
         "https://dummyjson.com/image/i/products/1/4.jpg",
         "https://dummyjson.com/image/i/products/1/thumbnail.jpg"
       ]
     },
     {
       "id": 2,
       "title": "iPhone X",
       "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
       "price": 899,
       "discountPercentage": 17.94,
       "rating": 4.44,
       "stock": 34,
       "brand": "Apple",
       "category": "smartphones",
       "thumbnail": "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
       "images": [
         "https://dummyjson.com/image/i/products/2/1.jpg",
         "https://dummyjson.com/image/i/products/2/2.jpg",
         "https://dummyjson.com/image/i/products/2/3.jpg",
         "https://dummyjson.com/image/i/products/2/thumbnail.jpg"
       ]
     },
     {
      "id": 2,
      "title": "iPhone X",
      "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      "price": 899,
      "discountPercentage": 17.94,
      "rating": 4.44,
      "stock": 34,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
      "images": [
        "https://dummyjson.com/image/i/products/2/1.jpg",
        "https://dummyjson.com/image/i/products/2/2.jpg",
        "https://dummyjson.com/image/i/products/2/3.jpg",
        "https://dummyjson.com/image/i/products/2/thumbnail.jpg"
      ]
    },
    {
      "id": 2,
      "title": "iPhone X",
      "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      "price": 899,
      "discountPercentage": 17.94,
      "rating": 4.44,
      "stock": 34,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
      "images": [
        "https://dummyjson.com/image/i/products/2/1.jpg",
        "https://dummyjson.com/image/i/products/2/2.jpg",
        "https://dummyjson.com/image/i/products/2/3.jpg",
        "https://dummyjson.com/image/i/products/2/thumbnail.jpg"
      ]
    }
   ],
   "total": 100,
   "skip": 0,
   "limit": 30
 }
`;

const decoder = new JsonDecoder(str);

const result = decoder.parse();

console.log(JSON.stringify(result, null, 1));
