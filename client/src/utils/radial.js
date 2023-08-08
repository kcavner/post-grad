import React, { useState, useEffect } from 'react';

export default function TierList() {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const startSpiralAnimation = () => {
      const menuItems = document.querySelectorAll('.menu-item');
      const totalItems = menuItems.length;
      const circleRadius = 100;

      menuItems.forEach((item, index) => {
        const angle = (index / totalItems) * Math.PI * 2;
        const x = Math.cos(angle) * circleRadius;
        const y = Math.sin(angle) * circleRadius;

        item.style.transform = `translate(${x}px, ${y}px)`;
        item.style.opacity = '1';
      });
    };

    const closeMenu = () => {
      const menuItems = document.querySelectorAll('.menu-item');

      menuItems.forEach((item) => {
        item.style.transform = 'translate(0)';
        item.style.opacity = '0';
      });
    };

    const triggerElement = document.querySelector('.trigger-element');

    if (triggerElement) {
      triggerElement.addEventListener('click', () => {
        toggleMenu();
        if (!menuOpen) {
          startSpiralAnimation();
        } else {
          closeMenu();
        }
      });

      return () => {
        triggerElement.removeEventListener('click', () => {});
      };
    }
  }, [menuOpen]);

  return (
    <div>
      <div className='trigger-element'>Click me</div>
      <div className={`radial-menu${menuOpen ? ' open' : ''}`}>
        <div className="menu-item" data-index="1">Item 1</div>
        <div className="menu-item" data-index="2">Item 2</div>
        <div className="menu-item" data-index="3">Item 3</div>
        <div className="menu-item" data-index="4">Item 4</div>
        <div className="menu-item" data-index="5">Item 5</div>
        <div className="menu-item" data-index="6">Item 6</div>
        <div className="menu-item" data-index="7">Item 7</div>
      </div>
    </div>
  );
}