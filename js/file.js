const loadAllProducts = async () => {
    const url = `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const setAllmenu = async () => {
    const data = await loadAllProducts();
    // console.log(data)
    const uniqueArray = [];
    const menu = document.getElementById('all-menu');
    for (const product of data) {
        // console.log(product.category)
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category)
            const li = document.createElement('li');
            li.classList.add('font-medium', 'text-violet-900')
            li.innerHTML = `
            <a>${product.category}</a>
            `
            menu.appendChild(li)
        }
    }

}

setAllmenu();



const searchField = document.getElementById('search-field');


searchField.addEventListener('keypress', async (event) => {

    //add spinner
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden')


    if (event.key === 'Enter') {
        // console.log(searchField.value)

        const searchValue = searchField.value;
        const allProducts = await loadAllProducts();
        // console.log(allProducts);

        spinner.classList.add('hidden')



        //Found product
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        console.log(foundProducts)

        const productContainer = document.getElementById('product-container');
        productContainer.textContent = '';
        const notFound = document.getElementById('not-found');
        notFound.innerHTML = '';

        //not found msg
        if (foundProducts.length === 0) {
            notFound.innerHTML = `<h2 class="text-3xl text-orange-700 text-center" >Product Not Found. Please Try Again!!</h2>`
            return;
        }

        foundProducts.forEach(product => {


            const { category, image, title, price, description } = product;

            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card w-full h-full bg-base-100 shadow-xl">
                <figure><img class="h-60 w-full" src="${image}"></figure>
                <div class="card-body">
                    <h2 class="card-title">${category}</h2>
                    <p class="text-xl">Price: ${price}</p>
                    <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
                    <div class="card-actions justify-center">
                    <a href="#my-modal-2" class="btn btn-accent" onclick="showModal('${image}',${price},'${description}')">Show Modal</a>
                    </div>
                </div>
            </div>
            `
            productContainer.appendChild(div);

        });

    }
})


const showModal = (image, price, description) => {
    // console.log(description, image, price);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
         <img src="${image}" alt="">
        <h3 class="font-bold text-lg">Price: ${price}</h3>
        <p class="py-4">Description: ${description}</p>
        <div class="modal-action">
        <a href="#" class="btn">Close!</a>
    </div>
    `

}

