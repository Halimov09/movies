

const firstTab = document.querySelectorAll(".tabheader__item"),
  secondTab = document.querySelectorAll(".tabcontent"),
  loader = document.querySelector(".loader")



// loader start
  function loadHidden() {
    setTimeout(() => {
      loader.style.opacity = "0"
      setTimeout(() => {
      loader.style.display = "none"
      }, 500);
    }, 500);
    
  }

  loadHidden()
// loader end


// date start
let getDate = "2024-07-29"

function date(date) {
  let nowdate = Date.parse(date) - Date.parse(new Date()),
   days = Math.floor(nowdate / (1000 * 60 * 60 * 24)),
   hours = Math.floor(nowdate / (1000 * 60 * 60) % 24),
   minutes = Math.floor(nowdate / (1000 * 60) % 60),
   secondes = Math.floor(nowdate / (1000) % 60)

   return {nowdate, days, hours, minutes, secondes}
  
}

function getZero(params) {
  if (params > 0 && params < 10) {
    return `0${params}`
  }else{
    return params
  }
}

function dateChanges(selector, getDate) {
  const tzone = document.querySelector(selector),
    days = tzone.querySelector("#days"),
    hours = tzone.querySelector("#hours"),
    minutes = tzone.querySelector("#minutes"),
    seconds = tzone.querySelector("#seconds")
    updatedate = setInterval(update, 1000)

    function update() {
      const dateReturn = date(getDate)
      days.innerHTML = getZero(dateReturn.days)
      hours.innerHTML = getZero(dateReturn.hours)
      minutes.innerHTML = getZero(dateReturn.minutes)
      seconds.innerHTML = getZero(dateReturn.secondes)

      
      if (dateReturn.nowdate <= 0) {
      clearInterval(updatedate)
      days.innerHTML ="00"
      hours.innerHTML = "00"
      minutes.innerHTML ="00"
      seconds.innerHTML ="00"
      }

    }
  
}

dateChanges(".timer", getDate)

// date end




// tab change genre start
  firstTab.forEach((item, i) => {
    item.addEventListener("click", () => {
        toggle(firstTab, "tabheader__item_active")
        secondShow(secondTab, i)
        if (!item.classList.contains("tabheader__item_active")) {
            item.classList.add("tabheader__item_active")
        }
    })
  })



  function toggle(params, key) {
    params.forEach((item) =>{
        item.classList.remove(key)
    })
  }

  function secondShow(key, value){
    key.forEach((item, i) => {
        if (value == i) {
            toggle(secondTab, "tabshow")
            item.classList.add("tabshow")
        }
    })
  }
// tab change genre end


// modal  start


  
  
  const modaltrigger = document.querySelectorAll('[data-modal]'),
    dataclose = document.querySelector(".modal__close"),
    modal = document.querySelector(".modal")
  
    modaltrigger.forEach((item) => {
      item.addEventListener("click", () =>{
       if (!item.classList.contains("tabcontent")) {
        startmodal()
       }else{
        closemodall()
       }
      })
    })
  
  
   
  modal.addEventListener("click", (e) => {
    const event = e.target
    if (event.classList.contains("tabshow") || event.classList.contains("modal__close")) {

      closemodall()
    }else{
     startmodal()
    }
  })

  function startmodal() {
    modal.classList.add("tabshow")
    modal.classList.remove("tabcontent")
    document.body.style.overflow  = "hidden"
  }
  
  function closemodall() {
    modal.classList.add("tabcontent")
    modal.classList.remove("tabshow")
    document.body.style.overflow  = "auto"
  }

 function clientHeight() {
  if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
    startmodal()
    window.removeEventListener("scroll", clientHeight)
  }
 }

 window.addEventListener("scroll", clientHeight)



// modal end


// menu class companent start

class Menu {
  constructor(src, alt, title, desc, price,  parenSelector, ...classes) {
    this.src = src,
    this.alt = alt,
    this.title = title,
    this.desc = desc,
    this.price = price,
    this.classes = classes
    this.parents = document.querySelector(parenSelector),
    this.transfer = 11260,
    this.changeUzs() 
  }


  changeUzs() {
    this.price = this.price * this.transfer
  }

  render () {
    const element = document.createElement("div");

    if (this.classes.length === 0) {
      this.element = "menu__item";
      element.classList.add(this.element)
      }else{
        this.classes.forEach((clas) => element.classList.add(clas))
      }


    element.innerHTML =`
    
        <img src=${this.src} alt=$${this.alt} />
        <h3 class="menu__item-subtitle">Plan "${this.title}"</h3>
        <div class="menu__item-descr">
            ${this.desc}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total">$${this.price} uzs/month</div>
        </div>
    `

    this.parents.append(element)
  }

}

