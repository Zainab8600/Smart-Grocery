import { useEffect, useState } from 'react'
import './App.css'


function getExpiryStatus(expiryDate) {
  const today = new Date()
  const expiry = new Date(expiryDate)

  today.setHours(0, 0, 0, 0)
  expiry.setHours(0, 0, 0, 0)

  const difference = expiry - today
  const daysLeft = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  )

  if (daysLeft < 0) {
    return { text: 'Expired', className: 'expired' }
  }

  if (daysLeft === 0) {
    return { text: 'Expires today', className: 'danger' }
  }

  if (daysLeft === 1) {
    return { text: 'Expires tomorrow', className: 'danger' }
  }

  if (daysLeft <= 3) {
    return { text: `${daysLeft} days left`, className: 'warning' }
  }

  return { text: `${daysLeft} days left`, className: 'fresh' }
}

function getPurchasedProducts(orders) {
  const purchasedProducts = []

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (
        item.expiryDate &&
        !purchasedProducts.some(
          (product) => product.productId === item.productId || product.name === item.name
        )
      ) {
        purchasedProducts.push(item)
      }
    })
  })

  return purchasedProducts
}

function PurchasedExpiryBanner({ orders }) {
  const purchasedProducts = getPurchasedProducts(orders)

  const expiringProducts = purchasedProducts.filter((item) => {
    const status = getExpiryStatus(item.expiryDate)

    return (
      status.className === 'expired' ||
      status.className === 'danger' ||
      status.className === 'warning'
    )
  })

  if (orders.length === 0) return null

  if (expiringProducts.length === 0) {
    return (
      <section className="expiry-banner safe-expiry-banner">
        <div className="expiry-banner-icon">✓</div>
        <div className="expiry-banner-content">
          <span className="expiry-banner-label">SMART EXPIRY CHECK</span>
          <h2>Your groceries are looking fresh! 🎉</h2>
          <p>None of your purchased groceries need to be used soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="expiry-banner">
      <div className="expiry-banner-top">
        <div className="expiry-banner-icon">🔔</div>
        <div className="expiry-banner-content">
          <span className="expiry-banner-label">SMART EXPIRY ALERT</span>
          <h2>Some of your groceries need attention</h2>
          <p>These are products you purchased that are close to expiry.</p>
        </div>
      </div>

      <div className="expiry-banner-items">
        {expiringProducts.map((item) => {
          const status = getExpiryStatus(item.expiryDate)

          return (
            <div
              className={`expiry-banner-item ${status.className}`}
              key={item.productId || item.name}
            >
              <div className="expiry-product-icon">
                {status.className === 'expired'
                  ? '❌'
                  : status.className === 'danger'
                  ? '🚨'
                  : '⚠️'}
              </div>

              <div className="expiry-product-info">
                <h3>{item.name}</h3>
                <p>
                  {status.className === 'expired'
                    ? `Expired on ${item.expiryDate}`
                    : `Expires on ${item.expiryDate}`}
                </p>
              </div>

              <strong>
                {status.className === 'expired' ? 'Expired' : status.text}
              </strong>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function ExpiryAlert({ name, expiryDate, icon }) {
  const status = getExpiryStatus(expiryDate)

  let alertClass = 'fresh-alert'
  let alertIcon = '✅'
  let label = 'Fresh'

  if (status.className === 'danger') {
    alertClass = 'danger-alert'
    alertIcon = '🚨'
    label = 'Expiry Alert'
  } else if (status.className === 'warning') {
    alertClass = 'warning-alert'
    alertIcon = '⚠️'
    label = 'Use Soon'
  } else if (status.className === 'expired') {
    alertClass = 'danger-alert'
    alertIcon = '❌'
    label = 'Expired'
  }

  return (
    <div className={`expiry-alert ${alertClass}`}>
      <div className="alert-icon">{alertIcon}</div>
      <div className="alert-content">
        <h3>{icon} {name}</h3>
        <p>{status.text}</p>
        <strong>{label}</strong>
        <p className="alert-action">
          {status.className === 'expired'
            ? 'This product should not be consumed.'
            : status.className === 'danger'
            ? 'Use this product soon to avoid food waste.'
            : 'Consider using this product soon.'}
        </p>
      </div>
    </div>
  )
}

function ProductDetails({ product, onClose, onAddToCart }) {
  if (!product) return null

  const status = product.expiryDate
    ? getExpiryStatus(product.expiryDate)
    : null

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose}>✕</button>

        <div className="product-modal-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-modal-content">
          <span className="product-modal-category">{product.category}</span>
          <h2>{product.name}</h2>

          {(product.brand || product.size) && (
            <p className="product-modal-details">
              {product.brand && product.brand}
              {product.brand && product.size && ' • '}
              {product.size && product.size}
            </p>
          )}

          <div className="product-modal-price">₹{product.price}</div>

          {product.expiryDate && status && (
            <div className={`product-modal-expiry ${status.className}`}>
              <strong>Expiry:</strong> {product.expiryDate}
              <span> • {status.text}</span>
            </div>
          )}

          <div className="product-modal-stock">
            {product.stock <= 0
              ? 'Out of stock'
              : product.stock <= product.lowStockThreshold
              ? `Only ${product.stock} left`
              : `${product.stock} available`}
          </div>

          <button
            className="product-modal-add"
            onClick={() => {
              onAddToCart(product)
              onClose()
            }}
            disabled={product.stock <= 0}
          >
            {product.stock <= 0 ? 'Out of Stock' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('smartgrocery-cart')
  return savedCart ? JSON.parse(savedCart) : []
})
  const [products, setProducts] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [orders, setOrders] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState(null)

  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliverySlot, setDeliverySlot] = useState('Morning (8 AM - 12 PM)')
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  const [shoppingItems, setShoppingItems] = useState([])
  const [shoppingInput, setShoppingInput] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => { 
    const savedShoppingItems = localStorage.getItem('smartgrocery-shopping-list')
    if (savedShoppingItems) setShoppingItems(JSON.parse(savedShoppingItems))
  }, [])
useEffect(() => {
  fetch('http://localhost:5000/api/products')
    .then((response) => response.json())
    .then((data) => {
     const formattedProducts = data.map((product) => ({
  ...product,
  id: product._id,
  stock: product.quantity
}))

setProducts(formattedProducts)
    })
    .catch((error) => {
      console.error('Failed to fetch products:', error)
    })
}, [])
useEffect(() => {
  fetch('http://localhost:5000/api/orders')
    .then((response) => response.json())
    .then((data) => {
      setOrders(data)
    })
    .catch((error) => {
      console.error('Failed to fetch orders:', error)
    })
}, [])

  useEffect(() => {
    localStorage.setItem('smartgrocery-cart', JSON.stringify(cart))
  }, [cart])

  

  useEffect(() => {
    localStorage.setItem(
      'smartgrocery-shopping-list',
      JSON.stringify(shoppingItems)
    )
  }, [shoppingItems])

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.productId === product.id
      )

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert(`Only ${product.stock} ${product.name} available.`)
          return currentCart
        }

        return currentCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      if (product.stock <= 0) {
        alert(`${product.name} is currently out of stock.`)
        return currentCart
      }

      return [
        ...currentCart,
        {
          id: Date.now(),
          productId: product.id,
          name: product.name,
          category: product.category,
          brand: product.brand,
          size: product.size,
          price: product.price,
          quantity: 1,
          stock: product.stock,
          lowStockThreshold: product.lowStockThreshold,
          expiryDate: product.expiryDate,
          image: product.image
        }
      ]
    })

    setShowCart(true)
  }

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== id) return item

          const newQuantity = item.quantity + change

          if (newQuantity > item.stock) {
            alert(`Only ${item.stock} ${item.name} available.`)
            return item
          }

          return { ...item, quantity: newQuantity }
        })
        .filter((item) => item.quantity > 0)
    )
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory

    const searchText = searchTerm.toLowerCase()

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      (product.brand && product.brand.toLowerCase().includes(searchText))

    return matchesCategory && matchesSearch
  })

  const totalSpent = orders.reduce((total, order) => total + order.total, 0)

  const totalProducts = orders.reduce(
    (total, order) =>
      total + order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  )

  const categorySpending = {}

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const product = products.find(
        (product) => product.id === item.productId || product.name === item.name
      )

      if (product) {
        categorySpending[product.category] =
          (categorySpending[product.category] || 0) +
          item.price * item.quantity
      }
    })
  })

  const topCategory =
    Object.keys(categorySpending).length > 0
      ? Object.keys(categorySpending).reduce((a, b) =>
          categorySpending[a] > categorySpending[b] ? a : b
        )
      : 'No data'

 const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

