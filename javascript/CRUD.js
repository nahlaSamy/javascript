var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productContainer = [];
var productTable = document.getElementById("productTable");
var submitButton = document.getElementById("submitButton");
console.log(localStorage.getItem("hmada"));
if (localStorage.getItem("productData") == null) {
    console.log("new user");
    productContainer = [];
} else {
    console.log("alrady ");
    productContainer = JSON.parse(localStorage.getItem("productData"));
    console.log(productContainer);
    displayProducts()
}

function addProduct() {
    if (validateInputs()) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDescription.value,
        };
        productContainer.push(product);
        // JSON
        localStorage.setItem("productData", JSON.stringify(productContainer));
        clearForm();
        displayProducts();
    } else {
        alert("You should fill all inputs");
    }
}

function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}


function displayProducts() {
    var cartona = ``
    for (var i = 0; i < productContainer.length; i++) {
        cartona += creatRow(i);
    }
    productTable.innerHTML = cartona;

}

function validateInputs() {

    if (productName.value != '' && productPrice.value != '' &&
        productCategory.value != '' && productDescription.value != '') {
        return true;
    } else {
        return false
    }
}

function deleteProduct(productIndex) {

    productContainer.splice(productIndex, 1);
    localStorage.setItem("productData", JSON.stringify(productContainer));

    displayProducts()
}

function updateProduct(index) {

    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDescription.value = productContainer[index].desc;
    submitButton.innerText = 'update'
}

function searchProducts(inputVal) {
    console.log(inputVal);
    var cartona = ``
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(inputVal.toLowerCase())) {
            cartona += creatRow(i);
        }


    }
    productTable.innerHTML = cartona;
}


function creatRow(i) {
    return `<tr><td>${i}</td>
          <td id="fgh">${productContainer[i].name}</td>
                            <td> ${productContainer[i].price}</td>   
                            <td>${productContainer[i].category}</td>
                        <td>${productContainer[i].desc} </td>
                        <td><button class="btn btn-outline-info" onclick="updateProduct(${i})">update</button></td>
                         <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
                        <tr>
        `;
}