axios.get("http://localhost:3000/menu").then((data) => {
  data.data.forEach(({src, alt, title, desc, price}) => {
    new Menu(src, alt, title, desc, price, '.menu .container').render()
  })
})


// menu end

// forms start

const forms = document.querySelectorAll("form")

forms.forEach((form) => {
  bindPostdata(form)
})

 async function postData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data,
  })
  return await res.json()
}

const msg = {
  loading: "img/spinner.svg",
  succes: "thanks you for submiting",
  failore: "something went wrong"
 }

function bindPostdata(form) {
  form.addEventListener("submit", (e) =>{
    e.preventDefault()

    

    const statusmessage = document.createElement("img")
    statusmessage.src = msg.loading

    statusmessage.style.cssText = `
    display: block;
    margin: 0 auto;
    `
    form.insertAdjacentElement("afterend", statusmessage)

    const formdata = new FormData(form)
   
    
    let obj = JSON.stringify(Object.fromEntries(formdata.entries()))
    

    postData("http://localhost:3000/request", obj)
    .then(data => {
      console.log(data);
      showthanksModal(msg.succes)
      statusmessage.remove()
    })
    .catch(() => {
      console.log("error");
        showthanksModal(msg.failore)
    }).finally(() => {
      form.reset()
    })
  
  })

  function showthanksModal(data) {
    const modialog = document.querySelector(".modal__dialog")

    modialog.classList.add("tabcontent")
    modialog.classList.remove("tabshow")
    startmodal()

    const thanksModal = document.createElement("div")
    thanksModal.classList.add("modal__dialog")    
     
    thanksModal.innerHTML = `
     <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">
        ${data}
      </div>
     </div>
    `
    document.querySelector(".modal").append(thanksModal)

    setTimeout(() => {
     thanksModal.remove()
     modialog.classList.add("tabshow")
     modialog.classList.remove("tabcontent")
     closemodall()
    }, 3000)
  }


}



// slider start

const slides = document.querySelectorAll(".offer__slide"),
  prev = document.querySelector(".offer__slider-prev"),
  next = document.querySelector(".offer__slider-next"),
  current = document.querySelector("#current"),
  total = document.querySelector("#total"),
  slidesWrapper = document.querySelector(".offer__slider-wrapper"),
  slidefield = document.querySelector(".offer__slider__inner"),
  width = window.getComputedStyle(slidesWrapper).width,
  bigSlide = document.querySelector(".offer__slider")


  let slideIndex = 1
  let offset = 0

 function remem() {
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`
    current.textContent = `0${slideIndex}`
  }else{
    total.textContent = slides.length
    current.textContent = slideIndex
  }
 }

 const dotsidicators = document.createElement("ol")
 dotsidicators.classList.add("idicators")
 bigSlide.append(dotsidicators)

 let dotArr = []
 
 for (let i = 0; i < slides.length; i++){
  const dot = document.createElement("li")
  dot.setAttribute("data-dot", i + 1)
  dot.classList.add("dotclass")
  dotsidicators.append(dot)
  dotArr.push(dot)
  if (i === 0) {dot.style.opacity = 1}
 }



 remem()

slidefield.style.width = 100 * slides.length + "%"
slidefield.style.display = "flex"
slidesWrapper.style.overflow = "hidden"
slidefield.style.transition = ".5s"

slides.forEach(slide =>{
  slide.style.width = width
})

next.addEventListener("click", () => {
  if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
    offset = 0
  }else{
    offset += +width.slice(0, width.length - 2)
  }
  slidefield.style.transform = `translateX(-${offset}px)`

  if (slideIndex == slides.length) {
    slideIndex = 1
  }else{
    slideIndex ++
  }
  remem()

  dotArr.forEach((dot) => {
    dot.style.opacity = ".5"
  })
  dotArr[slideIndex - 1].style.opacity = "1"

})


prev.addEventListener("click", () => {
  
  if (offset == 0 ) {
    offset = slidefield.clientWidth / slides.length * (slides.length - 1)
  }else{
    offset -= slidefield.clientWidth / slides.length
    offset = offset.toFixed(2)
  }  
  slidefield.style.transform = `translateX(-${offset}px)`

  if (slideIndex == 1) {
    slideIndex = slides.length
  }else{
    slideIndex --
  }
  remem()
  dotArr.forEach((dot) => {
    dot.style.opacity = ".5"
  })
  dotArr[slideIndex - 1].style.opacity = "1"
})

dotArr.forEach(dot => {
  dot.addEventListener("click", (e) =>{
    const key = e.target.getAttribute("data-dot")
    slideIndex = +key
    offset = +width.slice(0, width.length - 2) * (key - 1)
    slidefield.style.transform = `translateX(-${offset}px)`
    dotArr.forEach((dot) => {
      dot.style.opacity = ".5"
    })
    dotArr[slideIndex - 1].style.opacity = "1"
    remem()
  })
}) 

// slider end

