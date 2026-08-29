let cart = [];

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function changeQty(name, delta) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.name !== name);
    }
  }
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('cartList');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cartTotal');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.innerText = totalQty;

  if (cart.length === 0) {
    cartList.innerHTML = '<p style="text-align:center; color:#888;">Giỏ hàng đang trống</p>';
    cartTotal.innerText = '0đ';
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    html += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.price.toLocaleString('vi-VN')}đ</small>
        </div>
        <div class="cart-item-qty">
          <button onclick="changeQty('${item.name}', -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name}', 1)">+</button>
        </div>
      </div>
    `;
  });

  cartList.innerHTML = html;
  cartTotal.innerText = total.toLocaleString('vi-VN') + 'đ';
}

function openCart() {
  document.getElementById('cartModal').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

function handleOrderSubmit(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert('Vui lòng chọn ít nhất một món trước khi đặt hàng!');
    return;
  }

  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;

  alert(`Cảm ơn ${name} (${phone})!\nĐơn hàng của bạn đã được gửi thành công. Open Coffee sẽ liên hệ xác nhận ngay.`);

  cart = [];
  updateCartUI();
  closeCart();
  e.target.reset();
}