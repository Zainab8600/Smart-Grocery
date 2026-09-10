const products = [
    
  {
    id: 1,
    name: 'Fresh Milk',
    category: 'Dairy',
    price: 68,
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-08-30'
  },
  {
    id: 2,
    name: 'Farm Fresh Eggs',
    category: 'Dairy',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-05'
  },
  {
    id: 3,
    name: 'Basmati Rice',
    category: 'Grains',
    price: 450,
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-12-20'
  },
  {
    id: 4,
    name: 'Fresh Chicken',
    category: 'Meat',
    price: 250,
    image:
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-08-28'
  },
  {
    id: 5,
    name: 'Red Apples',
    category: 'Fruits',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-02'
  },
  {
    id: 6,
    name: 'Bananas',
    category: 'Fruits',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-08-31'
  },
  {
    id: 7,
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-01'
  },
  {
    id: 8,
    name: 'Broccoli',
    category: 'Vegetables',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-08-31'
  },
  {
    id: 9,
    name: 'Potato Chips',
    category: 'Snacks',
    price: 50,
    image:
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2027-02-15'
  },
  {
    id: 10,
    name: 'Orange Juice',
    category: 'Beverages',
    price: 110,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-10'
  },
  {
    id: 11,
    name: 'Wheat Flour',
    category: 'Grains',
    price: 210,
    image:
      'https://cpimg.tistatic.com/04308270/b/4/Fresh-Wheat-Flour.jpg',
    expiryDate: '2027-01-20'
  },
  {
    id: 12,
    name: 'Cheese',
    category: 'Dairy',
    price: 160,
    image:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-05'
  },
  {
    id: 13,
    name: 'White Bread',
    brand: 'Modern',
    category: 'Bakery',
    size: '400g',
    price: 45,
    image:
      'https://3.imimg.com/data3/JX/AN/MY-489061/high-volume-bread-improver-500x500.jpg',
    expiryDate: '2026-09-03'
  },
  {
    id: 14,
    name: 'White Bread',
    brand: 'Britannia',
    category: 'Bakery',
    size: '400g',
    price: 48,
    image:
      'https://images.pexels.com/photos/2067631/pexels-photo-2067631.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: 15,
    name: 'White Bread',
    brand: 'Harvest Gold',
    category: 'Bakery',
    size: '400g',
    price: 50,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 16,
    name: 'Fresh Oranges',
    category: 'Fruits',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-06'
  },
  {
    id: 17,
    name: 'Green Grapes',
    category: 'Fruits',
    price: 140,
    image:
      'https://img.freepik.com/premium-photo/green-grapes-white-background-isolated_198067-35.jpg?w=2000'
  },
  {
    id: 18,
    name: 'Mangoes',
    category: 'Fruits',
    price: 160,
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-03'
  },
  {
    id: 19,
    name: 'Pineapple',
    category: 'Fruits',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-05'
  },
  {
    id: 20,
    name: 'Watermelon',
    category: 'Fruits',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-02'
  },
  {
    id: 21,
    name: 'Fresh Carrots',
    category: 'Vegetables',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-03'
  },
  {
    id: 22,
    name: 'Fresh Potatoes',
    category: 'Vegetables',
    price: 50,
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-15'
  },
  {
    id: 23,
    name: 'Onions',
    category: 'Vegetables',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-18'
  },
  {
    id: 24,
    name: 'Green Capsicum',
    category: 'Vegetables',
    price: 75,
    image:
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-04'
  },
  {
    id: 25,
    name: 'Fresh Spinach',
    category: 'Vegetables',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-01'
  },
  {
    id: 26,
    name: 'Salted Butter',
    category: 'Dairy',
    price: 58,
    image:
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-10-20'
  },
  {
    id: 27,
    name: 'Fresh Curd',
    category: 'Dairy',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-04'
  },
  {
    id: 28,
    name: 'Paneer',
    category: 'Dairy',
    price: 110,
    image:
      'https://www.practostatic.com/fit/24a629f38ae9780142bcd87d032d3cbd40497788',
    expiryDate: '2026-09-08'
  },
  {
    id: 29,
    name: 'Turmeric Powder',
    category: 'Spices',
    price: 85,
    image:
      'https://fimgs.net/mdimg/vijesti/o.14163.2.jpg',
    expiryDate: '2027-06-15'
  },
  {
    id: 30,
    name: 'Red Chilli Powder',
    category: 'Spices',
    price: 95,
    image:
      'https://arizoneinternational.com/wp-content/uploads/2023/09/how-to-make-red-chilli-powder-at-home.jpg',
    expiryDate: '2027-05-20'
  },
  {
    id: 31,
    name: 'Black Pepper',
    category: 'Spices',
    price: 130,
    image:
      'https://tse2.mm.bing.net/th/id/OIP.edOZURdlPo5wli2m1nk86wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    expiryDate: '2027-08-10'
  },
  {
    id: 32,
    name: 'Cinnamon',
    category: 'Spices',
    price: 75,
    image:
      'https://www.spicebloom.co.nz/cdn/shop/files/organic-ceylon-cinnamon-powder-true-cinnamon-from-sri-lanka-spicebloom-1598174.png?v=1756803587&width=1445',
    expiryDate: '2027-07-15'
  },
  {
    id: 33,
    name: 'Pasta',
    category: 'Grains',
    price: 95,
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2027-03-20'
  },
  {
    id: 34,
    name: 'Oats',
    category: 'Grains',
    price: 160,
    image:
      'https://tse2.mm.bing.net/th/id/OIP.McKsW9Hg66cG09iewDCmPwHaFr?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    expiryDate: '2027-04-15'
  },
  {
    id: 35,
    name: 'Chocolate Biscuits',
    category: 'Snacks',
    price: 45,
    image:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2027-01-10'
  },
  {
    id: 36,
    name: 'Potato Crackers',
    category: 'Snacks',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2027-02-20'
  },
  {
    id: 37,
    name: 'Apple Juice',
    category: 'Beverages',
    price: 120,
    image:
      'https://tse2.mm.bing.net/th/id/OIP.lGG0FHlptIdlMz9xK7stIQHaHx?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    expiryDate: '2026-10-12'
  },
  {
    id: 38,
    name: 'Mineral Water',
    category: 'Beverages',
    price: 25,
    image:
      'https://okcredit-blog-images-prod.storage.googleapis.com/2022/01/mineralwater2.jpg',
    expiryDate: '2027-08-20'
  },
  {
    id: 39,
    name: 'Brown Sugar',
    category: 'Staples',
    price: 75,
    image:
      'https://food55.com/thumb/1024/brown-sugar.webp',
    expiryDate: '2027-09-10'
  },
  {
    id: 40,
    name: 'Cooking Oil',
    category: 'Staples',
    price: 165,
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2027-02-28'
  },
  {
    id: 41,
    name: 'Fresh Beef',
    category: 'Meat',
    price: 420,
    image:
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-01'
  },
  {
    id: 42,
    name: 'Fresh Mutton',
    category: 'Meat',
    price: 650,
    image:
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=500&q=80',
    expiryDate: '2026-09-01'
  },
  {
    id: 43,
    name: 'White Sugar',
    category: 'Staples',
    price: 55,
    image:
      'https://www.marthastewart.com/thmb/sADmR9R5V0EQpyS9Aj6YpP_8Knw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ms-sugar-getty-cfed0662acca49f7b6e52c593767dfb9.jpg',
    expiryDate: '2028-01-15'
  },
  {
    id: 44,
    name: 'Fresh Yogurt',
    category: 'Dairy',
    price: 60,
    image:
      'https://www.tasteofhome.com/wp-content/uploads/2018/05/shutterstock_518824723.jpg?w=1200'
  },
  {
    id: 45,
    name: 'Salt',
    category: 'Staples',
    price: 30,
    image:
      'https://tse1.explicit.bing.net/th/id/OIP.iPWXq9qsL-k-5fFBb9ZjyQHaE8?r=0&w=1600&h=1067&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 46,
    name: 'Green Chilli',
    category: 'Vegetables',
    price: 45,
    image:
      'https://tse2.mm.bing.net/th/id/OIP.xyQyh00Yy-k9mcZ5GezQfgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    expiryDate: '2026-09-03'
  },
  {
    id: 47,
    name: 'Fresh Coriander',
    category: 'Vegetables',
    price: 25,
    image:
      'https://tse1.mm.bing.net/th/id/OIP.LX0MQu6rkAXQbwaq-i3sUwHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    expiryDate: '2026-09-01'
  },
  {
    id: 48,
    name: 'Spring Onion',
    category: 'Vegetables',
    price: 40,
    image:
      'https://www.lifeberrys.com/img/article/spring-onions-1651673055-lb.jpg',
    expiryDate: '2026-09-02'
  },
  {
    id: 49,
    name: 'Fresh Beetroot',
    category: 'Vegetables',
    price: 65,
    image:
      'https://tse3.mm.bing.net/th/id/OIP.eUeGuEmhHsegCMFxYLkGqwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    expiryDate: '2026-09-08'
  },
  {
    id: 50,
    name: 'Fresh Cream',
    category: 'Dairy',
    price: 95,
    image:
      'https://tse3.mm.bing.net/th/id/OIP.k8NG-5tCAURhntztvVWZoAHaKl?r=0&w=896&h=1280&rs=1&pid=ImgDetMain&o=7&rm=3',
    expiryDate: '2026-09-07'
  }
]
const productsWithStock = products.map((product) => ({
  ...product,
  stock: product.stock ?? 20,
  lowStockThreshold: product.lowStockThreshold ?? 5
}))

export default productsWithStock

