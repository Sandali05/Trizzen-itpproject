import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

const items = [
    {
      id: 1,
      name: "Almonds 500g Pack",
      image: "https://m.media-amazon.com/images/I/61-HeXX496L.jpg",
      price: 19.99,
      description:
        "Our 500g pack of high-quality almonds is a great addition to your diet. Sourced from the finest almond orchards, these nuts are packed with protein, fiber, and healthy fats, making them a perfect snack for anyone looking to lead a healthier lifestyle. Almonds are known to promote heart health due to their high levels of monounsaturated fats and antioxidants like vitamin E. They are also a great source of magnesium, which helps regulate blood sugar levels. Whether you enjoy them raw, roasted, or as part of your favorite recipe, our almonds deliver the crunch and flavor you expect. Use them to make almond milk, add them to your morning oatmeal, or simply snack on them throughout the day. They’re also a great addition to salads, desserts, and even savory dishes. With their versatile use, almonds are a pantry staple you won’t want to be without.",
      ratings: 4.5,
    },
    {
      id: 2,
      name: "Walnuts 1Kg Pack",
      image: "https://m.media-amazon.com/images/I/816ZYJo5+-L.jpg",
      price: 24.99,
      description:
        "Our 1Kg pack of organic walnuts is a premium choice for those seeking both flavor and nutrition. These walnuts are carefully sourced from sustainable farms in California, known for producing some of the finest walnuts in the world. Walnuts are one of the few plant-based foods rich in omega-3 fatty acids, which are essential for heart health and reducing inflammation. They’re also packed with antioxidants, vitamin E, and polyphenols that support brain function and overall wellness. Perfect for adding to your breakfast bowl, baking into brownies, or even using as a topping for salads, our walnuts bring a rich, earthy flavor and a satisfying crunch to any meal. Enjoy them raw, toasted, or blended into a smoothie. With their impressive nutritional profile and delightful taste, our walnuts are a must-have in every kitchen. Whether you’re looking to improve your health or simply enjoy a tasty snack, these walnuts are a perfect choice.",
      ratings: 4.7,
    },
    {
      id: 3,
      name: "Cashews 750g Pack",
      image: "https://www.jiomart.com/images/product/original/rvrzgegiaa/shara-s-value-pack-of-king-size-cashews-750g-pack-of-3-x-250g-each-product-images-orvrzgegiaa-p594342619-0-202210080947.jpg?im=Resize=(1000,1000)",
      price: 16.99,
      description:
        "Our 750g pack of cashews brings you a delicious, buttery snack that is not only tasty but also nutritious. Cashews are known for their rich, creamy texture and mild sweetness, making them a favorite in many households. They are an excellent source of essential minerals like copper, magnesium, and manganese, which play a vital role in maintaining bone health, brain function, and overall well-being. These cashews are perfect for snacking right out of the bag, adding to stir-fries, or incorporating into your favorite vegan recipes such as cashew cream or plant-based cheeses. They’re also a great addition to granola, cookies, and curries, enhancing both flavor and texture. Our cashews are carefully selected and processed to retain their natural goodness, making them a wholesome snack for any time of the day. Whether you eat them raw or roasted, cashews offer a delightful crunch and a smooth finish that’s hard to resist.",
      ratings: 4.6,
    },
    {
      id: 4,
      name: "Pistachios 500g Pack",
      image: "https://pintola.in/cdn/shop/files/1_3_1200x.jpg?v=1716538984",
      price: 22.99,
      description:
        "Our 500g pack of pistachios is the perfect snack for anyone looking to indulge in a healthy, flavorful treat. Pistachios are not only delicious but also packed with nutrients such as fiber, protein, and antioxidants. These lightly salted pistachios are roasted to perfection, bringing out their natural flavor while maintaining their crunchy texture. Pistachios are known to support heart health and aid in weight management due to their high fiber content. They are also one of the lowest-calorie nuts, making them a great option for those watching their calorie intake. Enjoy them on their own, or add them to salads, baked goods, or desserts for an extra crunch and flavor. Their unique green and purple coloring makes them as visually appealing as they are tasty, and their natural health benefits make them a guilt-free indulgence.",
      ratings: 4.8,
    },
    {
      id: 5,
      name: "Peanuts 1Kg Pack",
      image: "https://m.media-amazon.com/images/I/71LeSUltZuL.jpg",
      price: 9.99,
      description:
        "Our 1Kg pack of roasted peanuts is perfect for those who love a crunchy, savory snack. These peanuts are roasted to perfection, enhancing their natural nutty flavor while maintaining their crisp texture. Rich in protein, healthy fats, and fiber, peanuts are a great way to satisfy hunger without compromising your health. They’re also a good source of vitamin E, niacin, and folate, all of which support overall health and well-being. Peanuts are extremely versatile; enjoy them on their own, as part of a trail mix, or use them in your cooking. From peanut butter to sauces for savory dishes, peanuts add flavor, texture, and nutrition to any meal. They’re a classic snack loved by people of all ages, and with our generous 1Kg pack, you’ll have plenty to share.",
      ratings: 4.2,
    },
    {
      id: 6,
      name: "Raisins 500g Pack",
      image: "https://i.ebayimg.com/images/g/DTgAAOSwZXZkzKNs/s-l1200.jpg",
      price: 6.99,
      description:
          "Our 500g pack of raisins is a sweet and nutritious snack that’s perfect for any time of day. These raisins are made from premium grapes that are dried to perfection, preserving their natural sweetness and flavor. Raisins are a great source of energy, fiber, and essential vitamins and minerals like iron and potassium. They’re also rich in antioxidants that help protect your cells from damage and support overall health. Enjoy our raisins on their own, add them to your morning cereal, or mix them into baked goods for a touch of natural sweetness. They’re a versatile ingredient that can be used in both sweet and savory dishes, making them a pantry staple you’ll reach for again and again. Whether you’re looking for a quick snack or a nutritious addition to your meals, our raisins are a delicious and convenient choice.",
        ratings: 4.4,
    },
    {
        id: 7,
        name: "Chia Seeds 250g Pack",
        image: "https://m.media-amazon.com/images/I/81+25HFBzbL.jpg",
        price: 5.99,
        description:
            "Our 250g pack of chia seeds is a nutritional powerhouse that’s perfect for boosting your daily intake of essential nutrients. Chia seeds are loaded with fiber, protein, omega-3 fatty acids, and antioxidants, making them one of the healthiest foods you can eat. They’re also a good source of calcium, magnesium, and phosphorus, which support bone health and overall well-being. Chia seeds are incredibly versatile and can be added to smoothies, yogurt, oatmeal, or baked goods for an extra nutritional punch. They can also be used as a vegan egg substitute in baking or as a thickening agent in soups and sauces. With their mild, nutty flavor and impressive health benefits, chia seeds are a must-have in any kitchen. Whether you’re looking to improve your digestion, boost your energy, or enhance your meals, our chia seeds are a convenient and delicious way to do so.",
        ratings: 4.7,
        },
        {
        id: 8,
        name: "Pumpkin Seeds 500g",
        image: "https://static-01.daraz.lk/p/8b9fc6a6663793eaff61bc9b8c0da5e4.jpg_750x750.jpg_.webp",
        price: 8.99,
        description:
            "Our 500g pack of pumpkin seeds is a delicious and nutritious snack that’s perfect for anyone looking to add more plant-based protein to their diet. Pumpkin seeds are rich in iron, magnesium, zinc, and healthy fats, making them a great source of energy and essential nutrients. They’re also packed with antioxidants that help protect your cells from damage and support overall health. Pumpkin seeds are known to promote heart health, aid in digestion, and boost immunity due to their impressive nutritional profile. Enjoy them on their own, sprinkle them on salads, or add them to your favorite recipes for a crunchy texture and nutty flavor. Whether you eat them raw, roasted, or blended into a smoothie, our pumpkin seeds are a versatile and tasty snack that you’ll love.",
        ratings: 4.6,
        },  
        {
        id: 9,
        name: "Sunflower Seeds 750g ",
        image: "https://product-images.metro.ca/images/hfe/h2b/10095597748254.jpg",
        price: 7.99,
        description:
            "Our 750g pack of sunflower seeds is a nutritious and delicious snack that’s perfect for anyone looking to boost their daily intake of essential nutrients. Sunflower seeds are a good source of protein, fiber, healthy fats, and essential vitamins and minerals like vitamin E, magnesium, and selenium. They’re also rich in antioxidants that help protect your cells from damage and support overall health. Sunflower seeds are known to promote heart health, aid in weight management, and reduce inflammation due to their impressive nutritional profile. Enjoy them on their own, add them to salads, or use them in baking for a crunchy texture and nutty flavor. Whether you eat them raw, roasted, or blended into a smoothie, our sunflower seeds are a versatile and tasty snack that you’ll love.",
        ratings: 4.5,
        },
        {
        id: 10,
        name: "Flax Seeds 500g Pack",
        image: "https://colombomall.lk/wp-content/uploads/2024/06/41ispheQPbL.jpg",
        price: 6.99,
        description:
            "Our 500g pack of flax seeds is a nutritional powerhouse that’s perfect for boosting your daily intake of essential nutrients. Flax seeds are rich in omega-3 fatty acids, fiber, protein, and antioxidants, making them one of the healthiest foods you can eat. They’re also a good source of essential vitamins and minerals like vitamin B1, magnesium, and manganese, which support overall health and well-being. Flax seeds are incredibly versatile and can be added to smoothies, yogurt, oatmeal, or baked goods for an extra nutritional punch. They can also be used as a vegan egg substitute in baking or as a thickening agent in soups and sauces. With their mild, nutty flavor and impressive health benefits, flax seeds are a must-have in any kitchen. Whether you’re looking to improve your digestion, boost your energy, or enhance your meals, our flax seeds are a convenient and delicious way to do so.",
        ratings: 4.6,
        }
    ];   
  
    export const Items = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [priceFilter, setPriceFilter] = useState('');
        const [ratingFilter, setRatingFilter] = useState('');
        const [sortOrder, setSortOrder] = useState('A-Z');
      
        const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
          setSearchTerm(e.target.value);
        };
      
        const handlePriceChange = (e: { target: { value: SetStateAction<string>; }; }) => {
          setPriceFilter(e.target.value);
        };
      
        const handleRatingChange = (e: { target: { value: SetStateAction<string>; }; }) => {
          setRatingFilter(e.target.value);
        };
      
        const handleSortChange = (e: { target: { value: SetStateAction<string>; }; }) => {
          setSortOrder(e.target.value);
        };
      
        const filteredItems = items
          .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .filter(item => {
            if (priceFilter === '') return true;
            const [minPrice, maxPrice] = priceFilter.split(' - ').map(Number);
            return item.price >= (minPrice || 0) && item.price <= (maxPrice || Infinity);
          })
          .filter(item => {
            if (ratingFilter === '') return true;
            const [minRating, maxRating] = ratingFilter.split(' - ').map(Number);
            return item.ratings >= (minRating || 0) && item.ratings <= (maxRating || Infinity);
          })
          .sort((a, b) => {
            if (sortOrder === 'A-Z') return a.name.localeCompare(b.name);
            if (sortOrder === 'Z-A') return b.name.localeCompare(a.name);
            return 0;
          });
      
        return (
          <div>
            {/* Filter Bar */}
            <div className="flex flex-col bg-gray-100 w-fit sm:flex-row items-center gap-6 p-4 mt-10 mx-auto justify-center rounded-xl shadow-md">
                <p>Filter Items</p>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border rounded p-2"
              />
      
              <select
                value={priceFilter}
                onChange={handlePriceChange}
                className="border rounded p-2"
              >
                <option value="">All</option>
                <option value="0 - 5">Below $5</option>
                <option value="5 - 10">$5 - $10</option>
                <option value="10 - 20">$10 - $20</option>
                <option value="20 - 30">$20 - $30</option>
                <option value="30 - 50">Above $30</option>
              </select>
      
              <select
                value={ratingFilter}
                onChange={handleRatingChange}
                className="border rounded p-2"
              >
                <option value="">All</option>
                <option value="0 - 1">Below 1</option>
                <option value="1 - 2">1 - 2</option>
                <option value="2 - 3">2 - 3</option>
                <option value="3 - 4">3 - 4</option>
                <option value="4 - 5">4 - 5</option>
              </select>
      
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="border rounded p-2"
              >
                <option value="A-Z">Name A - Z</option>
                <option value="Z-A">Name Z - A</option>
              </select>
            </div>
      
            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-8 max-w-screen-xl mx-auto">
              {filteredItems.map(item => (
                <Link key={item.id} to={`/item/${item.id}`}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full w-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-white px-2 bg-primary w-fit rounded-xl mt-2">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      };