/* PIZZERÍA LA TOSCANA · datos del menú + modal */
const WA = "https://wa.me/573138999034?text=";

const pizzas = [
  { name:"Margherita",     tag:"La de la casa", price:"$32.900",
    img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    desc:"La pizza que lo empezó todo. Sobre nuestra masa madre fermentada 48 horas extendemos salsa de tomate San Marzano cocida a fuego lento, mozzarella fresca que se funde en hilos y hojas de albahaca recién cortadas. Un chorrito de aceite de oliva extra virgen al salir del horno de leña remata el conjunto. Sencilla solo en apariencia: cada ingrediente tiene que ser perfecto porque no hay dónde esconderse. Es la prueba de fuego de toda buena pizzería, y la nuestra la pasa con honores.",
    ing:["Tomate San Marzano","Mozzarella fresca","Albahaca","Orégano","Aceite de oliva"] },
  { name:"Diavola",        tag:"Picante", price:"$36.900",
    img:"https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
    desc:"Para los que buscan emociones fuertes. Salami picante italiano en lonjas generosas, jalapeños frescos y hojuelas de chile que despiertan el paladar, todo sobre una base de mozzarella derretida. El giro de la casa: un hilo de miel de abeja que se pasea por encima y juega con el picante, suavizándolo justo lo necesario para que quieras otro bocado. Dulce, ardiente y adictiva en partes iguales. No es para cualquiera, pero quien la prueba, repite.",
    ing:["Salami picante","Jalapeño","Miel","Mozzarella","Hojuelas de chile"] },
  { name:"Cuatro Quesos",  tag:"Clásica", price:"$38.900",
    img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
    desc:"Una oda a los amantes del queso. Combinamos mozzarella fresca por su elasticidad, gorgonzola por su carácter intenso y ligeramente picante, parmesano añejo que aporta el toque salado y umami, y un queso de cabra de finca que suma cremosidad y un final ácido delicado. Cada bocado es una capa distinta de sabor, fundida sobre nuestra masa artesanal. Cremosa de principio a fin, va perfecta con un hilo de miel o unas nueces si quieres llevarla aún más lejos.",
    ing:["Mozzarella","Gorgonzola","Parmesano","Queso de cabra"] },
  { name:"Huerta",         tag:"Veggie", price:"$34.900",
    img:"https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80",
    desc:"La prueba de que comer vegetales nunca fue tan delicioso. Calabacín en finas láminas, pimentón asado al horno hasta caramelizar sus azúcares, cebolla morada que aporta dulzor y color, y champiñones salteados con un toque de ajo. Coronamos todo con rúcula fresca recién puesta al salir del horno para sumar un contraste verde y ligeramente amargo. Ligera, colorida y llena de sabor genuino: la favorita de quienes creen que la pizza vegetariana es aburrida, hasta que prueban esta.",
    ing:["Calabacín","Pimentón asado","Cebolla morada","Champiñón","Rúcula"] },
  { name:"Pepperoni Doble", tag:"Favorita", price:"$37.900",
    img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    desc:"La consentida del público, sin rodeos. Doble ración de pepperoni de primera calidad que, al hornearse en leña, se encrespa por los bordes formando esos pequeños cuencos crujientes donde se acumula el aceite con todo el sabor. Debajo, una capa generosa de mozzarella y nuestra salsa de tomate con orégano. El equilibrio perfecto entre lo crocante de las orillas y el centro jugoso. Un clásico americano-italiano hecho a nuestra manera, que nunca defrauda y siempre se acaba primero.",
    ing:["Pepperoni","Mozzarella","Salsa de tomate","Orégano"] },
  { name:"Prosciutto",     tag:"Premium", price:"$42.900",
    img:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&q=80",
    desc:"Nuestra pizza más elegante, inspirada directamente en las trattorias de la Toscana. Horneamos primero la base con mozzarella hasta que queda dorada, y solo entonces montamos en frío lonjas de jamón serrano curado, una cama de rúcula fresca y abundantes lascas de parmesano. El contraste entre la masa caliente y los ingredientes frescos por encima es lo que la hace especial: el jamón se entibia apenas, la rúcula mantiene su frescura y el parmesano se funde levemente. Un final de aceite de oliva y listo. Pura sofisticación en cada porción.",
    ing:["Jamón serrano","Rúcula","Parmesano","Mozzarella"] },
];

const grid = document.getElementById("menuGrid");
grid.innerHTML = pizzas.map((p,i)=>`
  <article class="card" tabindex="0" role="button" data-i="${i}"
           aria-label="Ver detalles de ${p.name}">
    <div class="card__img" style="background-image:url('${p.img}')">
      <span class="card__tag">${p.tag}</span>
    </div>
    <div class="card__body">
      <h3 class="card__name">${p.name}</h3>
      <p class="card__desc">${p.short || p.desc.split(".")[0] + "."}</p>
      <div class="card__foot">
        <span class="card__price">${p.price}</span>
        <span class="card__more">Ver más →</span>
      </div>
    </div>
  </article>`).join("");

/* ---- Modal ---- */
const modal   = document.getElementById("modal");
const mImg     = document.getElementById("modalImg");
const mTag     = document.getElementById("modalTag");
const mTitle   = document.getElementById("modalTitle");
const mDesc    = document.getElementById("modalDesc");
const mIng     = document.getElementById("modalIngredients");
const mPrice   = document.getElementById("modalPrice");
const mCta     = document.getElementById("modalCta");
let lastFocus  = null;

function openModal(i){
  const p = pizzas[i];
  lastFocus = document.activeElement;
  mImg.style.backgroundImage = `url('${p.img}')`;
  mTag.textContent = p.tag;
  mTitle.textContent = p.name;
  mDesc.textContent = p.desc;
  mPrice.textContent = p.price;
  mIng.innerHTML = p.ing.map(x=>`<li>${x}</li>`).join("");
  mCta.href = WA + encodeURIComponent(`Hola La Toscana, quiero pedir una pizza ${p.name} (${p.price}) 🍕`);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal__close").focus();
}
function closeModal(){
  modal.hidden = true;
  document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}

grid.addEventListener("click", e=>{
  const card = e.target.closest(".card");
  if(card) openModal(+card.dataset.i);
});
grid.addEventListener("keydown", e=>{
  const card = e.target.closest(".card");
  if(card && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); openModal(+card.dataset.i); }
});
modal.addEventListener("click", e=>{ if(e.target.hasAttribute("data-close")) closeModal(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape" && !modal.hidden) closeModal(); });

/* año footer */
document.getElementById("year").textContent = new Date().getFullYear();