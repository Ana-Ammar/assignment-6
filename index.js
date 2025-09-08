
// categories load

const categoriesContainer = document.getElementById('categories-container')
const loadCategories = () => {

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
        defaultBtn.classList.add('bg-[#15803d]', 'text-white', 'font-medium')

        defaultBtn.addEventListener('click' , () => {
            loadAllPlants()
        })
    
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
            loadPlantsByCategories(e.target.id)
        }
    })
}


// load all plants 
const treeContainer = document.getElementById('tree-container')

const loadAllPlants = () => {
    treeContainer.innerHTML = '';
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
        const plants = data.plants;
        plants.forEach(plant => {
            treeContainer.innerHTML += `
                <div id="${plant.id}" class="card p-4 bg-white rounded-lg">
                <img src="${plant.image}" alt="" class="rounded-lg">
                <h1 class="font-semibold mt-3">${plant.name}</h1>
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


// load by categories
const loadPlantsByCategories = (id) => {
    treeContainer.innerHTML = '';
    
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
        const plants = data.plants;
        plants.forEach(plant => {
            treeContainer.innerHTML += `
                <div id="${plant.id}" class="card p-4 bg-white rounded-lg">
                <img src="${plant.image}" alt="" class="rounded-lg">
                <h1 class="font-semibold mt-3">${plant.name}</h1>
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



loadCategories()