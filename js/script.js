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

new Menu(
  "img/tabs/1.png",
   "vegy", 
   "Usual",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.", 
    10,
    '.menu .container',
).render()

new Menu(
  "img/tabs/2.jpg",
   "elite", 
   "Premium",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.", 
    15,
    '.menu .container',
).render()

new Menu(
  "img/tabs/3.jpg",
   "post", 
   "VIP",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.", 
    20,
    '.menu .container',
    "menu__item"
).render()

// menu class companent end



// forms start

const forms = document.querySelectorAll("form")

forms.forEach((form) => {
  formpost(form)
})

const msg = {
  loading: "img/spinner.svg",
  succes: "thanks you for submiting",
  failore: "something went wrong"
 }

function formpost(form) {
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
    
    let obj = {}
    formdata.forEach((key, val)  => {
      obj[key] = val
    })
    

    fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
    .then(data => data.text())
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

