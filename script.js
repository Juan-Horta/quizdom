import {saveTask, getTasks, onGetTasks} from './firebase.js'

keydom();

let boolTabla = false
let boolForm = false
let boolImage = false
let boolColor = false

function keydom()
{
    document.addEventListener('keydown',
        function(event)
           {
              if(event.keyCode == 32) // Espacio
               {
                  tabla()
                  boolTabla = true
               }
              else if(event.keyCode == 40) // Fleha de abajo
               {
                  form()
                  boolForm = true
               }
              else if(event.keyCode == 38) // Fleha de arriba
               {
                  showImg()
                  boolImage = true
               }
              else if(event.keyCode == 66) // Fleha de arriba
               {
                  document.body.style.backgroundColor = "lightgreen"
                  boolColor = true
               }

               if(boolTabla && boolForm && boolImage && boolColor)
               {
                  document.querySelector('title').textContent = 'Quiz'
               }

           })
}

function tabla()
{
   let divTabla = document.getElementById("tabla")

   divTabla.innerHTML = ''

   //Crear elemento tabla
   let tabla = document.createElement("table")

   //Crear tr y td
   for(let i = 0; i < 6; i++){
      let row = document.createElement("tr")
      for(let j = 0; j < 6; j++){
         let data = document.createElement("td")
         let text = document.createTextNode(i + "" + j)

         data.appendChild(text)
         data.style.border = "1px solid"

         if(j == 2 && i == 2)
            data.style.backgroundColor = "red"

         row.appendChild(data)
      }
      row.style.border = "1px solid"
      tabla.appendChild(row)
   }

   //Llenar tabla y darle estilo
   tabla.style.border = "1px solid"
   tabla.style.borderCollapse = "collapse"
   divTabla.appendChild(tabla)
}

function form(){

   let divForm = document.getElementById("form")

   divForm.innerHTML = ''

   //Crear form
   let form = document.createElement("form")
   form.setAttribute("id","formImg")

   //Crear input de imágen
   let inputImg = document.createElement("input")
   inputImg.setAttribute("type", "file")
   //inputImg.setAttribute("onchange", "form.submit()")

   let boton = document.createElement("input")
   boton. setAttribute("type","submit")

   //Añadir elementos al div
   form.appendChild(inputImg)
   form.appendChild(boton)
   divForm.appendChild(form)

   form.addEventListener('submit', async (e) => {
      e.preventDefault()
      let image = await toBase64(inputImg.files[0])
      saveTask(image)
      form.reset()
   })
}

const toBase64 = (file) =>
   new Promise((resolve, reject) => {
       const reader = new FileReader()
       reader.readAsDataURL(file)
       reader.onload = () => resolve(reader.result)
       reader.onerror = (error) => reject(error)
})

function showImg(){

   let divImg = document.getElementById("showImg")

   divImg.innerHTML = ''

   onGetTasks((querySnapshot) => {

        let html = ''

        querySnapshot.forEach(doc => {

                html += `<div>
                                <img id="image" src=${doc.data().image} alt="no image">
                         <div>
                `
        })

        divImg.innerHTML = html

   })
}