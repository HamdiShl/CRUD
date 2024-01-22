let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count  = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//console.log(title,price,taxes,ads,discount,total,count,category,submit);

// define an variables got create to use it in the UpdateData function
let mood = 'Create';

// define an Dumny variable to be showed to the all function
let tpm; 

// get total 

function getTotal(){
    if(price.value !='')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='#f10';
    }
}
// create product

let dataproduct;
if(localStorage.product != null)
{
    dataproduct = JSON.parse(localStorage.product); // return the data into local storage to her origine
}
else{
    dataproduct = [];
}



submit.onclick = function (){
    let newproduct = {
        title:title.value.toLowerCase(), // when we enter a title value he becames Lower case by default
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(), // when we enter a Category value he becames Lower case by default
    }
    
    // clean Data 
    if(title.value != '' && 
    price.value != '' &&
    category.value != '' &&
    newproduct.count <= 100) // the rules to create an object product 
    {
        if (mood === 'Create')
    {
        if (newproduct.count > 1 )
    {
        for(let j =0; j < newproduct.count; j++)
        {
            dataproduct.push(newproduct);
           
        }
        
    }
    else
    {
        dataproduct.push(newproduct);
    }
    }
    else
    {
        dataproduct[tpm] = newproduct;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';



    }
    clearData(); // the system cleared the data when he create an object 
    }
    
    // save data into local storage
    localStorage.setItem('product' , JSON.stringify(dataproduct));
    
    //clearData();
    readData();
    
}


// clear inputs 

function clearData(){
    title.value= '';
    price.value= '';
    taxes.value= '';
    ads.value= '';
    discount.value = '';
    total.innerHTML= '';
    count.value = '';
    category.value = '';


}
// read data 

function readData(){
   
    let table ='';
    for(let i = 0; i<dataproduct.length; i++)
    {
        table+=`
        <tr>
                    <td>${i+1}</td>
                    <td>${dataproduct[i].title}</td>
                    <td>${dataproduct[i].price}</td>
                    <td>${dataproduct[i].taxes}</td>
                    <td>${dataproduct[i].ads}</td>
                    <td>${dataproduct[i].discount}</td>
                    <td>${dataproduct[i].total}</td>
                    <td>${dataproduct[i].category}</td>
                    <td id="btnupdate" onclick="updateData(${i})"><button>update</button></td>
                    <td id="btndelete" onclick="deleteData(${i})"><button>delete</button></td>

                </tr>
`
        
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteall = document.getElementById('DeleteAll');
    if(dataproduct.length>0)
    {
       btnDeleteall.innerHTML = `<button onclick="deleteAll()">Delete All (${dataproduct.length})</button>`
    }
    else
    {
        btnDeleteall.innerHTML = '';
    }
    
    // runs the getTotal() function cz when after we create or update an product the item total become red color
    getTotal(); 

}

readData();
//count



// delete data 

function deleteData(i)
{
    dataproduct.splice(i,1);
    localStorage.product = JSON.stringify(dataproduct);
    readData();
}

// Delete All Data

function deleteAll()
{
    localStorage.clear();
    dataproduct.splice(0);
    readData();

}
//update

function updateData(i)
{
        title.value = dataproduct[i].title;
        price.value = dataproduct[i].price;
        taxes.value = dataproduct[i].taxes;
        ads.value = dataproduct[i].ads;
        discount.value = dataproduct[i].discount;
        category.value = dataproduct[i].category;
        // make the input count hide when we click update
        count.style.display = 'none'; 
        // change the butoon Create to Update when we click update who is exist in the table
        submit.innerHTML='Update';
        // change the mood content from create to upbdate 
        mood = 'Update';

        // give the dummny variable an value 
        tpm = i; // tpm are knwed by the all of function in this code 
        
        // when i click on button update the cursor up to top with smoothly mouvment
        scroll({
            top:0,
            behavior:'smooth'
        })
        // runs the getTotal() function cz when we click update the sum of product show into total
        getTotal();
}
//search 

let searchMood = 'title';

function getserchMood(id)
{
    let search = document.getElementById('search');
    if (id =='searchBytitle')
    {
        searchMood = 'Title';
        /*
        search.placeholder = 'Search by title'; // we want to minimise our code , i'll replace it with onother ligne of code after else

        */
    }
    else 
    {
        searchMood = 'Category';
        /*
        search.placeholder = 'Search by category';  // the samething about previous , i'll replace it with onother ligne of code after else
        */
    }
    search.placeholder = 'search by ' + searchMood;
    search.focus();

    // when we're in a search from category and click on the search by title return the input search empty
    search.value = '';

    // after the search value get empty the normally data are hiden so we need to show the normally data by calling the readData() function
    readData();
    
    //console.log(searchMood); //test searchmood function

}

function searchData(value)
{
    let table = '';
    if (searchMood == 'title')
    {
        for (let k =0; k < dataproduct.length; k++ )
        {
           if(dataproduct[k].title.includes(value.toLowerCase()) || dataproduct[k].title.includes(value. toUpperCase()) )
           {
             //console.log(k); // Test the vlue by console

             // get the form table from readData()

             table+=`
             <tr>
                         <td>${k}</td>
                         <td>${dataproduct[k].title}</td>
                         <td>${dataproduct[k].price}</td>
                         <td>${dataproduct[k].taxes}</td>
                         <td>${dataproduct[k].ads}</td>
                         <td>${dataproduct[k].discount}</td>
                         <td>${dataproduct[k].total}</td>
                         <td>${dataproduct[k].category}</td>
                         <td id="btnupdate" onclick="updateData(${k})"><button>update</button></td>
                         <td id="btndelete" onclick="deleteData(${k})"><button>delete</button></td>
     
                     </tr>`;

           } 
        }


    }
    else
    {
        for (let k =0; k < dataproduct.length; k++ )
        {
           if(dataproduct[k].category.includes(value.toLowerCase()) || dataproduct[k].title.includes(value. toUpperCase()) )
           {
             //console.log(k); // Test the vlue by console

             // get the form table from readData()

             table+=`
             <tr>
                         <td>${k}</td>
                         <td>${dataproduct[k].title}</td>
                         <td>${dataproduct[k].price}</td>
                         <td>${dataproduct[k].taxes}</td>
                         <td>${dataproduct[k].ads}</td>
                         <td>${dataproduct[k].discount}</td>
                         <td>${dataproduct[k].total}</td>
                         <td>${dataproduct[k].category}</td>
                         <td id="btnupdate" onclick="updateData(${k})"><button>update</button></td>
                         <td id="btndelete" onclick="deleteData(${k})"><button>delete</button></td>
     
                     </tr>`;

           } 
        } 
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data 

