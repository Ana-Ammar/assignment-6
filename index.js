
// categories load

const categoriesContainer = document.getElementById('categories-container')
const loadCategories = () => {
        showLoading()
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => {
        const categories = data.categories
        categories.forEach(cat => {
             categoriesContainer.innerHTML += `
            <li id="${cat.id}" class="cat-btns py-2 px-[10px] cursor-pointer rounded-md text-left hover:bg-[#15803d] hover:text-white hover:font-medium text-lg">${cat.category_name}</li>
        `
        });

        const defaultBtn = document.getElementById('default-btn')
       if(defaultBtn) {
         defaultBtn.classList.add('bg-[#15803d]', 'text-white', 'font-medium')
          defaultBtn.addEventListener('click' , () => {
            loadAllPlants()
        })
        
        }
        loadAllPlants()
        clickedBtn()
    })

    .catch(data => {
        console.log('error')
    })

        
}


   // clickedEvent
const clickedBtn = () => {
    categoriesContainer.addEventListener('click', (e) => {
        const allBtn = document.querySelectorAll('.cat-btns')
        allBtn.forEach(btn => {
            btn.classList.remove('bg-[#15803d]', 'text-white', 'font-medium')
        })
        
        if(e.target.classList.contains('cat-btns')){ 
            e.target.classList.add('bg-[#15803d]', 'text-white', 'font-medium') 
            const categoriesId = e.target.id
            if (e.target.id === 'default-btn') {
                loadAllPlants();
            } else {
                loadPlantsByCategories(categoriesId)
            }

        }
    })
}


// load all plants 
const treeContainer = document.getElementById('tree-container')


const loadAllPlants = () => {
    showLoading()
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        const plants = data.plants;
        hideLoading()
        plants.forEach(plant => {
            treeContainer.innerHTML += `
                <div id="${plant.id}" class="card p-4 bg-white rounded-lg flex flex-col">
                <div class="h-48 overflow-hidden">
                <img src="${plant.image}" alt="" class="rounded-lg w-full h-full object-cover">
                </div>
                <h1 class="font-semibold mt-3 cursor-pointer hover:font-bold">${plant.name}</h1>
                <p class="text-[#4c545f] py-3">${plant.description}</p>
                
                <div class=" flex justify-between items-center">
                    <span class="badge badge-lg bg-[#dcfce7] text-[#15803D] rounded-full">${plant.category}</span>

                    <p class="font-semibold">${plant.price}</p>
                </div>

                <div class="mt-3 flex flex-col content flex-1 h-full">
                  <button class="btn btn-block bg-[#15803d] text-white rounded-full">Add to Cart</button>
               
                </div>
            </div>
        `

        })
    })
}


// load by categories
const loadPlantsByCategories = (id) => {
    showLoading()
    
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
        const plants = data.plants;
        hideLoading();
        plants.forEach(plant => {
            treeContainer.innerHTML += `
                <div id="${plant.id}" class="card p-4 bg-white rounded-lg flex flex-col h-[400px]">
                <div class="h-48 overflow-hidden">
                <img src="${plant.image}" alt="" class="rounded-lg w-full h-full object-cover">
                </div>
                <h1 onclick="my_modal_2.showModal()" class="font-semibold mt-3 cursor-pointer hover:font-bold">${plant.name}</h1>
                <p class="text-[#4c545f] py-2">${plant.description}</p>
                
                <div class=" flex justify-between items-center">
                    <span class="badge badge-lg bg-[#dcfce7] text-[#15803D] rounded-full">${plant.category}</span>

                    <p class="font-semibold">${plant.price}</p>
                </div>

                <div class="mt-3">
                  <button class="btn btn-block bg-[#15803d] text-white rounded-full">Add to Cart</button>
               
                </div>
            </div>
        `
        })
    })
}

// Cart
const cartContainer = document.getElementById('cart-container')
let cart = [];

treeContainer.addEventListener('click', (e)=> {

    if(e.target.innerText === "Add to Cart"){
        const title = e.target.parentNode.parentNode.children[1].innerText
        const price = Number(e.target.parentNode.parentNode.children[3].children[1].innerText)
        const id = e.target.parentNode.parentNode.id

        cart.push({
            title: title,
            price: price,
            id: id
        })
        
        shoWinCart(cart)

        let totalPrice = document.getElementById('total-price')
        let updatedPrice = cart.reduce((total, tree) => total + tree.price, 0);
        totalPrice.innerText = updatedPrice
    }


    const showDetail = document.getElementById('my_modal_1')
    const treeDetail = document.getElementById('tree-detail')
    
    if(e.target.localName === 'h1') {
        const id = e.target.parentNode.id
        
        fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {

            const plant = data.plants;

           treeDetail.innerHTML = `
                <div id="${plant.id}" class="card p-4 bg-white rounded-lg flex flex-col justify-between">
                <img src="${plant.image}" alt="" class="rounded-lg h-2/4">
                <h1 class="font-semibold mt-3">${plant.name}</h1>
                <p class="text-[#4c545f] py-2">${plant.description}</p>
                
                <div class=" flex justify-between items-center">
                    <span class="badge badge-lg bg-[#dcfce7] text-[#15803D] rounded-full">${plant.category}</span>

                    <p class="font-semibold">${plant.price}</p>
                </div>
            </div>
        `
        })
         showDetail.showModal()
    }
})

const shoWinCart = (cart) => {
    cartContainer.innerHTML = '';
        cart.forEach(tree => {
        cartContainer.innerHTML += `
         <div class="flex justify-between items-center bg-[#f0fdf4] p-3 rounded-lg mb-2">
              <div>
                <p class="font-semibold">${tree.title}</p>
                <p class="text-[#889396]">
                  <span>${tree.price}</span> 
                  <i class="fa-solid fa-xmark fa-xs"></i> 
                  <span>1</span>
                </p>
              </div>
              <div onclick="cartProductDlt('${tree.id}')" class="text-[#889396] btn btn-ghost">
                <i class="fa-solid fa-xmark fa-xl"></i>
              </div>
            </div>
        `
        })
}

const cartProductDlt = (cartId) => {
    const updatedCart = cart.filter(product => product.id !== cartId ) 
    cart = updatedCart;
    shoWinCart(cart)

    let totalPrice = document.getElementById('total-price')
    let updatedPrice = cart.reduce((total, tree) => total + tree.price, 0);
    totalPrice.innerText = updatedPrice
}

const showLoading = () => {
    treeContainer.innerHTML = `
   <div class ="flex flex-row justify-center items-center col-span-3">
    <span class="loading loading-bars loading-xl"></span>
   </div>
    `
}

const hideLoading = () => {
    treeContainer.innerHTML = '';
}

loadCategories()