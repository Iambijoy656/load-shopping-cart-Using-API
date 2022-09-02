const loadAllProducts = async () => {
    const url = `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const setAllmenu = async () => {
    const data = await loadAllProducts();
    // console.log(data)

    const menu = document.getElementById('all-menu');
    for (const product of data) {
        // console.log(product.category)
        const li = document.createElement('li');
        li.innerHTML = `
        <a>${product.category}</a>
      `
        menu.appendChild(li)


    }

}

setAllmenu();