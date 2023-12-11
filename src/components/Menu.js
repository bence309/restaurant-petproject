// Menu.js
import React, { useEffect, useState } from 'react';

const Menu = ({ pizzas, drinks, desserts }) => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    if (!pizzas || !drinks || !desserts || pizzas.length === 0 || drinks.length === 0 || desserts.length === 0) {
      setMenu(null);
      return;
    }

    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

    const randomPizza = getRandomItem(pizzas);
    const randomDrink = getRandomItem(drinks);
    const randomDessert = getRandomItem(desserts);

    const totalPrice = randomPizza.price + randomDrink.price + randomDessert.price;
    const discountedPrice = totalPrice * 0.8;

    setMenu({
      pizza: randomPizza,
      drink: randomDrink,
      dessert: randomDessert,
      originalPrice: totalPrice,
      discountedPrice,
    });
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
      </div>
      <div>
        <h3>{menu.drink.name}</h3>
        <p>Original Price: ${menu.drink.price}</p>
      </div>
      <div>
        <h3>{menu.dessert.name}</h3>
        <p>Original Price: ${menu.dessert.price}</p>
      </div>
      <p>Total Original Price: ${menu.originalPrice.toFixed(2)}</p>
      <p>Total Discounted Price: ${menu.discountedPrice.toFixed(2)}</p>
    </div>
  );
};

export default Menu;
