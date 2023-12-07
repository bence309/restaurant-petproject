import React, { useState, useEffect } from 'react';

const Menu = ({ pizzas, drinks, desserts }) => {
  const generateRandomMenu = () => {
    console.log('Pizzas:', pizzas);
    console.log('Drinks:', drinks);
    console.log('Desserts:', desserts);

    if (!pizzas || !drinks || !desserts || !pizzas.length || !drinks.length || !desserts.length) {
      console.log('Returning null');
      return null;
    }

    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

    const randomPizza = getRandomItem(pizzas);
    const randomDrink = getRandomItem(drinks);
    const randomDessert = getRandomItem(desserts);

    const totalPrice = randomPizza.price + randomDrink.price + randomDessert.price;
    const discountedPrice = totalPrice * 0.8;

    return {
      pizza: randomPizza,
      drink: randomDrink,
      dessert: randomDessert,
      originalPrice: totalPrice,
      discountedPrice,
    };
  };

  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const randomMenu = generateRandomMenu();
    console.log('Menu:', randomMenu);
    setMenu(randomMenu);
  }, [pizzas, drinks, desserts]);

  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Menu</h2>
      <div>
        <h3>{menu.pizza.name}</h3>
        <p>Original Price: ${menu.pizza.price}</p>
        <p>Discounted Price: ${menu.discountedPrice}</p>
      </div>
      <div>
        <h3>{menu.drink.name}</h3>
        <p>Original Price: ${menu.drink.price}</p>
        <p>Discounted Price: ${menu.discountedPrice}</p>
      </div>
      <div>
        <h3>{menu.dessert.name}</h3>
        <p>Original Price: ${menu.dessert.price}</p>
        <p>Discounted Price: ${menu.discountedPrice}</p>
      </div>
    </div>
  );
};

export default Menu;
