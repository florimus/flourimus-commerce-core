const { isDelta, deltaSuccess } = require("../delta");

const scriptId = "R1.0.0/script-05";

const script_05 = async (mongoose, env = "local") => {
  const isRunable = await isDelta(mongoose, scriptId);

  if (!isRunable) {
    console.log(`skipping script: ${scriptId}`);
    return;
  }

  const collection = mongoose.connection.collection("products");

  if (env) {
    await collection.insertMany([
      {
        "_id": "PRD001",
        "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "medias": [
          "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        ],
        "category": "men's clothing",
        "brand": "",
        "haveVariants": true,
        "isVariant": false,
        "isSellable": false,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD002",
        "name": "Mens Casual Premium Slim Fit T-Shirts",
        "medias": [
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        ],
        "category": "men's clothing",
        "brand": "",
        "haveVariants": true,
        "isVariant": false,
        "isSellable": false,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD003",
        "name": "Mens Cotton Jacket",
        "medias": [
          "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        ],
        "category": "men's clothing",
        "brand": "",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD004",
        "name": "Mens Casual Slim Fit",
        "medias": [
          "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        ],
        "category": "men's clothing",
        "brand": "",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD005",
        "name": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "medias": [
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "haveVariants": true,
        "isVariant": false,
        "isSellable": false,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD006",
        "name": "Solid Gold Petite Micropave",
        "medias": [
          "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "haveVariants": true,
        "isVariant": false,
        "isSellable": false,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD007",
        "name": "White Gold Plated Princess",
        "medias": [
          "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD008",
        "name": "Pierced Owl Rose Gold Plated Stainless Steel Double",
        "medias": [
          "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
          "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "haveVariants": true,
        "isVariant": false,
        "isSellable": false,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD009",
        "name": "WD 2TB Elements Portable External Hard Drive - USB 3.0",
        "medias": [
          "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
          "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "haveVariants": true,
        "isVariant": false,
        "isSellable": false,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "PRD010",
        "name": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        "medias": [
          "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
          "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU001",
        "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "medias": [
          "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        ],
        "category": "men's clothing",
        "brand": "",
        "parentId": "PRD001",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU002",
        "name": "Mens Casual Premium Slim Fit T-Shirts",
        "medias": [
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        ],
        "category": "men's clothing",
        "brand": "",
        "parentId": "PRD001",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU003",
        "name": "Mens Cotton Jacket",
        "medias": [
          "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
        ],
        "category": "men's clothing",
        "brand": "",
        "parentId": "PRD001",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU004",
        "name": "Mens Casual Slim Fit",
        "medias": [
          "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
        ],
        "category": "men's clothing",
        "brand": "",
        "parentId": "PRD001",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU005",
        "name": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "medias": [
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "parentId": "PRD001",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU006",
        "name": "Solid Gold Petite Micropave",
        "medias": [
          "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "parentId": "PRD001",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU007",
        "name": "White Gold Plated Princess",
        "medias": [
          "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "parentId": "PRD002",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU008",
        "name": "Pierced Owl Rose Gold Plated Stainless Steel Double",
        "medias": [
          "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "parentId": "PRD002",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU009",
        "name": "WD 2TB Elements Portable External Hard Drive - USB 3.0",
        "medias": [
          "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "parentId": "PRD002",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU010",
        "name": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        "medias": [
          "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "parentId": "PRD002",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU011",
        "name": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
        "medias": [
          "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "parentId": "PRD002",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU012",
        "name": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
        "medias": [
          "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "parentId": "PRD005",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU013",
        "name": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
        "medias": [
          "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "parentId": "PRD005",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU014",
        "name": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        "medias": [
          "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
        ],
        "category": "women's clothing",
        "brand": "",
        "parentId": "PRD005",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU015",
        "name": "MBJ Women's Solid Short Sleeve Boat Neck V",
        "medias": [
          "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"
        ],
        "category": "women's clothing",
        "brand": "",
        "parentId": "PRD006",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU016",
        "name": "Opna Women's Short Sleeve Moisture",
        "medias": [
          "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
        ],
        "category": "women's clothing",
        "brand": "",
        "parentId": "PRD006",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU017",
        "name": "DANVOUY Womens T Shirt Casual Cotton Short",
        "medias": [
          "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
        ],
        "category": "women's clothing",
        "brand": "",
        "parentId": "PRD006",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU018",
        "name": "Pierced Owl Rose Gold Plated Stainless Steel Double",
        "medias": [
          "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "parentId": "PRD008",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU019",
        "name": "Solid Gold Petite Micropave",
        "medias": [
          "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "parentId": "PRD008",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU020",
        "name": "White Gold Plated Princess",
        "medias": [
          "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "parentId": "PRD008",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU021",
        "name": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "medias": [
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
        ],
        "category": "jewelery",
        "brand": "",
        "parentId": "PRD008",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU022",
        "name": "WD 2TB Elements Portable External Hard Drive - USB 3.0",
        "medias": [
          "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "parentId": "PRD009",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      },
      {
        "_id": "SKU023",
        "name": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        "medias": [
          "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
        ],
        "category": "electronics",
        "brand": "",
        "parentId": "PRD009",
        "haveVariants": false,
        "isVariant": false,
        "isSellable": true,
        "variantInfo": [],
        "createdAt": "2024-06-16 01:45:56",
        "updatedAt": "2024-06-16 01:45:56",
        "isActive": true,
        "createdBy": "script@R1.0.0-05",
        "updatedBy": "script@R1.0.0-05",
        "metaStatus": "2024-06-16 01:45:54"
      }
    ]);
    console.log("Dummy Products and its variants inserted successfully.");
  }
  if (env === "local") {
  }
  if (env === "uat") {
  }
  if (env === "prod") {
  }

  await deltaSuccess(mongoose, scriptId);
};

module.exports = script_05;