const purchasedProductIds = new Set()
const purchasedProductNames = new Set()

orders.forEach((order) => {
  const purchaseDate = order.createdAt
    ? new Date(order.createdAt)
    : null

  if (!purchaseDate || purchaseDate < sevenDaysAgo) {
    return
  }

  order.items.forEach((item) => {
    if (item.productId) {
      purchasedProductIds.add(item.productId)
    }

    if (item.name) {
      purchasedProductNames.add(item.name)
    }
  })
})

const smartRestockProducts = products.filter(
  (product) =>
    purchasedProductIds.has(product.id) ||
    purchasedProductIds.has(product._id) ||
    purchasedProductNames.has(product.name)
)
const purchaseCount = {}

orders.forEach((order) => {
  order.items.forEach((item) => {
    const key = item.productId || item.name

    purchaseCount[key] = (purchaseCount[key] || 0) + item.quantity
  })
})

const purchaseFrequency = {}

orders.forEach((order) => {
  order.items.forEach((item) => {
    const key = item.productId || item.name

    if (!purchaseFrequency[key]) {
      purchaseFrequency[key] = {
        productId: item.productId,
        name: item.name,
        orders: 0
      }
    }

    purchaseFrequency[key].orders += 1
  })
})

const smartBuyProducts = products.filter((product) => {
  const purchase =
    purchaseFrequency[product.id] ||
    purchaseFrequency[product._id]

  return purchase && purchase.orders >= 2
})
const lowStockProducts = products.filter(
  (product) =>
    product.stock > 0 &&
    product.stock <= product.lowStockThreshold
)


  const placeOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty.')
      return
    }

    const newOrder = {
  id: Date.now(),
  items: cart,
  total: cartTotal,
  status: 'Confirmed',
  date: new Date().toLocaleDateString(),
  createdAt: new Date().toISOString(),
  deliveryAddress: deliveryAddress.trim(),
  deliverySlot,
  paymentMethod
}

    try {
  const response = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOrder),
  })

  const savedOrder = await response.json()
  setProducts((currentProducts) =>
  currentProducts.map((product) => {
    const orderedItem = cart.find(
      (item) => item.productId === product.id
    )

    if (!orderedItem) return product

    return {
      ...product,
      stock: product.stock - orderedItem.quantity,
      quantity: product.quantity - orderedItem.quantity,
    }
  })
)

  if (!response.ok) {
    throw new Error(savedOrder.message || 'Failed to place order')
  }

  setOrders((currentOrders) => [savedOrder, ...currentOrders])
  setCart([])
  setShowCart(false)
  setOrderPlaced(true)
} catch (error) {
  console.error('Failed to place order:', error)
  alert('Failed to place order. Please try again.')
}
  }

  const addShoppingItem = () => {
    if (!shoppingInput.trim()) return

    const newItem = {
      id: Date.now(),
      name: shoppingInput.trim(),
      purchased: false
    }

    setShoppingItems((currentItems) => [...currentItems, newItem])
    setShoppingInput('')
  }

  const toggleShoppingItem = (id) => {
    setShoppingItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    )
  }

  const deleteShoppingItem = (id) => {
    setShoppingItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">🛒</span>
          <span>SmartGrocery</span>
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => scrollToSection('home')}><span>🏠</span>Home</button>
          <button onClick={() => scrollToSection('shop')}><span>🛍️</span>Shop</button>
          <button onClick={() => setShowCart((value) => !value)}>
            <span>🛒</span>Cart
            {cart.length > 0 && <span className="nav-badge">{cart.length}</span>}
          </button>
          <button onClick={() => scrollToSection('orders')}><span>📦</span>My Orders</button>
          <button onClick={() => scrollToSection('alerts')}><span>🔔</span>Smart Alerts</button>
          <button onClick={() => scrollToSection('insights')}><span>📊</span>My Insights</button>
          <button onClick={() => scrollToSection('restock')}><span>🔄</span>Smart Restock</button>
          <button onClick={() => scrollToSection('smart-buy')}>
  <span>🧠</span>Smart Buy
