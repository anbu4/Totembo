const btn = document.querySelector('.btn');
      cardsFront = document.querySelectorAll('.card_front');
      itemDiscount = document.querySelectorAll('.item_discount p');
      itemsContentImg = document.querySelectorAll('.item_content img');
      itemsContentName = document.querySelectorAll('.item_content div p');
      itemsContentPrice = document.querySelectorAll('.item_content div ul');
      navbarLinks = document.querySelectorAll('.navbar2_left a');
      navbarBar = document.querySelector('.mob_navbar2');
      modalCloseBtn = document.querySelector('.close_modal');
      mainShopBtn = document.querySelector('.shop_btn');
      shopping = document.querySelector('.shopping');
      shopBtns = document.querySelectorAll('.item_svg-shop');
      shopModalClose = document.querySelector('.btn_close-modal') 
      content = document.querySelector('.content');
      mainLIkeBtn = document.querySelector('.like_btn');
      likeCardBox = document.querySelector('.like_card-box');
      logContent = document.querySelector('.login__content');


let gerLetters = /[^A-za-zA]/g;
let gerNumber = /[^0-9]/g;
let foundLike = true;
let foundShop = true;






// event
cardsFront.forEach(function(el){
    el.addEventListener('click',function(){
        let headerItem1 = document.querySelector('.header_item1');
        let headerItem2 = document.querySelector('.header_item2');
        let headerItem3 = document.querySelector('.header_item3');
        let itemClassName = el.className.replace(/card_front/,'');

        if(itemClassName == ' header_item2'){
            el.classList.add('header_item1');
            el.classList.remove('header_item2');
            headerItem1.classList.add('header_item3');
            headerItem1.classList.remove('header_item1');
            headerItem3.classList.add('header_item2');
            headerItem3.classList.remove('header_item3');
        }
        if(itemClassName == ' header_item3'){
            el.classList.add('header_item1');
            el.classList.remove('header_item3');
            headerItem1.classList.add('header_item2');
            headerItem1.classList.remove('header_item1');
            headerItem2.classList.add('header_item3');
            headerItem2.classList.remove('header_item2');
        }
  
    })
})

mainLIkeBtn.addEventListener('click',function(){
    likeCardBox.scrollIntoView({
        behavior:'smooth',
    })
    window.scrollBy({
        top:-200,
    })
})

mainShopBtn.addEventListener('click', _openShopingModal);

shopModalClose.addEventListener('click', ()=>{
    shopping.classList.toggle('flex')
    shopping.querySelectorAll('.item_shop').forEach((n)=>{n.remove()});
})




function _computeCardDiscount(obj){
    for(let index in obj){
        obj[index].forEach(el=>{
            let numDiscount = +el.discount.replace(gerNumber,'');
            if(numDiscount > 20){
                _createCardDiscount(el)
            }
        })
    }
}
_computeCardDiscount(base)

function _createCardDiscount(obj){
    let contentItem = document.createElement('div');
    contentItem.classList.add('content_item');
    contentItem.classList.add('header_item');
    contentItem.innerHTML = `
    <div class="item_discount ">
        <p>${obj.discount}</p>
    </div>
    <div class="item_content">
        <img class="content_img" src="${obj.url}">
    <div>
        <p>${obj.name}</p>
        <ul>${obj.price}</ul>
    </div>
    </div>
    <div class="item_svg">
        <div class="item_svg-like" onclick="likeBtnOnclick(this)">
            <img src="images/like.svg">
        </div>
        <div class="item_svg-shop" onclick="shopBtnOnclick(this)">
            <img src="images/korzina.svg">
        </div>
    </div>
    `

    content.appendChild(contentItem);
}

function _modalMove(){
    navbarBar.classList.toggle('modal_move');
    modalCloseBtn.classList.toggle('modal_move')
}

function _groupingItem(obj){
        let i = 0;
        cardsFront.forEach(function(el){
            el.classList.add('collect_item');
            setTimeout(()=>{
                itemDiscount[i].innerHTML = obj[i].discount;
                itemsContentName[i].innerHTML = obj[i].name;
                itemsContentPrice[i].innerHTML = obj[i].price;
                itemsContentImg[i].src = obj[i].url;
                i++
            },900)
            setTimeout(() => {
                el.classList.remove('collect_item')
            }, 1500);
        })
}

function shopBtnOnclick(el){
    if(foundShop){
        el.style.background = 'rgba(162, 250, 162, 0.867)';
        foundShop = false

        let parent = el.parentNode.parentNode;
        let discount = parent.querySelector('.item_discount p').innerHTML;
        let name = parent.querySelector('.item_content div p').innerHTML;
        let price = parent.querySelector('.item_content div ul').innerHTML;

        shopBase.push({
            id: shopBase.length,
             name,price,discount
        })

        setTimeout(() => {
            el.style.background = 'var(--white)';
             foundShop = true
        }, 1100);
    }    
}

function likeBtnOnclick(el){
    if(foundLike){
        el.style.background = 'rgba(246, 51, 51, 0.797)';
        foundLike = false

        let parent = el.parentNode.parentNode;
        let discount = parent.querySelector('.item_discount p').innerHTML;
        let name = parent.querySelector('.item_content div p').innerHTML;
        let price = parent.querySelector('.item_content div ul').innerHTML;
        let img = parent.querySelector('.item_content img').src

        let cardLike = document.createElement('div');
        cardLike.classList.add('header_item');
        cardLike.innerHTML = `
        <div class="item_discount ">
            <p>${discount}</p>
        </div>
        <div class="item_content">
            <img class="content_img" src="${img}">
            <div>
                <p>${name}</p>
                <ul>${price}</ul>
            </div>
        </div>
        <div class="item_svg">
            <span class="item_like-remove" onclick="this.parentNode.parentNode.remove()">
                <img src="images/cross.png">
            </span>
            <div class="item_svg-shop" onclick="shopBtnOnclick(this)">
                <img src="images/korzina.svg">
            </div>
        </div>
        `
        likeCardBox.prepend(cardLike)
        

        setTimeout(() => {
            el.style.background = 'var(--white)';
             foundLike = true
        }, 1100);
    }    
}

function _openShopingModal(){
    shopping.classList.toggle('flex')

    shopBase.forEach(el=>{
        let itemShop = document.createElement('div');
        itemShop.classList.add('item_shop');
        itemShop.dataset.id = el.id
        itemShop.innerHTML = `
            <p>${el.name}</p>
            <ul>${el.price}</ul>
            <ol>Скидка: <span>${el.discount}</span></ol>
            <div class="btn_remove-item">
                <img src="images/cross.png">
            </div>
        `
        shopping.appendChild(itemShop)
    })
    let removeItem = shopping.querySelectorAll('.btn_remove-item');
    removeItem.forEach(btn=>{
        btn.addEventListener('click',()=>{
            btn.parentNode.remove()
            let id = btn.parentNode.dataset.id;
            shopBase.forEach(obj=>{
                if(obj.id == id){
                    shopBase.splice(shopBase.indexOf(obj),1)
                }
            })
        })
    })

    return shopping
}

function _theScroll(x,y){
    window.scrollTo({
        behavior: 'smooth',
        top:x,
        left:y,
    });
}

function logInContent(){
    logContent.style.top = '20%' 
}
function logInContentOff(){
    logContent.style.top = '-200%'
}


















