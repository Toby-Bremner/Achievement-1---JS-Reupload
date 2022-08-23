let pokemonRepository = (function () {
  let d = [],
    e = document.querySelector(".modal-body");
  function a(a) {
    d.push(a);
  }
  function b() {
    return d;
  }
  function c(a) {
    return fetch(a.detailsUrl)
      .then(function (a) {
        return a.json();
      })
      .then(function (b) {
        (a.imageUrl = b.sprites.front_default),
          (a.height = b.height),
          (a.types = b.types);
      })
      .catch(function (a) {
        console.error(a);
      });
  }
  function f() {
    e.classList.remove("is-visible");
  }
  return (
    window.addEventListener("keydown", (a) => {
      "Escape" === a.key && e.classList.contains("is-visible") && f();
    }),
    {
      add: a,
      getAll: b,
      addListItem: function (d) {
        let g = document.querySelector(".pokemon-list"),
          b = document.createElement("li");
        b.classList.add("list-group-item");
        let a = document.createElement("button");
        (a.innerText = d.name.charAt(0).toUpperCase() + d.name.slice(1)),
          a.classList.add("name-button", "btn", "btn-primary"),
          a.setAttribute("data-bs-toggle", "modal"),
          a.setAttribute("data-bs-target", "#exampleModal"),
          b.appendChild(a),
          g.appendChild(b),
          a.addEventListener("click", function () {
            (function (a) {
              c(a).then(function () {
                var b;
                let c, d, h, i, g;
                (b = a),
                  (e.innerHTML = `<img src="${b.imageUrl}" alt="${b.name}"> 
    <p> Height: ${b.height}
    </p>
    <p>
    type: ${b.types[0].type.name}, ${b.types[1] ? b.types[1].type.name : ""}
    </p>
    
    `),
                  (document.querySelector(".modal-title").innerText = b.name),
                  (c = document.createElement("div")).classList.add("modal"),
                  (d = document.createElement("button")).classList.add(
                    "modal-close",
                    "btn",
                    "btn-primary"
                  ),
                  (d.innerText = "Close"),
                  d.addEventListener("click", f),
                  ((h = document.createElement("h1")).innerText =
                    b.name.charAt(0).toUpperCase() + b.name.slice(1)),
                  ((i =
                    document.createElement(
                      "p"
                    )).innerText = `Height: ${b.height}`),
                  (g = document.createElement("img")).classList.add(
                    "img-element"
                  ),
                  (g.src = b.imageUrl),
                  c.appendChild(d),
                  c.appendChild(h),
                  c.appendChild(g),
                  c.appendChild(i),
                  e.appendChild(c),
                  e.classList.add("is-visible"),
                  console.log(a);
              });
            })(d);
          });
      },
      loadList: function () {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (a) {
            return a.json();
          })
          .then(function (b) {
            b.results.forEach(function (b) {
              a({ name: b.name, detailsUrl: b.url });
            });
          })
          .catch(function (a) {
            console.error(a);
          });
      },
      loadDetails: c,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (a) {
    pokemonRepository.addListItem(a);
  });
});
