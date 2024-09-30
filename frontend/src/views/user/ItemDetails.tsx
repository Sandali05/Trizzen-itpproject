import { useParams, useNavigate } from 'react-router-dom';

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
    export const ItemDetails = () => {
        const { id } = useParams<{ id: string }>();
        const item = items.find(item => item.id === parseInt(id || '0'));
        const navigate = useNavigate();
    
        if (!item) {
            return <div>Item not found</div>;
        }
    
        const handleBuyNow = () => {
            navigate(`/checkout`, { state: { item } });
        };
    
        return (
      <div  className="overflow-hidden bg-white pb-11 font-poppins mx-auto">
          <div>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="container px-5 py-14 mx-auto">
                <div className="lg:w-4/5 mx-auto flex gap-10 rounded-xl  flex-wrap justify-center ">
                  <img alt="ecommerce" className="lg:w-5/12 w-full h-fit  rounded-2xl border border-gray-200"
                   src={item.image} />
                  <div className="lg:w-1/2 w-full p-10 lg:mt-0 rounded-xl bg-gray-100">
                    <h1 className="text-grey text-3xl title-font font-medium mb-6">{item.name}</h1>
                    <div className="flex mb-4">
                    </div>
                    <p className="leading-relaxed mb-10 text-grey">{item.description}.</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                      {/* Your quantity selector here */}
                     
                    </div>
                    <div className="grid">
                      <span className="title-font font-bold text-2xl text-grey mb-10">${item.price.toFixed(2)}</span>
                      <button
                        onClick={handleBuyNow}
                        type="button"
                        className="group inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-grey"
                      >
                        Buy Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          </div>



           
        );
    };