</button>
          <button onClick={() => scrollToSection('shopping-list')}><span>📝</span>Shopping List</button>
        </nav>

        <div className="sidebar-tip">
          <div>💡</div>
          <strong>Smart tip</strong>
          <p>Plan your shopping before buying groceries to reduce food waste.</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div>
            <h1>Good morning <span>👋</span></h1>
            <p>Shop smart. Waste less.</p>
          </div>

          <div className="top-actions">
            <button
              className="top-cart-button"
              onClick={() => setShowCart((value) => !value)}
            >
              🛒 <span>Cart</span>
              {cart.length > 0 && <b>{cart.length}</b>}
            </button>
          </div>
        </header>

        <section id="home" className="welcome-section">
          <div className="welcome-content">
            <span className="welcome-tag">✨ SMART SHOPPING</span>
            <h2>Everything you need,<br /><span>in one place.</span></h2>
            <p>Fresh groceries, smart shopping and helpful reminders — all designed to make grocery shopping easier.</p>
            <button className="hero-button" onClick={() => scrollToSection('shop')}>
              Start Shopping <span>→</span>
            </button>
          </div>

          <div className="hero-visual">
            <div className="hero-circle">🛒</div>
            <div className="floating-card floating-one">🥦 Fresh</div>
            <div className="floating-card floating-two">🔔 Smart Alerts</div>
          </div>
        </section>

        <PurchasedExpiryBanner orders={orders} />

        <section id="shop" className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-label">GROCERY STORE</span>
              <h2>Shop Groceries 🛍️</h2>
              <p>Fresh essentials for your everyday needs.</p>
            </div>
          </div>

          <div className="shop-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search groceries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <button onClick={() => setSearchTerm('')}>✕</button>}
          </div>

          <div className="category-list">
            {[
              ['All', '🛒'],
              ['Fruits', '🍎'],
              ['Vegetables', '🥦'],
              ['Dairy', '🥛'],
              ['Meat', '🍗'],
              ['Grains', '🍚'],
              ['Bakery', '🍞'],
              ['Spices', '🌶️'],
              ['Snacks', '🍪'],
              ['Beverages', '🥤']
            ].map(([category, icon]) => (
              <button
                key={category}
                className={selectedCategory === category ? 'active-category' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {icon} {category}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <div>🔎</div>
                <h3>No groceries found</h3>
                <p>Try another search or category.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <span className="product-category-badge">{product.category}</span>
                  </div>

                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>

                    {(product.brand || product.size) && (
                      <p className="product-details">
                        {product.brand && product.brand}
                        {product.brand && product.size && ' • '}
                        {product.size && product.size}
                      </p>
                    )}

                    <div className="product-stock">
                      {product.stock <= 0
                        ? 'Out of stock'
                        : product.stock <= product.lowStockThreshold
                        ? `Only ${product.stock} left`
                        : `${product.stock} in stock`}
                    </div>

                    <div className="product-footer">
                      <strong>₹{product.price}</strong>
                      <button
                        disabled={product.stock <= 0}
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        {product.stock <= 0 ? 'Out' : '+ Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {showCart && (
          <section className="cart-section">
            <div className="section-heading">
              <div>
                <span className="section-label">YOUR SELECTION</span>
                <h2>🛒 Your Cart</h2>
                <p>Items you've selected.</p>
              </div>
              <button className="close-section-button" onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-state">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some groceries to get started.</p>
                <button onClick={() => {
                  setShowCart(false)
                  scrollToSection('shop')
                }}>
                  Browse Groceries
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price} each</p>

                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-right">
                        <strong>₹{item.price * item.quantity}</strong>
                        <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <div>
                    <span>Cart Total</span>
                    <strong>₹{cartTotal}</strong>
                  </div>

                  <button className="checkout-button" onClick={() => setShowCheckout(true)}>
                    Buy Now →
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {showCheckout && (
          <section className="checkout-section">
            <div className="section-heading">
              <div>
                <span className="section-label">COMPLETE YOUR ORDER</span>
                <h2>🧾 Checkout</h2>
                <p>Choose your delivery and payment preferences.</p>
              </div>
              <button className="close-section-button" onClick={() => setShowCheckout(false)}>✕</button>
            </div>

            <div className="checkout-layout">
              <div className="checkout-form">
                <div className="checkout-field">
                  <label>Delivery Address</label>
                  <textarea
                    placeholder="Enter your full delivery address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows="4"
                  />
                </div>

                <div className="checkout-field">
                  <label>Delivery Slot</label>
                  <select value={deliverySlot} onChange={(e) => setDeliverySlot(e.target.value)}>
                    <option>Morning (8 AM - 12 PM)</option>
                    <option>Afternoon (12 PM - 4 PM)</option>
                    <option>Evening (4 PM - 8 PM)</option>
                  </select>
                </div>

                <div className="checkout-field">
                  <label>Payment Method</label>
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option>Cash on Delivery</option>
                    <option>UPI</option>
                    <option>Credit / Debit Card</option>
                  </select>
                </div>

                <button
                  className="place-order-button"
                  onClick={() => {
                    if (!deliveryAddress.trim()) {
                      alert('Please enter your delivery address.')
                      return
                    }
                    placeOrder()
                    setShowCheckout(false)
                  }}
                >
                  Place Order • ₹{cartTotal}
                </button>
              </div>

              <div className="checkout-summary">
                <h3>Order Summary</h3>

                {cart.map((item) => (
                  <div className="checkout-summary-item" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.quantity} × ₹{item.price}</span>
                    </div>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}

                <div className="checkout-summary-total">
                  <span>Total</span>
                  <strong>₹{cartTotal}</strong>
                </div>
              </div>
            </div>
          </section>
        )}

        {orderPlaced && (
          <section className="order-success">
            <div className="success-icon">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for shopping with SmartGrocery.</p>
            <p>Your groceries have been added to your order history.</p>
            <button className="continue-shopping-button" onClick={() => setOrderPlaced(false)}>
              Continue Shopping
            </button>
          </section>
        )}

        <section id="orders" className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-label">ORDER HISTORY</span>
              <h2>📦 My Orders</h2>
              <p>Your recent grocery orders.</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <div>📦</div>
              <h3>No orders yet</h3>
              <p>Your completed orders will appear here.</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.slice().reverse().map((order) => (
                <div className="order-card" key={order.id}>
                  <div
                    className="order-header order-header-clickable"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div>
                      <span className="order-date">{order.date}</span>
                      <h3>Order #{String(order.id).slice(-5)}</h3>
                      <p>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                    </div>

                    <div className="order-header-right">
                      <span className="order-status">🟢 {order.status}</span>
                      <button
                        className="order-expand-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedOrder(expandedOrder === order.id ? null : order.id)
                        }}
                      >
                        {expandedOrder === order.id ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div className="order-details">
                      <div className="order-delivery-details">
                        <div>
                          <span>📍 Delivery Address</span>
                          <strong>{order.deliveryAddress || 'Address not available'}</strong>
                        </div>
                        <div>
                          <span>🕐 Delivery Slot</span>
                          <strong>{order.deliverySlot || 'Not specified'}</strong>
                        </div>
                        <div>
                          <span>💳 Payment Method</span>
                          <strong>{order.paymentMethod || 'Not specified'}</strong>
                        </div>
                      </div>

                      <div className="order-items">
                        {order.items.map((item) => (
                          <div key={item.id} className="order-item">
                            <div className="order-item-left">
                              <img src={item.image} alt={item.name} />
                              <div>
                                <strong>{item.name}</strong>
                                <span>{item.quantity} × ₹{item.price}</span>
                              </div>
                            </div>
                            <strong>₹{item.price * item.quantity}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="order-total">
                        <strong>Total: ₹{order.total}</strong>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="alerts" className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-label">FOOD WASTE PREVENTION</span>
              <h2>🔔 Smart Expiry Alerts</h2>
              <p>Alerts are shown only for groceries you have purchased.</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <div>🔔</div>
              <h3>No expiry alerts yet</h3>
              <p>Buy groceries and your smart expiry reminders will appear here.</p>
            </div>
          ) : (
            <div className="alert-list">
              {getPurchasedProducts(orders)
                .filter((item) => {
                  const status = getExpiryStatus(item.expiryDate)
                  return (
                    status.className === 'expired' ||
                    status.className === 'danger' ||
                    status.className === 'warning'
                  )
                })
                .map((item) => (
                  <ExpiryAlert
                    key={item.productId || item.name}
                    name={item.name}
                    expiryDate={item.expiryDate}
                    icon={
                      item.category === 'Dairy'
                        ? '🥛'
                        : item.category === 'Fruits'
                        ? '🍎'
                        : item.category === 'Vegetables'
                        ? '🥦'
                        : item.category === 'Meat'
                        ? '🍗'
                        : item.category === 'Grains'
                        ? '🍚'
                        : item.category === 'Beverages'
                        ? '🥤'
                        : '🛒'
                    }
                  />
                ))}
            </div>
          )}
        </section>

        <section id="insights" className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-label">YOUR SHOPPING DATA</span>
              <h2>📊 My Insights</h2>
              <p>Understand your grocery shopping habits.</p>
            </div>
          </div>

          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">💰</div>
              <h3>Total Spent</h3>
              <h2>₹{totalSpent}</h2>
              <p>Across all your orders</p>
            </div>

            <div className="insight-card">
              <div className="insight-icon">🛒</div>
              <h3>Products Bought</h3>
              <h2>{totalProducts}</h2>
              <p>Items purchased</p>
            </div>

            <div className="insight-card">
              <div className="insight-icon">📦</div>
              <h3>Total Orders</h3>
              <h2>{orders.length}</h2>
              <p>Grocery orders placed</p>
            </div>

            <div className="insight-card">
              <div className="insight-icon">🏆</div>
              <h3>Top Category</h3>
              <h2>{topCategory}</h2>
              <p>Your most purchased category</p>
            </div>
          </div>

          <div className="smart-insight">
            <div className="smart-insight-icon">💡</div>
            <div>
              <h3>Smart Grocery Tip</h3>
              <p>Planning your shopping list before buying groceries can help reduce unnecessary purchases and food waste.</p>
            </div>
          </div>
        </section>

        <section id="restock" className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-label">SMART SHOPPING</span>
              <h2>🔄 Smart Restock</h2>
              <p>Your previously purchased groceries, prioritized by your shopping habits.</p>
            </div>
          </div>

          {smartRestockProducts.length === 0 ? (
            <div className="empty-state">
              <div>🔄</div>
              <h3>No restock suggestions yet</h3>
              <p>Purchase some groceries and we'll remember them here.</p>
              <button onClick={() => scrollToSection('shop')}>Start Shopping</button>
              <button onClick={() => scrollToSection('smart-buy')}>
  <span>🧠</span>Smart Buy
</button>
            </div>
          ) : (
            <div className="product-grid">
              {smartRestockProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <span className="product-category-badge">{product.category}</span>
                  </div>

                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>

                    {(product.brand || product.size) && (
                      <p className="product-details">
                        {product.brand && product.brand}
                        {product.brand && product.size && ' • '}
                        {product.size && product.size}
                      </p>
                    )}

                    <div className="product-stock">
  {product.stock <= 0
    ? '❌ Out of stock'
    : product.stock <= product.lowStockThreshold
    ? `⚠️ Only ${product.stock} left`
    : `📦 ${product.stock} in stock`}
</div>

<div className="restock-reason">
  {purchaseCount[product.id] || purchaseCount[product.name] ? (
    <>
      🛒 Bought{' '}
      {purchaseCount[product.id] || purchaseCount[product.name]}{' '}
      {(
        purchaseCount[product.id] ||
        purchaseCount[product.name]
      ) === 1
        ? 'time'
        : 'times'}
    </>
  ) : (
    '🔄 Purchased before'
  )}
</div>

                    <div className="product-footer">
                      <strong>₹{product.price}</strong>
                      <button
                        disabled={product.stock <= 0}
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        {product.stock <= 0 ? 'Out' : '+ Add Again'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="smart-buy" className="content-section">
  <div className="section-heading">
    <div>
      <span className="section-label">SMART SHOPPING</span>
      <h2>🧠 Smart Buy</h2>
      <p>Products you may want to buy based on your shopping habits.</p>
    </div>
  </div>

  {smartBuyProducts.length === 0 ? (
    <div className="empty-state">
      <div>🧠</div>
      <h3>No Smart Buy suggestions yet</h3>
      <p>Buy some products multiple times and SmartGrocery will suggest them here.</p>
      <button onClick={() => scrollToSection('shop')}>
        Start Shopping
      </button>
    </div>
  ) : (
    <div className="product-grid">
      {smartBuyProducts.map((product) => (
        <div
          className="product-card"
          key={product.id}
          onClick={() => setSelectedProduct(product)}
        >
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            <span className="product-category-badge">
              {product.category}
            </span>
          </div>

          <div className="product-info">
            <p className="product-category">{product.category}</p>
            <h3>{product.name}</h3>

            {(product.brand || product.size) && (
              <p className="product-details">
                {product.brand && product.brand}
                {product.brand && product.size && ' • '}
                {product.size && product.size}
              </p>
            )}

            <div className="product-stock">
              {product.stock <= 0
                ? '❌ Out of stock'
                : product.stock <= product.lowStockThreshold
                ? `⚠️ Only ${product.stock} left`
                : `📦 ${product.stock} in stock`}
            </div>

            <div className="product-footer">
              <strong>₹{product.price}</strong>

              <button
                disabled={product.stock <= 0}
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart(product)
                }}
              >
                {product.stock <= 0 ? 'Out' : '+ Add'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
<section id="shopping-list" className="content-section shopping-list-section">
          <div className="section-heading">
            <div>
              <span className="section-label">PLAN AHEAD</span>
              <h2>📝 Smart Shopping List</h2>
              <p>Add things you need to buy.</p>
            </div>
          </div>

          <div className="shopping-input">
            <input
              type="text"
              placeholder="What do you need?"
              value={shoppingInput}
              onChange={(e) => setShoppingInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addShoppingItem()
              }}
            />
            <button onClick={addShoppingItem}>+ Add</button>
          </div>

          <div className="shopping-items">
            {shoppingItems.length === 0 ? (
              <div className="empty-shopping">
                <span>📝</span>
                <p>No items in your shopping list yet.</p>
              </div>
            ) : (
              shoppingItems.map((item) => (
                <div className="shopping-item" key={item.id}>
                  <span className={item.purchased ? 'purchased-item' : ''}>
                    {item.purchased ? '✅' : '🛒'} {item.name}
                  </span>

                  <div className="shopping-actions">
                    <button onClick={() => toggleShoppingItem(item.id)}>
                      {item.purchased ? 'Undo' : 'Purchased'}
                    </button>
                    <button
                      className="delete-list-button"
                      onClick={() => deleteShoppingItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <footer className="footer">
          <div>
            <strong>🛒 SmartGrocery</strong>
            <p>Shop smart. Waste less.</p>
          </div>
          <p>Smart grocery management made simple.</p>
        </footer>
      </main>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  )
}

export default App
