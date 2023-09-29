const socketClient = io();

const productList = document.getElementById("productList");
const addProductForm = document.getElementById("addProductForm");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addProductForm);
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  const reader = new FileReader();
  reader.onload = function () {
    jsonData.price = parseInt(jsonData.price);
    jsonData.stock = parseInt(jsonData.stock);
    jsonData.imageName = jsonData.thumbnail.name;
    jsonData.imageBuffer = reader.result;
    socketClient.emit("addProduct", jsonData);
  };
  const file = formData.get("thumbnail");
  reader.readAsDataURL(file);

  addProductForm.reset();
});

socketClient.on("products", (data) => {
  let productElm = "";

  data.forEach((product) => {
    const imagenURI = product.imageBuffer || `/images/${product.thumbnail}`;
    productElm += `
  <li>
 <img src="${imagenURI}"  />
    <h3>${product.title}</h3>
    <h4>${product.description}</h4>
    <h5>$ ${product.price}</h5>
    <h6>stock: ${product.stock}</h6>
    <button onClick="deleteProduct(${product.id})">delete</button>
  </li>`;
    productList.innerHTML = productElm;
  });
});

const deleteProduct = (id) => {
  socketClient.emit("deleteProduct", id);
};
