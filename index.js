import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js'
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js'

const firebaseConfig = {}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const refInDB = ref(database, 'leads')

let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')

// tabBtn.addEventListener('click', function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     myLeads.push(tabs[0].url)
//     localStorage.setItem('myLeads', JSON.stringify(myLeads))
//     render(myLeads)
//   })
// })

onValue(refInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists() //Con esto verificamos si la captura de la referencia existe
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
  }
  return //Sí no existe, no hacemos nada
})

function render(leads) {
  let itemsList = ''
  for (let i = 0; i < leads.length; i++) {
    itemsList += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
  }
  ulEl.innerHTML = itemsList
}

deleteBtn.addEventListener('dblclick', function () {
  remove(refInDB) //Método para eliminar completamente la referencia de la bd
  ulEl.innerHTML = ''
})

inputBtn.addEventListener('click', function () {
  push(refInDB, inputEl.value) //Método para ingresar los valores del input a la bd
  inputEl.value = ''
})
