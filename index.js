const products = [
  {
    id: 1,
    name: 'Sistem Informasi RS',
    price: 5000000,
    active: true,
  },
  {
    id: 2,
    name: 'Website Pribadi',
    price: 1000000,
    active: true
  },
  {
    id: 3,
    name: 'Company Profile',
    price: 3000000,
    active: true,
  },
  {
    id: 4,
    name: 'Sistem Informasi PPDB',
    price: 4500000,
    active: true,
  },
  {
    id: 5,
    name: 'Website Agent Traveler',
    price: 3500000,
    active: false,
  },
];

var total = 0;
var $app = document.querySelector('.app');
// https://stackoverflow.com/a/43824723/1240036
function currency(amount, prefix) {
  return 'Rp ' + amount;
}

// need help to format function currency

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
  if (el.classList)
    return el.classList.add(className);
  else if (!hasClass(el, className))
    el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}

// Render title
function renderTitle(container) {
  let $title = document.createElement('h1');
  $title.innerHTML = 'Daftar Produk';
  container.appendChild($title);
}

function addTotal(product, total, isAdd) {
  if (isAdd) {
    total += product.price;
  } else {
    total -= product.price;
  }
  return total;
}

// Render list
function renderList(container, products) {
  let $orderList = document.createElement('ul');

  // Loop products, buat elemen tiap produk lalu append ke orderList
  products.forEach(function(product) {
    let $product = document.createElement('li');
    let $productPrice = document.createElement('span');

    $productPrice.innerHTML = currency(product.price);
    $product.innerHTML = product.name;
    $product.appendChild($productPrice);

    $orderList.appendChild($product);

    // Tambah event handler ketika produk di klik
    $product.addEventListener('click', function(event) {

      // isAdd untuk menentukan apakah operasi berikutnya adalah
      // operasi penambahan atau pengurangan
      let isAdd = !hasClass($product, 'is-active');

      // Kita tambah atau buang class is-active sesuai operasi yang
      // akan dilakukan
      if (isAdd) {
        addClass($product, 'is-active');
      } else {
        removeClass($product, 'is-active');
      }

      // Mendapatkan nilai total yang baru dari fungsi addTotal
      total = addTotal(product, total, isAdd);

      // Perbarui nilai total di DOM
      let $total = document.querySelector('.total span');
      $total.innerHTML = currency(total);
    });
  });

  container.appendChild($orderList);
}

// Render Total
function renderTotalContainer(container, total) {
  let $totalContainer = document.createElement('div');
  addClass($totalContainer, 'total');

  $totalContainer.innerHTML = 'Total: ';

  let $total = document.createElement('span');
  $total.innerHTML = currency(total);
  $totalContainer.appendChild($total);

  container.appendChild($totalContainer);
}

// Render title, list, dan totalContainer
renderTitle($app);
renderList($app, products);
renderTotalContainer($app, total);

// querySelectorAll untuk mendapat semua DOM Node yang sesuai dengan selector
// yang diberikan. Kemudian kita bisa menggunaka loop (forEach) untuk mendapat
// setiap DOM Node nya.
let $products = document.querySelectorAll('li');
$products.forEach(function($product, index) {

  // Kita pilih 2 order teratas dengan men-trigger event click
  if (index < 2) {
    $product.dispatchEvent(new Event('click'));
  }
});
