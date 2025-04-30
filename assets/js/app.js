const productUrl = "https://fakestoreapi.com/products";

setTimeout(async () => {
    let productData = await fetch(productUrl);
    productData = await productData.json();

    console.log(productData);

    let sorting = function(){
        return{
            sortToHigh: (arr) => {
                for(let i = 0; i < arr.length - 1; i++){
                    for(let j = 0; j < arr.length - 1 - i; j++){
                        if(arr[j].price > arr[j + 1].price){
                            let temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    }
                }
                return arr;
            },
            sortToLow: (arr) => {
                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = 0; j < arr.length - 1 - i; j++) {
                        if (arr[j].price < arr[j + 1].price) {
                            let temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    }
                }
                return arr;
            },      
        }
    }

    const sortFunctions = sorting();

    let productCard = document.querySelector("div.productsCard");
    
    let renderProducts = (data) => {
        productCard.innerHTML = data
        .map((item) => {
            return `
                <div class="col-sm-6 col-md-4 col-lg-3 d-flex">
                    <div class="card h-50" style="width: 100%;">
                        <img src="${item.image}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text" style="max-width: 100%;">${item.description}</p>
                            <p><strong>$${item.price}</strong></p>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");
    };

    renderProducts(productData); 

    const checking = (sortType) => {
        if(sortType === "sortToHigh"){
            const sorted = sortFunctions.sortToHigh([...productData]);
            renderProducts(sorted);
        }else if (sortType === "sortToLow"){
            const sorted = sortFunctions.sortToLow([...productData]);
            renderProducts(sorted);
        }
    }

    document.querySelectorAll('input[name="sortPrice"]').forEach((radiobut) => {
        radiobut.addEventListener("change", (e) => {
            if (e.target.checked){
                checking(e.target.value);
            }
        })
    })

    const selectedSort = document.querySelector('input[name="sortPrice"]:checked');
    if (selectedSort) {
        checking(selectedSort.value);
    }
}, 1000);  
  


